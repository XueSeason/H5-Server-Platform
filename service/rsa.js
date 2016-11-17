const fs = require('fs')
const filepath = require('../config/filepath')
const crypto = require('crypto')

const privateKey = fs.readFileSync(filepath.keyPem, 'ascii')
const publicKey = fs.readFileSync(filepath.certPem, 'ascii')
const passphrase = require('../config/project').passphrase

const _ = {
  // 文件签名
  signFile: function (pathname, cb) {
    const sign = crypto.createSign('md5')
    const verify = crypto.createVerify('md5')

    const s = fs.ReadStream(pathname)
    s.on('data', function (d) {
      sign.update(d)
    })
    s.on('error', function(err) {
      cb(err)
    })
    s.on('end', function () {
      const signature = sign.sign({
        key: privateKey,
        passphrase
      }) // generate signature
      cb(undefined, signature.toString('base64'))
    })
  },
  // 文件验证
  verifyFile: function (pathname, signature, cb) {
    const sign = crypto.createSign('md5')
    const verify = crypto.createVerify('md5')

    const s = fs.ReadStream(pathname)
    s.on('data', function (d) {
      verify.update(d)
    })
    s.on('error', function(err) {
      cb(err)
    })
    s.on('end', function () {
      const result = verify.verify(publicKey, Buffer.from(signature, 'base64')) // verify signature
      cb(undefined, result)
    })
  }
}

exports.privateKey = privateKey
exports.publicKey = publicKey
exports.rsa = _
exports.promise = {
  signFile: function (pathname, cb) {
    return new Promise((resolve, reject) => {
      _.signFile(pathname, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      })
    })
  },
  verifyFile: function (pathname, signature, cb) {
    return new Promise((resolve, reject) => {
      _.verifyFile(pathname, signature, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      })
    })
  }
}
