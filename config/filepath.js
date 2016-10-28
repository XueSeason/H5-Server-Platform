const path = require('path')

const dist = path.resolve(__dirname, '../dist/')
const resource = path.resolve(__dirname, '../resource/')

const packDir = function (appId, version) {
  return {
    dev: path.resolve(resource, 'dev', appId, version),
    pre: path.resolve(resource, 'pre', appId, version),
    prod: path.resolve(resource, 'prod', appId, version)
  }
}

const tarDir = function (appId, version) {
  return {
    dev: path.resolve(resource, 'dev', appId, version, `${appId}.tar`),
    pre: path.resolve(resource, 'pre', appId, version, `${appId}.tar`),
    prod: path.resolve(resource, 'prod', appId, version, `${appId}.tar`)
  }
}

const certDir = function (appId, version) {
  return {
    dev: path.resolve(resource, 'dev', appId, version, 'CERT.json'),
    pre: path.resolve(resource, 'pre', appId, version, 'CERT.json'),
    prod: path.resolve(resource, 'prod', appId, version, 'CERT.json')
  }
}

const manifestDir = function (appId, version) {
  return {
    dev: path.resolve(resource, 'dev', appId, version, 'Manifest.xml'),
    pre: path.resolve(resource, 'pre', appId, version, 'Manifest.xml'),
    prod: path.resolve(resource, 'prod', appId, version, 'Manifest.xml'),
  }
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
