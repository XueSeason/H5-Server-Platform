const fs = require('fs')
const path = require('path')
const filepath = require('../config/filepath')

const manifest = require('../common/manifest').promise
const tar = require('../common/tar').promise
const rsa = require('../common/rsa').promise
const extract = require('../common/tar').extract.promise
const writeFile = require('../common/file').writeFile.promise
const clearDir = require('../common/file').clearDir.promise

module.exports = function (appId, name, version) {
  const dir = path.resolve(__dirname, `../resource/${appId}/${version}`)
  const tarDir = filepath.tarDir(appId, version)
  const xmlDir = filepath.manifestDir(appId, version)

  extract(path.resolve(filepath.dist, 'resource.tar'), filepath.dist).then(() => {
    const q0 = manifest(appId, name, version).then(() => console.log('create manifest success'))
    const q1 = tar(appId, version).then(() => console.log(`create ${appId}.tar success`))

    return Promise.all([q0, q1])
  }).then(() => {
    return Promise.all([rsa.signFile(xmlDir), rsa.signFile(tarDir)])
  }).then(signs => {
    const item = {}
    item["Manifest.xml"] = signs[0]
    item[`${appId}.tar`] = signs[1]
    const cert = JSON.stringify(item)
    return writeFile(dir, 'CERT.json', cert)
  }).then(() => {
    console.log('create CERT.json success')
    return clearDir(filepath.dist)
  }).catch(err => {
    console.log(err)
  })
}
