const fs = require('fs')
const path = require('path')
const filepath = require('../config/filepath')

const manifest = require('./manifest').promise
const tar = require('./tar').promise
const rsa = require('./rsa').promise
const extract = require('../common//tar').extract.promise
const writeFile = require('../common/file').writeFile.promise
const clearDir = require('../common/file').clearDir.promise

module.exports = function (appId, name, version) {
  const branch = 'dev'

  const packDir = (filepath.packDir(appId, version))[branch]
  const tarDir = (filepath.tarDir(appId, version))[branch]
  const xmlDir = (filepath.manifestDir(appId, version))[branch]

  const option = { appId, name, version, branch }
  extract(path.resolve(filepath.dist, 'resource.tar'), filepath.dist).then(() => {
    const q0 = manifest(option).then(() => console.log('create manifest success'))
    const q1 = tar(option).then(() => console.log(`create ${appId}.tar success`))

    return Promise.all([q0, q1])
  }).then(() => {
    return Promise.all([rsa.signFile(xmlDir), rsa.signFile(tarDir)])
  }).then(signs => {
    const item = {}
    item["Manifest.xml"] = signs[0]
    item[`${appId}.tar`] = signs[1]
    const cert = JSON.stringify(item)
    return writeFile(packDir, 'CERT.json', cert)
  }).then(() => {
    console.log('create CERT.json success')
    return clearDir(filepath.dist)
  }).catch(err => {
    console.log(err)
  })
}
