/*
 * @Date: 2020-03-22 14:54:49
 * @LastEditors: Wanghao
 * @LastEditTime: 2020-03-25 14:38:34
 * @FilePath: \source-code\axios\lib\cancel\isCancel.js
 * @Description: 判断请求是否被取消
 */
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
