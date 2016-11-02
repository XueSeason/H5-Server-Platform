const fs = require('fs')
const path = require('path')
const oss = require('../common/oss')
const config = require('../config/project')

function generateFilename(type, appId) {
  if (type === 'tar') return `${appId}.tar`
  if (type === 'xml') return 'Manifest.xml'
  if (type === 'json') return 'CERT.json'
}

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

function fallback(branch, appId, version) {
  return `${config.cdnDomain}/${config.product}/pack/${branch}/${appId}/${version}/${appId}.tar`
}

exports.existsResource = existsResource
exports.appUrl = appUrl
exports.fallback = fallback