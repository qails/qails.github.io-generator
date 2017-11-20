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

```js
const { NODE_ENV, PORT } = process.env;
```

dotenv 只支持字符串类型变量，如果代码中需要布尔型的开关变量，使用时必须做字符串比较，如

```js
if (process.env.ENABLE === 'true') {
  // do something
}
```

## 初始化配置

- 个性化配置项如下
    ```
    # 环境变量
    NODE_ENV=local

    # API服务端口
    PORT=3000

    # 执行代码目录地址[本地开发为src，其它环境均为dist]
    DOCUMENT_ROOT=src

    # knex调试开关
    DEBUG=knex:query,knex:bindings

    ## PM2
    PM2_EXEC_INTERPRETER=babel-node
    PM2_EXEC_MODE=fork
    PM2_INSTANCES=1
    PM2_WATCH=true

    # mysql服务器地址
    MYSQL_HOST=
    # mysql用户名
    MYSQL_USER=
    # mysql密码
    MYSQL_PASSWORD=
    # mysql数据库名
    MYSQL_DATABASE=
    # mysql端口
    MYSQL_PORT=

    # watcher统计服务器地址，参考http://gitlab.corp.qunar.com/mobile_touch/smart_hotel_api/tree/master/src/profiles
    WATCHER_HOST=
    # watcher统计服务器端口
    WATCHER_PORT=8125
    # watcher统计名称前缀，用英文句号来标示节点的层级
    WATCHER_PREFIX=hotel.<%=appname%>
    ```

- 通用配置项如下
    ```
    # 日志文件存放目录
    LOG_ROOT=logs

    # 是否启用NODE对安全证书的验证[0:禁用/1:启用]
    NODE_TLS_REJECT_UNAUTHORIZED=0

    # watcher 是否按机器名区分打点数据
    WATCHER_RECORD_BY_MACHINE=false
    ```

## 加载多个配置的方法
dotenv 官方只提供了加载一个配置文件的方法，但实际项目中可能需要加载多个配置，比如，我们希望把有环境差异的配置放在 `local/development/beta/production` 这些 `profiles` 配置文件中，把无环境差异的配置放在 `env.common` 配置文件中，这样我们至少需要加载两个配置文件，如果解决这个问题？

通过阅读 dotenv 的源代码发现，`require('dotenv').config()` 方法可以执行多次，执行结果会追加到 `process.env` 对象上，因此，我们就利用这一点来加载多个配置，需要注意的是 ***如果存在重复的 key 值，以先加载的值为准，先到先得，后面的值无效***。

```js
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: './profiles/env.common' });
```

[查看例子](/docs/ex-commonprofile.html)
