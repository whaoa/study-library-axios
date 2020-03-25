/*
 * @Date: 2020-03-22 14:54:49
 * @LastEditors: Wanghao
 * @LastEditTime: 2020-03-25 13:29:05
 * @FilePath: \source-code\axios\lib\core\Axios.js
 * @Description: 构造函数
 */
'use strict';

// 导入相关工具方法
var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  // 设置 默认 配置项
  this.defaults = instanceConfig;
  // 设置 默认 拦截器
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /* eslint no-param-reassign: 0 */
  // Allow for axios('example/url'[, config]) a la fetch API

  // 兼容以 axios('url', {}) 方式调用 配置参数可省略
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  // 合并 默认配置 和 用户传递配置
  config = mergeConfig(this.defaults, config);

  // Set config.method
  // 处理 请求方式, 默认为 GET
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware

  // 创建一个 promise 执行队列
  var chain = [dispatchRequest, undefined];

  // 创建 一个 promise 实例
  var promise = Promise.resolve(config);
  // 等价于 new Promise(resolve => resolve(config))
  // promise.then(res => {console.log(res)}) // -> config

  // 遍历 请求拦截器，将 每个拦截器的 success 和 error handler 依次添加到执行队列的开头
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  // 遍历 响应拦截器，将 每个拦截器的 success 和 error handler 依次添加到执行队列的结尾
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  // chain -> [reqSuccess1, reqError1, dispatchRequest, undefined, resSuccess1, resError1]

  // 遍历执行该队列
  while (chain.length) {
    // 成对取出 拦截器的 success 和 error handle, 作为 promise 的 onFufillled 和 onRejected
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// 拼接 url
Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
// 配置 请求别名 方法
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;
