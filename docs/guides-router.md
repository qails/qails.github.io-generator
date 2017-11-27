---
id: guide-router
title: 路由
layout: docs
category: 使用指南
next: guide-orm
permalink: docs/guide-router.html
---

所有的 route 基于 [koa-router](https://www.npmjs.com/package/koa-router) ，放置在 `src/route` 下的文件会自动添加到服务器，支持目录和目录嵌套。

有不同的两种方式创建路由：

- 从 `koa-router` 继承创建路由
- 从 `qails.Resource` 创建路由

## 从 `koa-router` 继承创建路由
```js
import Router from 'koa-router';

const router = new Router();
router.get('/', async (ctx) => {
  ctx.body = {
    hello: 'world'
  };
});

export default router;
```

## 从 `qails.Resource` 创建路由
这种方式创建的路由自动包含 CRUD 功能。

```js
import { Resource } from 'qails';
import Role from '../models/roles';

export default Resource.define(Role)
```

[更多resouce路由示例代码](/docs/rest.html)
