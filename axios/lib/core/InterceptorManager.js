/*
 * @Date: 2020-03-22 14:54:49
 * @LastEditors: Wanghao
 * @LastEditTime: 2020-03-25 12:44:21
 * @FilePath: \source-code\axios\lib\core\InterceptorManager.js
 * @Description: 拦截器构造函数
 */
'use strict';

var utils = require('./../utils');

// 拦截器构造函数
function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 * 
 * 添加一个拦截器方法，返回拦截器队列长度作为的索引id，用于删除该拦截器
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 * 
 * 使用 添加拦截器时返回的索引id 删除 一个拦截器方法
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 * 
 * 迭代调用所有已注册的拦截器方法
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;
