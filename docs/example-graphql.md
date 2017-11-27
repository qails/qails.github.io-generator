---
id: example-graphql
title: GraphQL APIs
layout: docs
category: 示例代码
permalink: docs/example-graphql.html
---

演示如何使用 qails 创建 GraphQL 应用。

## 自动加载resolver和schema
为了让程序代码结构清晰，每个 model 目录包含了三个文件:

- `model.js`: ORM模型
- `resolver.js`: GraphQL Resolver
- `schema.js`: GraphQL Schema

所有的 `resolver.js` 和 `schema.js` 会自动加载到 qails 中。

## 公共schema
公共schema放在 `models/schema.js` 中，里面主要定义通用接口和通用类型。

## 特别说明
由于 `GraphQL` 可以灵活组合返回数据，qails ORM 中封装的 `withRelated` 关联数据使用场景并不多，当存在关联数据返回时，建议在 resolver 中定义，这样对返回的控制更加精准。

```
# user/schema.js
  type User {
    id: ID
    name: String
    posts(first: Int): Posts
  }
```

```
// user/resolver.js
export default {
  User: {
    async posts(parent, args) {
      args = {...args, where: { user_id: parent.id } };
      return await fetchList(Post, args);
    }
  },
  Query: {
    users: async (_, args) => {
      return await fetchList(User, args);
    }
  }
};
```

- [查看代码](https://github.com/qails/qails/tree/master/examples/graphql)
