---
id: es6
title: 使用 ES6
layout: docs
category: 使用指南
next: jenkins
permalink: docs/es6.html
---

Qails 内置了 `babel`，可以使用最新的 ES6 书写代码。

项目中不同类型的代码支持 ES6 的方法有所不同：

- `src` 中的程序代码
- `scripts` 中的命令行可执行代码
- `test` 中的测试代码

## `src` 中的程序代码
- 本地开发时，`src` 中的程序代码通过 `PM2` 来启动，`PM2` 的配置文件中指定了使用 `babel-node` 解释器启动程序。
- 部署到服务器后，`src` 中的程序代码经 `npm run build` 编译后会将编译结果输出到 `dist` 目录，babel 编译使用的配置在 `.babelrc` 中，如果需要支持 `node@<7.6` 的版本，可以修改该配置文件。
    ```
    {
      "presets": [
        ["env", {
          "targets": {
            "node": "7.6"
          }
        }],
        "stage-0"
      ]
    }
    ```

## `scripts` 中的命令行可执行代码
为可执行代码指定解释器。

- 在 `package.json` 中的命令直接指定 `babel-node`
    ```
    "seed": "babel-node database/seed.js",
    ```
- 其他位置（非`package.json`中），使用 `babel-node` 的完整路径
    ```
    node_modules/.bin/babel-node database/seed.js
    ```

## `test` 中的测试代码
在 mocha 的配置文件中 [test/mocha.opts](https://github.com/qails/qails-cli/blob/master/templates/init/test/mocha.opts) 已经包含了 `babel-core/register`

```
--require babel-core/register
```
