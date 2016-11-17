const fs = require('fs')
const filepath = require('../config/filepath')
const tar = require('tar')
const fstream = require('fstream')
const shell = require('shelljs')

/**
 * 将上传目录中解压后的文件重新打包成 tar 包，保存到本地
 */
_ = function (option, cb) {
  const appId = option.appId
  const version = option.version
  const branch = option.branch

  // 获取资源包路径
  const dir = (filepath.packDir(appId, version))[branch]
  if (!fs.existsSync(dir)) {
    shell.mkdir('-p', dir)
  }
  // 指定 tar 包的写入流
  const dirDest = fs.createWriteStream((filepath.tarDir(appId, version))[branch])

  const packer = tar.Pack({ noProprietary: true })
    .on('error', err => cb(err))
    .on('end', () => cb())

  // This must be a "directory"
  // 读取上传目录文件内容，输出到资源包路径
  const stream = fstream.Reader({ path: filepath.dist, type: "Directory" })
  stream.pipe(packer).pipe(dirDest)
  stream.on('error', err => cb(err))
}

exports.tar = _
exports.promise = function (option) {
  return new Promise((resolve, reject) => {
    _(option, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}
