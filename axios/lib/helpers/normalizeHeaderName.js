/*
 * @Date: 2020-03-22 14:54:49
 * @LastEditors: Wanghao
 * @LastEditTime: 2020-03-24 19:00:08
 * @FilePath: \source-code\axios\lib\helpers\normalizeHeaderName.js
 * @Description: 请求头字段处理
 */
'use strict';

var utils = require('../utils');

// 处理 请求头 中 字段大小写不同 导致的字段重复问题
// 使用 指定的字段名作为 最终结果
module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
