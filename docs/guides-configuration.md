---
id: configuration
title: profile 配置
layout: docs
category: 使用指南
next: router
permalink: docs/configuration.html
---

在开发过程中经常会碰到代码需要在不同的环境下某些变量的值是不同的，比如某些请求地址、debug 开关等。为了解决这类问题， qails 提供了类似 maven 中的 profiles 功能。

>profile可以让我们定义一系列的配置信息，然后指定其激活条件。这样我们就可以定义多个profile，然后每个profile对应不同的激活条件和配置信息，从而达到不同环境使用不同配置信息的效果。

Qails 目前只支持 `NODE_ENV` 激活方式。

Qails 共有4种环境：

- `local`：本地环境
- `development`：开发服务器
- `beta`：测试服务器
- `production`：生产环境

Qails 使用 [dotenv](https://www.npmjs.com/package/dotenv) 做工程配置管理，所有配置都会被加载到环境变量中，在程序代码中需要从 `process.env` 中获取。

## 用法

直接从 `process.env` 中获取

```
const { NODE_ENV } = process.env;
```

也可以对 `process.env` 赋值来改变配置

```
process.env.NODE_ENV = 'production';
const { NODE_ENV } = process.env;
```

## 工作原理

1. 工程初始化完成后，会在工程根目录建一个名为 `.env` 的配置文件，这个文件里只包含一个配置项，即 `NODE_ENV`

    ```
    # 设置当前环境类型，可选值有：[local/development/beta/production]
    NODE_ENV=local
    ```

2. 根据 `NODE_ENV` 的值加载 `profiles/{NODE_ENV}` 目录中的配置文件，因为使用的是递归加载，故目录中（包含子目录）的所有 `.env` 文件都会加载，可以按实际情况随意分组配置文件。

3. 最后加载公用配置 `profiles/common`，加载规则同上。

```js
const { NODE_ENV, PORT } = process.env;
```

dotenv 只支持字符串类型变量，如果代码中需要布尔型的开关变量，使用时必须做字符串比较，如

```js
if (process.env.ENABLE === 'true') {
  // do something
}
```

## 注意事项

- 目录加载的顺序如下:
    - /.env
    - /profiles/${NODE_ENV}/\*\*/*.env
    - /profiles/common/\*\*/*.env
- 文件按文件名顺序加载
- key值重复的配置 **先加载的有效**。
- 不应该在 `.env` 文件中存放除 `NODE_ENV` 外的其他配置。
- 只支持**字符串**类型变量，如果需要布尔型的开关变量，使用时必须做字符串比较
    ```
    if (process.env.ENABLE === 'true') {
      // do something
    }
    ```

## 初始化配置说明

```
.
├── /profiles/
│   ├── /beta/              # 测试环境配置
│   │   ├── /mysql.env
│   │   └── /qails.env
│   ├── /common/            # 公共配置
│   │   ├── /bookshelf.env      # Bookshelf 模型配置
│   │   ├── /pm2.env            # PM2 配置
│   │   ├── /qails.env          # Qails 配置
│   │   └── /watcher.env        # Watcher 配置
│   ├── /development/       # 开发环境配置
│   │   ├── /mysql.env
│   │   └── /qails.env
│   ├── /local/             # 本地环境配置
│   │   ├── /mysql.env
│   │   └── /qails.env
│   └── /production/        # 线上环境配置
│   │   ├── /mysql.env
│   │   ├── /pm2.env
│   │   ├── /qails.env
│   │   └── /watcher.env
```
