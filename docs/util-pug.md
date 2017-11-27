---
id: util-pug
title: pug
layout: docs
category: util方法
next: util-session
permalink: docs/util-pug.html
---

一个让 qails 支持 pug 模版的方法。

## 用法
```js
import { Qails, pug } from 'qails';

const app = new Qails();
pug(app, { viewPath: 'templates/pages' });

app.use(ctx => {
  ctx.render('home');
});
```

## 参数

- viewPath: {string} 模版路径，默认值：`templates`
- 其他参数：参考[https://github.com/chrisyip/koa-pug](https://github.com/chrisyip/koa-pug)
