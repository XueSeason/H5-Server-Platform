const fs = require('fs')
const path = require('path')
const filepath = require('../config/filepath')
const util = require('util')

const formidable = require('formidable')
const package = require('../service/package')
const resourceDao = require('../dao/resouceDao')

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
    package(branch, fields.appId, fields.name, fields.version).then(() => {
      req.body.app_id = fields.appId
      req.body.version = fields.version
      req.body.branch = branch
      return resourceDao.add(req, res, next)
    }).catch(err => {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ err: err.toString() }))
    })
  })
})

module.exports = router
