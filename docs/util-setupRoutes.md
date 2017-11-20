---
id: setuproutes
title: setupRoutes
layout: docs
category: util方法
next: watcher
permalink: docs/setuproutes.html
---

一个让 qails 支持批量引入目录中路由的方法。

## 用法
```js
import { Qails, setupRoutes } from 'qails';

const app = new Qails();
setupRoutes(app, './routers');
```

## 参数

- dirname: {string} 路由目录路径，默认值：`src/routers`
