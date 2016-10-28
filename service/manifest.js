const fs = require('fs')
const xml = require('xml')
const shell = require('shelljs')
const filepath = require('../config/filepath')

function _ (option, cb) {
  const appId = option.appId
  const name = option.name
  const version = option.version
  const branch = option.branch

  const dir = (filepath.packDir(appId, version))[branch]
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

  const stream = fs.createWriteStream((filepath.manifestDir(appId, version))[branch])
  stream.write(xmlString)
  stream.on('error', err => cb(err))
  stream.end(() => cb())
}

exports.manifest = _
exports.promise = function (option) {
  return new Promise((resolve, reject) => {
    _(option, err => {
      if (err) reject(err)
      resolve()
    })
  })
}
