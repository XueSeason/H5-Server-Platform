const fs = require('fs')
const oss = require('ali-oss')
const co = require('co')
const config = require('../config/project').oss

const client = new oss({
  region: config.region,
  accessKeyId: config.accessKeyId,
  accessKeySecret: config.accessKeySecret,
  bucket: config.bucket
})

function putFile(filepath, objectKey) {
  co(function *() {
    if (fs.existsSync(filepath)) {
      const res = yield client.put(objectKey, filepath)
      console.log(res)
    } else {
      throw new Error('No such file.')
    }
  }).catch(err => {
    console.log(err.toString())
  })
}

function existsFile(objectKey, cb) {
  co(function *() {
    const res = yield client.head(objectKey)
    // if exists file
    cb(undefined, res)
  }).catch(err => {
    // if not exists file
    cb(err)
  })
}

exports.putFile = putFile
exports.existsFile = existsFile
