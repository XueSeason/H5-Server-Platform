const fs = require('fs')
const path = require('path')
const filepath = require('../config/filepath')

const manifest = require('./manifest').promise
const tar = require('./tar').promise
const rsa = require('./rsa').promise
const extract = require('../common//tar').extract.promise
const writeFile = require('../common/file').writeFile.promise
const clearDir = require('../common/file').clearDir.promise

/**
 * 将上传目录中的文件，打包成指定的资源包
 */
module.exports = function (branch, appId, name, version) {
  const packDir = (filepath.packDir(appId, version))[branch]
  const tarDir = (filepath.tarDir(appId, version))[branch]
  const xmlDir = (filepath.manifestDir(appId, version))[branch]

  const option = { appId, name, version, branch }
  // 解压上传的 tar 包
  return extract(path.resolve(filepath.dist, 'resource.tar'), filepath.dist).then(() => {

    // 创建 manifest 和 tar 包
    const q0 = manifest(option).then(() => console.log('create manifest success'))
    const q1 = tar(option).then(() => console.log(`create ${appId}.tar success`))

    return Promise.all([q0, q1])
  }).then(() => {

    // 对文件进行签名
    return Promise.all([rsa.signFile(xmlDir), rsa.signFile(tarDir)])
  }).then(signs => {

    // 将签名信息写进 CERT.json 文件中
    const item = {}
    item["Manifest.xml"] = signs[0]
    item[`${appId}.tar`] = signs[1]
    const cert = JSON.stringify(item)
    return writeFile(packDir, 'CERT.json', cert)
  }).then(() => {
    console.log('create CERT.json success')

    // 清空上传目录
    return clearDir(filepath.dist)
  }).catch(err => {
    console.log(err)
  })
}
