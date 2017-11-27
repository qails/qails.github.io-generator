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

qails能根据model自动创建RESTful路由地址

## 创建一个最简单的CRUD路由
```js
import { Resource } from 'qails';
import Role from '../models/roles';

export default Resource.define(Role.collection())
```

上面的代码会自动创建以下路由：

提交方式 | 路由 | 说明
--- | --- | ---
POST | /roles | 新建一个角色
GET | /roles | 列出所有角色
GET | /roles/:id | 获取某个指定角色的信息
PATCH | /roles/:id | 更新某个指定角色的信息
DELETE | /roles/:id | 删除某个角色

## 创建一个嵌套路由(暂未实现)
```js
import { Resource } from 'qails';
import Role from '../models/role';

const users = Resource.define({
  // 假设在role model中已经设定了role和user的关联关系
  collection: (ctx) => ctx.state.role.users(),
  name: 'users',
  setup(router) {
    router
      .use(async (ctx, next) => {
        ctx.state.role = await Role.findById(
          ctx.params.role_id,
          {require: true}
        );
        await next();
      })
      .crud();
  },
});

export default Resource.define({
  collection: Role.collection(),
  setup(router) {
    router.crud();
    // router.create().read().update().destroy();

    // 使用嵌套路由
    router.use('/roles/:role_id(\\d+)', users.routes());
  },
});

```
上面的代码会自动创建以下路由：

 提交方式 | 路由 | 说明
---|---|---
POST|/roles|新建一个角色
GET|/roles|列出所有角色
GET|/roles/:id|获取某个指定角色的信息
PATCH|/roles/:id|更新某个指定角色的信息
DELETE|/roles/:id|删除某个指定角色的信息
POST|/roles/:role_id/users|新增一个某个指定角色的用户
GET|/roles/:role_id/users|列出某个指定角色的所有用户
GET|/roles/:role_id/users/:user_id|列出某个指定角色的指定用户
PATCH|/roles/:role_id/users/:user_id|修改某个指定角色的指定用户
DELETE|/roles/:role_id/users/:user_id|删除某个指定角色的指定用户

### 创建一个表名称和model名称不一致的路由
假设表名称是 `tb_roles`，希望创建的路由是 `roles`，这需要在创建路由时指定 `name` 参数：

```js
// routes/role.js
import { Resource } from 'qails';
import Role from '../models/role';

export default Resource.define({
  collection: Role.collection(),
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

export default Resource.define({
  collection: Log.collection(),
  name: 'logs',
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
