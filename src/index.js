/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var React = require('React');
var Site = require('Site');
var Prism = require('Prism');
var Marked = require('Marked');
var unindent = require('unindent');

var index = React.createClass({
  render: function() {
    return (
      <Site>
        <div className="hero">
          <div className="wrap">
            <div className="text"><strong>Qails</strong></div>
            <div className="minitext">快速构建 node 工程的手脚架工具</div>
            <div className="buttons-unit">
              <a href="docs/basic-getting-started.html#content" className="button">开始 qails 学习之旅</a>
            </div>
          </div>
        </div>

        <section className="content wrap">
          <div className="features">
            <p>
              Qails 是一个基于 koa2 的 nodejs 框架，与其说它是一个框架，不如说它是一个手脚架工具，它主要的目的为了让工程师快速的生成一个 nodejs 工程的主框架，它包含基本的 webserver、restful API、pug 模版、日志、监控等功能，同时它还结合了 Qunar 公司的构建工具做了相关的开发，生产的项目工程能在 Qunar 快速发布上线。
            </p>
          </div>
        </section>

      </Site>
    );
  }
});

module.exports = index;
