---
id: guide-rest
title: RESTful APIs
layout: docs
category: 使用指南
next: guide-graphql
permalink: docs/guide-rest.html
---

qails能根据model自动创建RESTful路由地址，该功能由 `qails/util/resource.js` 提供。

## ResourceRouter.define(model, options)
根据模型创建 CRUD 路由，ResourceRouter 继承了 koa-router。

### 参数
- model {bookshelf.model} 模型
- options
    - **setup**: {function} 路由创建方法，默认为 `router.crud()`，即自动创建 CRUD 方法
    - **prefix**: {string} 前缀，如 `/api`，默认为空
    - **root**: {string} 路由根路径，默认为模型的 `tableName`

## 创建一个最简单的CRUD路由
```js
import { Resource } from 'qails';
import Role from '../models/roles';

export default Resource.define(Role);
```

上面的代码会自动创建以下路由：

提交方式 | 路由 | 说明
--- | --- | ---
POST | /roles | 新建一个角色
GET | /roles | 列出所有角色
GET | /roles/:id | 获取某个指定角色的信息
PATCH | /roles/:id | 更新某个指定角色的信息
DELETE | /roles/:id | 删除某个角色

## 创建一个CRU路由(不包含删除)
```js
import { Resource } from 'qails';
import Role from '../models/roles';

export default Resource.define(Role, {
  setup(router) {
    router.create().read().update();
  }
});
```

上面的代码会自动创建以下路由：

提交方式 | 路由 | 说明
--- | --- | ---
POST | /roles | 新建一个角色
GET | /roles | 列出所有角色
GET | /roles/:id | 获取某个指定角色的信息
PATCH | /roles/:id | 更新某个指定角色的信息

## 创建带前缀的路由
```js
import { Resource } from 'qails';
import Role from '../models/roles';

export default Resource.define(Role, {
  prefix: '/api'
});
```

上面的代码会自动创建以下路由：

提交方式 | 路由 | 说明
--- | --- | ---
POST | /api/roles | 新建一个角色
GET | /api/roles | 列出所有角色
GET | /api/roles/:id | 获取某个指定角色的信息
PATCH | /api/roles/:id | 更新某个指定角色的信息
DELETE | /api/roles/:id | 删除某个角色

## 创建和表名称不一样的路由
```js
import { Resource } from 'qails';
import Role from '../models/roles';

export default Resource.define(Role, {
  root: 'jiaose'
});
```

上面的代码会自动创建以下路由：

提交方式 | 路由 | 说明
--- | --- | ---
POST | /jiaose | 新建一个角色
GET | /jiaose | 列出所有角色
GET | /jiaose/:id | 获取某个指定角色的信息
PATCH | /jiaose/:id | 更新某个指定角色的信息
DELETE | /jiaose/:id | 删除某个角色

## 在标准 CRUD 路由前后插入其他中间件
有时候需要在标准的路由前后加入一些业务规则中间件，如新增一条记录后需要在日志表中记录操作人日志，这时候可以在创建路由时注入中间件。可以在以下位置注入中间件：

参数名称 | 参数类型 | 适用patten | 说明
--- | --- | --- | ---
beforeMiddlewaves | `Function` `Array` | all | 在标准路由前执行
afterMiddlewaves | `Function` `Array` | all | 在标准路由后执行
beforeListMiddlewaves | `Function` `Array` | /models | 在标准获取列表路由前执行
afterListMiddlewaves | `Function` `Array` | /models | 在标准获取列表路由后执行
beforeItemMiddlewaves | `Function` `Array` | /models/:model | 在标准获取详情路由前执行
afterItemMiddlewaves | `Function` `Array` | /models/:model | 在标准获取详情路由后执行

```js
import { Resource } from 'qails';
import Log from '../models/log';

export default Resource.define(Log, {
  setup(router) {
    router.read({
      beforeMiddlewaves: [
        async(ctx, next) => {
          console.log('===before===');
          await next();
        }
      ],
      afterMiddlewaves: async(ctx, next) => {
        console.log('===after===');
        await next();
      }
    });
  }
});
```

## 查询路由支持的查询参数
可以在查询列表的接口中通过 `querystring` 参数控制返回结构，支持的控制参数有：

- **withRelated**: {string} 获取关联数据，多个用逗号隔开
- **where**: 查询条件，支持以下几种传值方式
    - {string} 多个条件有逗号隔开，3个一组 `where=id,>,10,name,like,%abc%`
    - {object} `where[id]=10`
    - {array} `where=id&where==&where=10`
- **andWhere**: {string} and查询条件，用法同 where
- **orWhere**: {string} or查询条件，用法同 where
- **sort**: {string} 排序，默认正序，减号开头表示倒序，多个用逗号隔开
- **page**: {int} 当前页码
- **pageSize**: {int} 每页记录数，和 page 成为一组分页控制参数
- **limit**: {int} 控制返回记录数量
- **first**: {int} 同 limit
- **offset**: {int} 记录偏移量，和 limit 成为一组分页控制参数
- **mask**: {string} 只返回mask列出的字段

## 创建一个表名称和model名称不一致的路由
假设表名称是 `tb_roles`，希望创建的路由是 `roles`，这需要在创建路由时指定 `name` 参数：

```js
// routes/role.js
import { Resource } from 'qails';
import Role from '../models/role';

export default Resource.define(Role, {
  name: 'roles'
});
```

同时指定 model 名称

```js
// models/role.js
import { Model } from 'qails';

export default class extends Model {
  get tableName() {
    return 'tb_roles';
  }
}
```
