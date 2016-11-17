const fs = require('fs')
const tar = require('tar')
const shell = require('shelljs')

/**
 * 将指定路径的文件解包到指定目录下
 * originpath 源路径
 * destpath 目标路径
 * cb 回调函数
 */
function extract(originpath, destpath, cb) {
  const extractor = tar.Extract(destpath).on('error', err => cb(err)).on('end', () => {
    shell.rm(originpath)
    console.log('remove', originpath)
    cb()
  })
  fs.createReadStream(originpath).on('error', err => cb(err)).pipe(extractor)
}

exports.extract = {
  _: extract,
  promise: function (originpath, destpath) {
    return new Promise((resolve, reject) => {
      extract(originpath, destpath, err => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }
}
