---
id: installation
title: 安装
layout: docs
category: 基础知识
next: structure
permalink: docs/installation.html
---

## 前提条件

- node@>=7.6.0
- npm@>=3.0.0
- pm2@>=2.0.0(全局安装)

## 安装
### 安装qails-cli
```
npm install -g qails-cli
```

### 使用CLI初始化工程安装
```
# 初始化一个名称为 myproject 的工程
qails init myproject
```

### 启动工程
```
cd myproject
npm run start
```

## 新工程目录结构

```
.
├── /qdr_service/
│   └── /qunar_service.sh   # 目标服务器上服务启动脚本
├── /scripts/
│   ├── /build.sh           # Jenkins 编译脚本
│   └── /postinstall.js     # npm install 触发的脚本
├── /src/
│   ├── /config/
│   │   └── /knexfile.js    # knex 配置，不使用数据库的话请忽略
│   ├── /profiles/          # 根据环境变量产生的 profiles
│   │   ├── /env.beta
│   │   ├── /env.development
│   │   ├── /env.local
│   │   └── /env.production
│   ├── /routes/            # 路由文件目录
│   ├── /templates/         # pug 模版文件目录
│   │   ├── /layout/        # pug 布局文件
│   │   └── /pages/         # pug 页面文件
│   ├── /index.js           # javascript入口
│   └── /server.js          # server.js
├── /static/                # 静态资源
├── .babelrc                # babel配置文件
├── ecosystem.config.js     # PM2配置文件
└── .eslintrc.js            # eslint配置文件
```
