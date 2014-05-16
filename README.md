# hexo-deployer-rsyncc

A more configurable rsync deployer for [hexo](http://hexo.io/).

## Usage

### Install

```sh
$ npm install hexo-deployer-rsyncc --save
```

### Enable

Add `hexo-deployer-rsyncc` to `plugins` in your `_config.yml`.

```sh
plugins:
- hexo-deployer-rsyncc
```

### Configure

Configure the following options in `_config.yml` or some separate file
(_default_: `rsync.json`).

* `host`
* `user`
* `root`
* `port` (optional, default: 22)
* `delete` (optional, default: true)

Options from `_config.yml` override those loaded from `rsync.json`. You can
load a different config file from the default with the `config_file` option.
