/*
 * @Date: 2020-03-22 14:54:49
 * @LastEditors: Wanghao
 * @LastEditTime: 2020-03-25 14:30:45
 * @FilePath: \source-code\axios\lib\helpers\combineURLs.js
 * @Description: url 拼接
 */
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * 拼接 url前缀 和 相对路径
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};
