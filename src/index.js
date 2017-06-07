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
            <div className="text"><strong>qails</strong></div>
            <div className="minitext">
              专注数据服务的 nodejs 框架
            </div>
          </div>
        </div>

        <section className="content wrap">
          <section className="home-section home-getting-started">
            <p>
              qails 是一个轻量级、专注于数据服务的 nodejs 框架，很多设计思想源于 ruby on rails。
            </p>

            <p>
              Draft.js makes it easy to build any type of rich text input,
              whether you're just looking to support a few inline text styles
              or building a complex text editor for composing long-form
              articles.
            </p>

            <p>
              In Draft.js, everything is customizable &ndash; we provide the
              building blocks so that you have full control over the user
              interface. Here's a simple example of a rich text editor built in
              Draft.js:
            </p>
          </section>

          <section className="home-bottom-section">
            <div className="buttons-unit">
              <a href="docs/overview.html#content" className="button">开始学习 qails</a>
            </div>
          </section>
        </section>

      </Site>
    );
  }
});

module.exports = index;
