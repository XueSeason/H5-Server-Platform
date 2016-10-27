const fs = require('fs')

exports.readFile = function (file, options) {
  return new Promise((resolve, reject) => {
    if (options) {
      fs.readFile(file, option, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    } else {
      fs.readFile(file, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    }
  })
}

exports.readdir = function (path, options) {
  return new Promise((resolve, reject) => {
    if (options) {
      fs.readdir(path, options, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    } else {
      fs.readdir(path, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    }
  })
}
