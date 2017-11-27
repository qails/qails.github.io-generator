---
id: util-requireAllRouters
title: requireAllRouters
layout: docs
category: util方法
next: util-watcher
permalink: docs/util-requireAllRouters.html
---

一个让 qails 支持批量引入目录中路由的方法。

**已过期：该方法以前叫 `setupRoutes()` 方法**

## 用法
```js
import { Qails, requireAllRouters } from 'qails';

const app = new Qails();
requireAllRouters(app, './routers');
```

## 参数

- dirname: {string} 路由目录路径，默认值：`src/routers`
