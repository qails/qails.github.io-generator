---
id: router
title: 路由
layout: docs
category: 使用指南
next: orm
permalink: docs/router.html
---

所有的 route 基于 [koa-router](https://www.npmjs.com/package/koa-router) ，放置在 `src/route` 下的文件会自动添加到服务器，支持目录和目录嵌套。

## 路由Demo
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
