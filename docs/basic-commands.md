---
id: commands
title: 命令
layout: docs
category: 基础知识
next: configuration
permalink: docs/commands.html
---

Qails 内置了以下命令，这些命令可以在 `package.json` 的 scripts 直接使用

```js
"scripts": {
    // 初始化 MySQL 数据库并插入模拟数据
    "db:init": "yarn migrate:rollback && yarn migrate:latest && yarn seed:run",

    // 导出建表 MySQL 语句
    "db:tosql": "babel-node scripts/tosql.js",

    //
    "migrate:rollback": "babel-node ./node_modules/.bin/knex --knexfile=src/config/knexfile.js migrate:rollback",

    //
    "migrate:latest": "babel-node ./node_modules/.bin/knex --knexfile=src/config/knexfile.js migrate:latest",

    // 初始化模拟数据
    "seed:run": "babel-node ./node_modules/.bin/knex --knexfile=src/config/knexfile.js seed:run",

    // 编译项目
    "build": "rimraf dist && babel src -d dist",

    // JavaScript 语法检查
    "lint": "eslint --fix --quiet \"**/*.js\"",

    // npm hooks
    "postinstall": "babel-node scripts/postinstall.js",

    // 启动项目
    "start": "pm2 start ecosystem.config.js",

    // 测试项目
    "test": "mocha",

    // precommit hooks
    "precommit": "yarn test && yarn lint"
},

```
