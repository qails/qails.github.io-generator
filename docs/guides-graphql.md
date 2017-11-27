---
id: graphql
title: GraphQL APIs
layout: docs
category: 使用指南
next: test
permalink: docs/graphql.html
---

Qails 中包含两部分和 GraphQL 相关的内容：

- GraphQL 中间件
- GraphQL 数据操作函数

## GraphQL 中间件
参考[GraphQL 中间件](/docs/mw-graphql.html)

## GraphQL 数据操作函数
一系列操作数据库的通用函数。

### 用法
```
import { fetchList, fetchItem, create, update, destroy } from 'qails';
import User from './model';
import Post from '../post/model';

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
    },
    user: async (_, { id, ...args }) => {
      return await fetchItem(User, id, args);
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      return await create(User, input);
    },
    updateUser: async (_, { id, input }) => {
      return await update(User, id, input);
    },
    deleteUser: async (_, { id }) => {
      return await destroy(User, id);
    }
  }
};

```

### fetchList(model, query)
获取列表，可以使用 `page&pageSize` 或者 `offset&limit` 来控制分页。

#### 参数
- model {Model} 模型类
- query
    - query.withRelated {string} 获取关联数据，多个用逗号隔开
    - query.where {string} 查询条件，多个条件有逗号隔开，3个一组 `where=id,>,10,name,like,%abc%`
    - query.andWhere {string} and查询条件，用法同 `where`
    - query.orWhere {string} or查询条件，用法同 `where`
    - query.sort {string} 排序，默认正序，减号开头表示倒序，多个用逗号隔开
    - query.page {int} 当前页码
    - query.pageSize {int} 每页记录数，和 `page` 成为一组分页控制参数
    - query.limit {int} 控制返回记录数量
    - query.first {int} 同 `limit`
    - query.offset {int} 记录偏移量，和 `limit` 成为一组分页控制参数
    - query.mask {string} 只返回mask列出的字段

#### 返回
返回结果会包含两部分内容：

- `pagination` 分页信息，当使用 `page&pageSize` 分页方式时，`page` `pageSize` 才会有返回值，否则返回 `undefined`，`offset&limit` 同理。
    - `rowCount`：{int} 记录总数
    - `pageCount`：{int} 页面总数
    - `page`：{int|undefined} 当前页码
    - `pageSize`：{int|undefined} 每页显示的记录数量
    - `offset`：{int|undefined} 获取记录的起始位置
    - `limit`：{int|undefined} 返回的记录数
- `list` {array} 模型数据

```
{
  users {
    pagination {
      rowCount
      pageCount
      page
      pageSize
      offset
      limit
    }
    list [
        {
          // id
          // ...
        }
    ]
  }
}
```

无结果时返回 `EmptyResponse` 错误信息

```
{
  "errors": [
    {
      "message": {
        "message": "EmptyResponse"
      }
    }
  ],
  "data": {
    "users": null
  }
}
```

### fetchItem(model, id, query)
获取一个对象模型。

#### 参数
- model {Model} 模型类
- id {int} 模型id
- query
    - query.withRelated {string} 获取关联数据，多个用逗号隔开
    - query.mask {string} 只返回mask列出的字段

#### 返回
返回结果匹配的对象模型数据。

```
{
  // id
}
```

无结果时返回 `EmptyResponse` 错误信息

```
{
  "errors": [
    {
      "message": {
        "message": "EmptyResponse"
      }
    }
  ],
  "data": {
    "user": null
  }
}
```

### create(model, attributes)
增加一个对象模型。

#### 参数
- model {Model} 模型类
- attributes {object} 模型数据

#### 返回
返回新增的模型数据。

```
{
  // id
}
```

### update(model, id, attributes)
修改一个对象模型。

#### 参数
- model {Model} 模型类
- id {int} 模型id
- attributes {object} 模型数据

#### 返回
返回修改后的模型数据

```
{
  // id
}
```

当修改的模型不存在时，返回 `No Rows Updated` 错误信息

```
{
  "errors": [
    {
      "message": {
        "message": "No Rows Updated"
      }
    }
  ],
  "data": {
    "updateUser": null
  }
}
```

### destroy(model, id)
删除一个对象模型。

#### 参数
- model {Model} 模型类
- id {int} 模型id

#### 返回
返回被删除的模型数据。

```
{
  // id
}
```

当删除的模型不存在时，返回 `EmptyResponse` 错误信息

```
{
  "errors": [
    {
      "message": {
        "message": "EmptyResponse"
      }
    }
  ],
  "data": {
    "deleteUser": null
  }
}
```

## 例子
查考 [GraphQL例子](https://github.com/qails/qails/tree/master/examples/graphql)
