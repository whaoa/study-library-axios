'use strict';

/**
 * 改变 function 的 this 指向
 *
 * @param {Function} fn 需要修改 this 指向的方法
 * @param {Object} thisArg fn 内部 this 指向值
 */
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    // 组合参数为一个数组 (现在 apply 的第二个参数支持 arguments 这种伪数组了)
    // 这里的 arguments 是 wrap 函数的参数
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    // 使用 apply 调用该方法 并 返回执行结果
    return fn.apply(thisArg, args);
  };
};
