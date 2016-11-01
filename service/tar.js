const fs = require('fs')
const filepath = require('../config/filepath')
const tar = require('tar')
const fstream = require('fstream')
const shell = require('shelljs')

_ = function (option, cb) {
  const appId = option.appId
  const version = option.version
  const branch = option.branch

  const dir = (filepath.packDir(appId, version))[branch]
  if (!fs.existsSync(dir)) {
    shell.mkdir('-p', dir)
  }
  const dirDest = fs.createWriteStream((filepath.tarDir(appId, version))[branch])

  const packer = tar.Pack({ noProprietary: true })
    .on('error', err => cb(err))
    .on('end', () => cb())

  // This must be a "directory"
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
