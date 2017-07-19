---
id: commands
title: 命令
layout: docs
category: 基础知识
next: configuration
permalink: docs/commands.html
---

Qails 内置了以下几个命令：

命令|说明
---|---
start|启动开发服务器
build|编译项目
lint|代码检查
test|运行测试用例

这些命令可以在 `package.json` 的 scripts 直接使用

```json
"scripts": {
    "build": "babel src -d dist",
    "init": "yarn migrate:rollback && yarn migrate:latest && yarn seed:run",
    "lint": "eslint --quiet \"**/*.js\"",
    "migrate:rollback": "babel-node ./node_modules/.bin/knex --knexfile=src/config/knexfile.js migrate:rollback",
    "migrate:latest": "babel-node ./node_modules/.bin/knex --knexfile=src/config/knexfile.js migrate:latest",
    "seed:run": "babel-node ./node_modules/.bin/knex --knexfile=src/config/knexfile.js seed:run",
    "release": "standard-version && npm publish",
    "postinstall": "babel-node scripts/postinstall.js",
    "postrelease": "git push && git push origin --tags",
    "start": "pm2 start ecosystem.config.js",
    "test": "mocha --recursive --compilers js:babel-core/register && yarn lint"
},

```
