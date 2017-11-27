---
id: util-session
title: session
layout: docs
category: util方法
next: util-requireAllRouters
permalink: docs/util-session.html
---

一个让 qails 支持 session 的方法。

## 用法
```js
import { Qails, session } from 'qails';

const app = new Qails();
session(app, { key: 'xuyd64A9a' });

app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});
```

## 参数

- key: {string} 私钥，默认值：`please_modify_it`
- 其他参数：参考[https://github.com/koajs/session](https://github.com/koajs/session)
