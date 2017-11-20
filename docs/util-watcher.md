---
id: watcher
title: watcher
layout: docs
category: util方法
next: ex-helloworld
permalink: docs/watcher.html
---

一个封装了 watcher 打点的方法。

## 用法

使用前需要配置好 watcher 服务器的环境变量：
```
# 统计服务器地址
WATCHER_HOST=
# 统计服务器端口
WATCHER_PORT=
# 统计名称前缀，用英文句号来标示节点的层级
WATCHER_PREFIX=
# 是否按机器名区分记录
WATCHER_RECORD_BY_MACHINE=false
```

```js
import { increment, timing } from 'qails';

var timer = new Date();

// 计数加 1
increment('key');

// 计时
timing('some.timer', timer);
```

## increment

计数器

increment(metric, [delta=1])

### 参数
- metric: {string} 统计名称
- delta: {number} 增量值，默认值：1

## timing

计时器

timing(metric, timer)

### 参数
- metric: {string} 统计名称
- timer: {date} 统计开始的时间
