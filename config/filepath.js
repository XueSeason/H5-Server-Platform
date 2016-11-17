const path = require('path')

const dist = path.resolve(__dirname, '../dist/')
const resource = path.resolve(__dirname, '../resource/')

// 资源包路径
const packDir = function (appId, version) {
  return {
    dev: path.resolve(resource, 'dev', appId, version),
    pre: path.resolve(resource, 'pre', appId, version),
    prod: path.resolve(resource, 'prod', appId, version)
  }
}

// tar 包路径
const tarDir = function (appId, version) {
  return {
    dev: path.resolve(resource, 'dev', appId, version, `${appId}.tar`),
    pre: path.resolve(resource, 'pre', appId, version, `${appId}.tar`),
    prod: path.resolve(resource, 'prod', appId, version, `${appId}.tar`)
  }
}

// 验证信息路径
const certDir = function (appId, version) {
  return {
    dev: path.resolve(resource, 'dev', appId, version, 'CERT.json'),
    pre: path.resolve(resource, 'pre', appId, version, 'CERT.json'),
    prod: path.resolve(resource, 'prod', appId, version, 'CERT.json')
  }
}

// 配置文件路径
const manifestDir = function (appId, version) {
  return {
    dev: path.resolve(resource, 'dev', appId, version, 'Manifest.xml'),
    pre: path.resolve(resource, 'pre', appId, version, 'Manifest.xml'),
    prod: path.resolve(resource, 'prod', appId, version, 'Manifest.xml')
  }
}

// 本地证书路径
const certPem = path.resolve(__dirname, '../rsa/cert.pem')
// 本地私钥路径
const keyPem = path.resolve(__dirname, '../rsa/key.pem')

exports.dist = dist
exports.resource = resource
exports.packDir = packDir
exports.tarDir = tarDir
exports.certDir = certDir
exports.manifestDir = manifestDir

exports.certPem = certPem
exports.keyPem = keyPem
