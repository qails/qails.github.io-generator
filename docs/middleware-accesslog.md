---
id: middleware-accesslog
title: accessLogMiddleware
layout: docs
category: 中间件
next: middleware-bodyparser
permalink: docs/middleware-accesslog.html
---

这是用来记录服务器访问日志的中间件。

它由两部分组成：

- [koa-morgan](https://www.npmjs.com/package/koa-morgan)：控制日志格式
- [file-stream-rotator](https://www.npmjs.com/package/file-stream-rotator)：控制文件信息

## API

```js
import {
  Qails,
  accessLogMiddleware
} from 'qails';

const app = new Qails([
  accessLogMiddleware(/*fileStream, morganFormat, morganOptions*/)
]);
```

### Options
#### accessLogMiddleware(fileStream, morganFormat, morganOptions)

* **fileStream** {object} file-stream-rotator选项
    ```
    // 默认值
    {
        // 日志文件保存的位置
        root: resolve('logs'),
        // 日志文件名格式
        filename: 'access__%DATE%.log',
        // 日志文件名中 %DATA% 日期格式，
        // 参考http://momentjs.com/docs/#/displaying/format/
        dateFormat: 'YYYYMMDD',
        // 日志文件拆分频率[daily:每天/1h:每小时/5m:每五分钟/]
        frequency: 'daily',
        // 是否输出详细信息
        verbose: false
    }
    ```
* **morganFormat** {object} 日志格式，默认值： 'combined'。
* **morganOptions** {object} morgan选项
    ```
    // 默认值
    {
        stream：accessLogStream
    }
    ```
