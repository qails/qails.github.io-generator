---
id: serve
title: serveMiddleware
layout: docs
category: 中间件
next: pug
permalink: docs/serve.html
---

一个让 webserver 能提供静态文件服务的中间件。

如果想设置多个独立的目录，可以多次调用该中间件。

```js
import { Qails, serveMiddleware } from 'qails';

const app = new Qails([
    serveMiddleware('static'),
    serveMiddleware('node_modules/bootstrap'),
    serveMiddleware('node_modules/jquery/dist')
]);

```

## 参数

- root: {string} 静态文件的目录路径，默认值：`static`
- options: {object} 参考[https://github.com/koajs/static](https://github.com/koajs/static)
