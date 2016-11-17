const crypto = require('crypto')

/**
 * 将指定字符串 md5 加密，并转为 base64 格式
 * str 指定字符串
 */
exports.md5 = function (str) {
  const md5 = crypto.createHash('md5')
  md5.update(str, 'utf8')
  return md5.digest('base64')
}