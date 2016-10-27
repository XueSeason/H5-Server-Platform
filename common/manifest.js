const fs = require('fs')
const xml = require('xml')
const shell = require('shelljs')
const filepath = require('../config/filepath')

function _ (appId, name, version, cb) {
  const dir = filepath.packDir(appId, version)
  if (!fs.existsSync(dir)) {
    shell.mkdir('-p', dir)
  }

  const xmlString = xml({
    package: [
      { appId },
      { name },
      { version }
    ]
  }, { declaration: true })

  const stream = fs.createWriteStream(filepath.manifestDir(appId, version))
  stream.write(xmlString)
  stream.on('error', err => cb(err))
  stream.end(() => cb())
}

exports.manifest = _
exports.promise = function (appId, name, version) {
  return new Promise((resolve, reject) => {
    _(appId, name, version, err => {
      if (err) reject(err)
      resolve()
    })
  })
}
