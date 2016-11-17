const path = require('path')
const fs = require('fs')
const oss = require('../common/oss')
const product = require('../config/project').product

exports.putResource = function (branch, appId, version) {
  try {
    // 获取本地文件目录
    const directory = path.resolve(__dirname, `../resource/${branch}/${appId}/${version}/`)
    // 将指定目录内所有文件上传到 OSS 上
    const stats = fs.lstatSync(directory)
    if (stats.isDirectory()) {
      fs.readdir(directory, (err, files) => {
        files.forEach(file => {
          oss.putFile(path.resolve(directory, file), `${product}/pack/${branch}/${appId}/${version}/${file}`)
        })
      })
    }
  } catch (e) {
    console.log(e.toString())
  }
}