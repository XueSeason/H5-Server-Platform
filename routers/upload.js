const fs = require('fs')
const path = require('path')
const filepath = require('../config/filepath')
const util = require('util')

const formidable = require('formidable')
const package = require('../service/package')
const resourceDao = require('../dao/resourceDao')
const oss = require('../service/oss')

const express = require('express')
const router = express.Router()

router.post('/:branch', function (req, res, next) {
  const branch = req.params.branch
  const form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = filepath.dist
  form.keepExtensions = true
  form.maxFieldsSize = 5 * 1024 * 1024

  form.on('fileBegin', (name, file) => {
    file.path = path.join(form.uploadDir, 'resource.tar')
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(200, { 'content-type': 'text/plain' })
      res.write(err.toString())
    }
    // 打包到本地
    package(branch, fields.appId, fields.name, fields.version).then(() => {
      // 将资源信息登记到数据库
      return resourceDao.add(fields.appId, fields.version, branch)
    }).then(rows => {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(rows))
      // 上传到 OSS
      oss.putResource(branch, fields.appId, fields.version)
    }).catch(err => {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ err: err.toString() }))
    })
  })
})

module.exports = router
