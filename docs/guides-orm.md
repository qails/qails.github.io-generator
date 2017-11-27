---
id: orm
title: 对象关系映射
layout: docs
category: 使用指南
next: rest
permalink: docs/orm.html
---

Qails 使用 [bookshelf](https://www.npmjs.com/package/bookshelf) 实现的 ORM。

## 一个简单的模型

```
import { Model } from 'qails';

/**
 * @class User
 */
export default class User extends Model {
  /**
   * @method 表名称
   * @return {string}
   */
  get tableName() {
    return 'users';
  }
}
```

上面的代码创建了一个 `User` 模型，它和数据库中的 `users` 表关联。

## 命名约定
> 以下是默认约定，如果不想按着默认约定编码，可以在代码中使用指定参数的方式更改

- 数据库、表应该像变量名一样，全部采用小写，但单词之间以下划线分隔，而且表名始终是复数形式的
- 文件名应该全部小写，单词之间用下划线
- 关联表名称默认为用下划线连接的被关联的两个表名，且按2个表名称的字母排序先后顺序连接
  - `users`和`posts`的关联表名称应该为`posts_users`
  - `tags`和`posts`的关联表名称应该为`posts_tags`
  - `users`和`tags`的关联表名称应该为`tags_users`
- 关联表名中关联的字段默认为 `被关联表名称的单数_id`，如 `user_id` `tag_id` `post_id`
