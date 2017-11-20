---
id: log
title: 日志
layout: docs
category: 使用指南
next: jenkins
permalink: docs/log.html
---

web服务通常有两种日志：
- 访问日志
- 错误日志
- console.log日志

## 访问日志
使用 [koa-morgan](https://www.npmjs.com/package/koa-morgan) 和 [file-stream-rotator](https://www.npmjs.com/package/file-stream-rotator) 记录访问日志。

- koa-morgan：控制日志格式
- file-stream-rotator：控制文件信息

更多信息请查看官方网站。

## PM2日志管理
目前 qails 使用 pm2 的日志功能来捕获错误日志和 console.log 日志，日志文件保存路径在工程根目录下的 ecosystem.config.js 文件设定。

### 文件类型
- `err.log`: 错误日志
- `out.log`: console.log 日志

### pm2-logrotate
使用 [pm2-logrotate](https://github.com/pm2-hive/pm2-logrotate) 来做日志文件拆分。

部署服务器时需要安装该插件。

```
pm2 install pm2-logrotate
```

### 更多信息
- [PM2 Log Management](http://pm2.keymetrics.io/docs/usage/log-management/)
- [pm2-logrotate](https://github.com/pm2-hive/pm2-logrotate)
