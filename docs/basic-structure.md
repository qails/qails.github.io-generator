---
id: basic-structure
title: 目录结构
layout: docs
category: 基础知识
next: basic-commands
permalink: docs/basic-structure.html
---

```
.
├── /migrations/            # MySQL 建表文件
├── /profiles/              # 根据环境变量产生的 profiles
│   ├── /env.beta
│   ├── /env.common         # 项目公共配置
│   ├── /env.development
│   ├── /env.local
│   └── /env.production
├── /qdr_service/
│   └── /qunar_service.sh   # 目标服务器上服务启动脚本
├── /scripts/
│   ├── /build.sh           # Jenkins 编译脚本
│   └── /postinstall.js     # npm install 触发的脚本
├── /seeds/                 # MySQL 插入模拟数据文件
├── /src/
│   ├── /config/
│   │   └── /knexfile.js    # knex 配置，不使用数据库的话请忽略
│   ├── /routes/            # 路由文件目录
│   ├── /index.js           # javascript入口
│   └── /server.js          # server.js
├── /static/                # 静态资源
│   └── /healthcheck.html   # 发布系统需要的心跳检查辅助文件
├── /templates/             # pug 模版文件目录
│   ├── /layout/            # pug 布局文件
│   └── /pages/             # pug 页面文件
├── /test/                  # 测试用例
├── .babelrc                # babel配置文件
├── ecosystem.config.js     # PM2配置文件
└── .eslintrc.js            # eslint配置文件
```
