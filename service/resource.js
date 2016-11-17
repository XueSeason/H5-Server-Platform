const fs = require('fs')
const path = require('path')
const oss = require('../common/oss')
const config = require('../config/project')

/**
 * 生成指定文件名
 * type 文件类型，即后缀名
 * appId appId
 */
function generateFilename(type, appId) {
  if (type === 'tar') return `${appId}.tar`
  if (type === 'xml') return 'Manifest.xml'
  if (type === 'json') return 'CERT.json'
}

/**
 * 检测本地是否存在指定资源包
 */
function existsResource(branch, appId, version, type) {
  const filepath = path.resolve(
    __dirname,
    `../resource/${branch}/${appId}/${version}`,
    generateFilename(type, appId))

  if (fs.existsSync(filepath)) {
    return true
  } else {
    return false
  }
}

/**
 * 生成本地 tar 包路径下载地址
 */
function appUrl(appId, version) {
  const arr = ['dev', 'pre', 'prod']
  const obj = {}
  arr.forEach(branch => {
    if (existsResource(branch, appId, version, 'tar')) {
      obj[branch] = `${config.domain}/resource/${branch}/${appId}/${version}/${appId}.tar`
    }
  })
  return obj
}

/**
 * 生成 cdn 文件地址
 */
function fallback(branch, appId, version) {
  const tar = `${config.cdnDomain}/${config.product}/pack/${branch}/${appId}/${version}/${appId}.tar`
  const cert = `${config.cdnDomain}/${config.product}/pack/${branch}/${appId}/${version}/CERT.json`
  const manifest = `${config.cdnDomain}/${config.product}/pack/${branch}/${appId}/${version}/Manifest.xml`
  return { tar, cert, manifest }
}

exports.existsResource = existsResource
exports.appUrl = appUrl
exports.fallback = fallback