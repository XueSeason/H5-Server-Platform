const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

function writeFile (pathname, filename, content, cb) {
  if (!fs.existsSync(pathname)) {
    shell.mkdir('-p', pathname)
  }

  const stream = fs.createWriteStream(path.resolve(pathname, filename))
  stream.write(content)
  stream.on('error', err => cb(err))
  stream.end(() => cb())
}

exports.writeFile = {
  promise: function (pathname, filename, content) {
    return new Promise((resolve, reject) => {
      writeFile(pathname, filename, content, err => {
        if (err) reject(err)
        resolve()
      })
    })
  },
  _: writeFile
}

function clearDir (dir, cb) {
  if (!fs.existsSync(dir)) {
    cb('no such direcory.')
    return
  }
  fs.readdir(dir, (err, files) => {
    if (err) {
      cb(err.toString())
      return
    }
    files.forEach(file => {
      const maybeDir = path.resolve(dir, file)
      if (fs.lstatSync(maybeDir).isDirectory()) {
        clearDir(maybeDir, err => {
          if (shell.exec(`rmdir ${maybeDir}`).code !== 0) {
              console.log('rmdir', maybeDir)
          }
          cb(err)
        })
      } else {
        const filepath = path.resolve(dir, file)
        shell.rm(filepath)
        console.log('delete', filepath)
      }
    })
    cb()
  })
}

exports.clearDir = {
  promise: function (dir) {
    return new Promise((resolve, reject) => {
      clearDir(dir, err => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  },
  _: clearDir
}
