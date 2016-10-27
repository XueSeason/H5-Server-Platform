const fs = require('fs')
const filepath = require('../config/filepath')
const tar = require('tar')
const fstream = require('fstream')
const shell = require('shelljs')

_ = function (appId, version, cb) {
  const dir = filepath.packDir(appId, version)
  if (!fs.existsSync(dir)) {
    shell.mkdir('-p', dir)
  }
  const dirDest = fs.createWriteStream(filepath.tarDir(appId, version))

  const packer = tar.Pack({ noProprietary: true })
    .on('error', err => cb(err))
    .on('end', () => cb())

  // This must be a "directory"
  const stream = fstream.Reader({ path: filepath.dist, type: "Directory" })
  stream.pipe(packer).pipe(dirDest)
  stream.on('error', err => cb(err))
}

exports.tar = _
exports.promise = function (appId, version) {
  return new Promise((resolve, reject) => {
    _(appId, version, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

function extract(filepath, destpath, cb) {
  const extractor = tar.Extract(destpath).on('error', err => cb(err)).on('end', () => {
    shell.rm(filepath)
    console.log('remove', filepath)
    cb()
  })
  fs.createReadStream(filepath).on('error', err => cb(err)).pipe(extractor)
}

exports.extract = {
  _: extract,
  promise: function (filepath, destpath) {
    return new Promise((resolve, reject) => {
      extract(filepath, destpath, err => {
        if (err) reject(err)
        resolve()
      })
    })
  }
}
