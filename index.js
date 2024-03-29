var _      = require('lodash');
var fs     = require('fs');
var colors = require('colors'); // jshint ignore:line
var path   = require('path');
var spawn  = require('child_process').spawn;

var run = function(command, args, callback) {
  var cp = spawn(command, args);

  cp.stdout.on('data', function(data){
    process.stdout.write(data);
  });

  cp.stderr.on('data', function(data){
    process.stderr.write(data);
  });

  cp.on('close', callback);
};

hexo.extend.deployer.register('rsyncc', function(args, callback) {
  if (!args.config_file) {
    args.config_file = 'rsync.json';
  }

  var fileArgs = JSON.parse(fs.readFileSync(path.resolve(args.config_file)));
  args = _.merge({}, fileArgs, args);

  if (!args.host || !args.user || !args.root){
    var help = [
      'You should configure deployment settings in _config.yml or rsync.json!',
      '',
      'Example (_config.yml):',
      '  deploy:',
      '    type: rsyncc',
      '    host: <host>',
      '    user: <user>',
      '    root: <root>',
      '    port: [port] # Default is 22',
      '    delete: [true|false] # Default is true',
      '',
      'For more help, you can check the docs: ' + 'https://github.com/jico/hexo-deployer-rsyncc/README.md'.underline
    ];

    console.log(help.join('\n'));
    return callback();
  }

  if (!args.hasOwnProperty('delete')) args.delete = true;
  if (!args.port) args.port = 22;

  if (args.port > 65535 || args.port < 1) {
    args.port = 22;
  }

  var params = [
    args.delete === true ? '--delete' : '',
    '-avze',
    'ssh -p ' + args.port, 'public/', args.user + '@' + args.host + ':' + args.root
  ].filter(function(arg) {
    return arg;
  });

  run('rsync', params, function() {
    callback();
  });
});
