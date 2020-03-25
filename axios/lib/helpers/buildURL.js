/*
 * @Date: 2020-03-22 14:54:49
 * @LastEditors: Wanghao
 * @LastEditTime: 2020-03-25 13:59:13
 * @FilePath: \source-code\axios\lib\helpers\buildURL.js
 * @Description: url 处理
 */
'use strict';

var utils = require('./../utils');

// encodeURIComponent 编码后 url 处理，保留以下字符
function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * 处理拼接 url
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /* eslint no-param-reassign: 0 */
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    // 如果有自定义拼接方法
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    // 如果 params 参数是 url 对象
    serializedParams = params.toString();
  } else {
    var parts = [];
    // 遍历 params 对象, 拼接 url 参数
    utils.forEach(params, function serialize(val, key) {
      // 如果是 null / undefined, 直接跳过
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        // 如果值为数组, 修改 key
        key = key + '[]';
      } else {
        // 否则 将值用数组包裹
        val = [val];
      }

      // 遍历 [value]
      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        // 编码后保存
        parts.push(encode(key) + '=' + encode(v));
      });
    });
    // 对结果数组进行 join
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    // 移除 hash 参数
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    // 生成请求url
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};
