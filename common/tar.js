const fs = require('fs')
const tar = require('tar')
const shell = require('shelljs')

function extract(orignpath, destpath, cb) {
  const extractor = tar.Extract(destpath).on('error', err => cb(err)).on('end', () => {
    shell.rm(orignpath)
    console.log('remove', orignpath)
    cb()
  })
  fs.createReadStream(orignpath).on('error', err => cb(err)).pipe(extractor)
}

exports.extract = {
  _: extract,
  promise: function (orignpath, destpath) {
    return new Promise((resolve, reject) => {
      extract(orignpath, destpath, err => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }
}
