const path = require('path')

const dist = path.resolve(__dirname, '../dist/')
const resource = path.resolve(__dirname, '../resource/')

const packDir = function (appId, version) {
  return path.resolve(resource, appId, version)
}

const tarDir = function (appId, version) {
  return path.resolve(resource, appId, version, `${appId}.tar`)
}

const certDir = function (appId, version) {
  return path.resolve(resource, appId, version, 'CERT.json')
}

const manifestDir = function (appId, version) {
  return path.resolve(resource, appId, version, 'Manifest.xml')
}

const certPem = path.resolve(__dirname, '../rsa/cert.pem')
const keyPem = path.resolve(__dirname, '../rsa/key.pem')

exports.dist = dist
exports.resource = resource
exports.packDir = packDir
exports.tarDir = tarDir
exports.certDir = certDir
exports.manifestDir = manifestDir

exports.certPem = certPem
exports.keyPem = keyPem
