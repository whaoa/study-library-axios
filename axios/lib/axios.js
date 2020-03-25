/*
 * @Date: 2020-03-22 14:54:49
 * @LastEditors: Wanghao
 * @LastEditTime: 2020-03-24 17:30:13
 * @FilePath: \source-code\axios\lib\axios.js
 * @Description: 主文件
 */
'use strict';

// 导入相关工具方法
var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * 生成 axios 实例 的 工厂方法
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  // 创建 axios 实例
  var context = new Axios(defaultConfig);
  // 更改 Axios.prototype.request 的 this 的指向为 context
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  // 将 Axios.prototype 原型上的属性方法 复制到 instance 实例上
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  // 将 context 原型上的属性方法 复制到 instance 实例上
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
// 创建 axios 实例
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
// 将 Axios 类 挂载到 实例上
axios.Axios = Axios;

// Factory for creating new instances
// 将 工厂函数 挂载到 实例上
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
// 将 取消相关方法 挂载到 实例上
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
// 将 all 和 spread 方法 挂载到 实例上
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// 导出 实例
module.exports = axios;

// Allow use of default import syntax in TypeScript
// 以 ES6 模块化方式导出
module.exports.default = axios;
