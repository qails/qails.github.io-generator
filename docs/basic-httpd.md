---
id: httpd
title: HTTP 服务器
layout: docs
category: 基础知识
next: basic-middlewares
permalink: docs/httpd.html
---

Qails 使用 koa2 作为 webserver，所有 koa2 中间件都可以在 qails 中使用。

下面的代码创建一个最简单的 qails 服务：

```js
const { Qails } = require('qails');

const app = new Qails();
app.use(async (ctx, next) => {
  ctx.body = 'Hello world';
  await next();
});

const port = 12345;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`✅ qails listening on port ${port}`);
});

```
