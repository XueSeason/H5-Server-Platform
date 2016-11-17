const fs = require('fs')

/**
 * fs readFile 的 Promise 封装
 */
exports.readFile = function (file, options) {
  return new Promise((resolve, reject) => {
    if (options) {
      fs.readFile(file, option, (err, data) => {
        if (err) { 
          reject(err)
          return
        }
        resolve(data)
      })
    } else {
      fs.readFile(file, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      })
    }
  })
}

/**
 * fs readdir 的 Promise 封装
 */
exports.readdir = function (path, options) {
  return new Promise((resolve, reject) => {
    if (options) {
      fs.readdir(path, options, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      })
    } else {
      fs.readdir(path, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      })
    }
  })
}
