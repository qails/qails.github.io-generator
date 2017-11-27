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

## 内置的 bookshelf 插件
Qails 内置了以下 bookshelf 插件：

- **Pagination: 默认启用，不能禁用**
- **bookshelf-modelbase: 默认启用，不能禁用**
- Registry: 默认禁用
- Virtuals: 默认禁用
- Visibility: 默认禁用
- bookshelf-cascade-delete: 默认禁用
- bookshelf-json-columns: 默认禁用
- bookshelf-mask: 默认禁用
- bookshelf-paranoia: 默认禁用
- bookshelf-uuid: 默认禁用

[查看插件详细说明](http://bookshelfjs.org/#plugins)

### 插件配置
可以通过传递环境变量来控制插件是否启动，在 qails 框架中，和 bookshelf 相关的环境变量统一放在 `profiles/common/bookshelf.env` 中（[查看文件](https://github.com/qails/qails-cli/blob/master/templates/init/profiles/common/bookshelf.env)）

```
########################################
#                                      #
#               bookshelf配置           #
#                                      #
# 配置 bookshelf 模型具有的特性           #
# 通过该配置决定使用哪些 bookshelf 插件    #
#                                      #
########################################

######## 插件开关 ########
# 让 Model 具有自动注册到中央位置的功能
MODEL_REGISTRY=false

# 让 Model 具有返回虚拟字段的功能
MODEL_VIRTUALS=false

# 让 Model 调用 toJSON 方法时具有显示／隐藏某些字段的功能
MODEL_VISIBILITY=false

# 让 Model 具有删除关联数据功能
MODEL_CASCADEDELETE=false

# 让 Model 具有返回自定义字段的功能
MODEL_MASK=false

# 让 Model 具有自动生成UUID的功能
MODEL_UUID=false

# 让 Model 具有自动存储序列化对象的能力
MODEL_JSONCOLUMNS=false

# 让 Model 具有自动转换对象 key 拼写的能力
MODEL_MAGICCASE=false

# 让 Model 具有软删除记录的能力
MODEL_SOFTDELETE=false

######## 插件参数 ########
# UUID 生成器类型，默认值v4
MODEL_UUID_TYPE=

```
