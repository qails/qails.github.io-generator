---
id: jenkins
title: 用 Jenkins 发布
layout: docs
category: 使用指南
next: changelog
permalink: docs/jenkins.html
---

>本文档 Qunar 专用

## 前后端关联
如需关联前端工程，需要检查 pom.xml 设置，确保包含 `<%=appname%>` 的参数都配置正确。

- [查看 pom.xml 源码](https://github.com/qails/qails-cli/blob/master/templates/init/pom.xml)

## npm run build
为了更好的支持 ES6 语法，qails 在项目发布前会使用 babel 编译所有的 JavaScript 文件。

```
npm run build
```

如果编译后的代码不可执行，请检查 `.babelrc` 中的配置是否有误。

编译动作会将 `src` 下所有的 js 文件编译输出到 `dist`。

**请注意** 如果你的代码有对 src 目录中的文件引用，不要硬编码文件地址，请使用 `process.env.DOCUMENT_ROOT` 变量来拼接地址。因为 `env.local` 配置的 `DOCUMENT_ROOT=src` , 其他环境 `env.profile` 中配置的 `DOCUMENT_ROOT=dist` 。

```js
// BAD
const app = require('./src/server');

// recommend
const { DOCUMENT_ROOT } = process.env;
const app = require('./' + DOCUMENT_ROOT + '/server');
```

## build.sh
build.sh 主要完成以下几件事情：

- 设置编译机上的 node 版本
- 根据环境变量 `NODE_ENV` 拷贝对应的 dotenv 配置文件
- 安装依赖
- 执行项目编译脚本

## qunar_service 服务

当 `build_method=node` 时，`qunar_service` 目录下和 qdr schema 中配置的 `service_name` 同名的文件在发布时会被复制到服务器的 `/etc/init.d/` 目录下

## 万事屋schema配置要领
```xml
<!--编译方法-->
<build_method>node</build_method>

<!--编译命令，NODE_ENV根据环境不同设置不同值，可选development,beta,production-->
<build_command>NODE_ENV=production sh scripts/build.sh</build_command>

<!--发布源-->
<svn_src_dir>./</svn_src_dir>

<!--部署类型，可选值nginx, tomcat, static-->
<websrv_type>static</websrv_type>

<!--healthcheck（NG心跳检查）根目录，将%your_project_root%替换成项目在服务器上部署的实际路径-->
<healthcheck_root>%your_project_root%</healthcheck_root>

<!--发布排除项,以,分隔，可根据实际情况修改-->
<rsync_exclude>logs,docs,migrations,seeds,test</rsync_exclude>

<!-- check_url列表，以,分隔，假设web服务使用的是8080端口 -->
<check_urls>http://127.0.0.1:8080/checkurl</check_urls>

<!--服务名，将%appname%替换成实际名称-->
<service_name>qunar_%appname%</service_name>

<!--发布时，是否需要先关闭web服务，然后发布成功y后开启web服务, 线上环境需要开启-->
<restart_websrv>Y</restart_websrv>
```
