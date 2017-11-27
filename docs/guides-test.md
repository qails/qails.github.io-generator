---
id: guide-test
title: 单元测试
layout: docs
category: 使用指南
next: guide-log
permalink: docs/guide-test.html
---

Qails 内置了 mocha 测试框架，所有测试用例放在 `test` 目录即可，支持 ES6 语法。

## 配置
mocha 的配置文件位于 [test/mocha.opts](https://github.com/qails/qails-cli/blob/master/templates/init/test/mocha.opts)。

```
# 递归执行，自动执行所有目录下js中包含的用例
--recursive

# 预加载环境变量配置
--require ./dotenv.js

# 预加载 babel-core/register
--require babel-core/register

# 执行后自动退出
--exit
```
