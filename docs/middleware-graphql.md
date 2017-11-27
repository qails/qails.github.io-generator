---
id: middleware-graphql
title: graphqlMiddleware
layout: docs
category: 中间件
next: middleware-prettyjson
permalink: docs/middleware-graphql.html
---

封装了 [koa-graphql](https://github.com/chentsulin/koa-graphql)，为 koa 自动增加 GraphQL 的中间件，该中间件注册后，会自动增加一个 /:endpoint 的路由。

```js
import { Qails, graphqlMiddleware } from 'qails';

const app = new Qails([
    graphqlMiddleware({
      schema: schema,
      rootValue: rootValue
    })
]);

```

## 参数

- options
    - options.schema: {schema} GraphQL schema
    - [options.rootValue]: {object} graphql resolve
    - [options.endpoint=/graphql] {string} 服务根路径
    - [graphiql] {boolean} 是否使用 graphiql 工具
    - [context] {string}
    - [pretty] {boolean}
    - [formatError] {function}

## 例子
查考 [GraphQL例子](https://github.com/qails/qails/tree/master/examples/graphql)
