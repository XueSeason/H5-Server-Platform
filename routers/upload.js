const fs = require('fs')
const path = require('path')
const filepath = require('../config/filepath')
const util = require('util')

const formidable = require('formidable')
const package = require('../service/package')

const express = require('express')
const router = express.Router()

router.post('/:branch', function (req, res) {
  const branch = req.params.branch
  const form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = filepath.dist
  form.keepExtensions = true
  form.maxFieldsSize = 5 * 1024 * 1024

  form.on('fileBegin', (name, file) => {
    // file.path = path.join(form.uploadDir, file.name)
    file.path = path.join(form.uploadDir, 'resource.tar')
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(200, {'content-type': 'text/plain'})
      res.write(err.toString())
    }
    package(branch, fields.appId, fields.name, fields.version)
    res.writeHead(200, {'content-type': 'text/plain'})
    res.write('received upload:\n\n')
    res.end(util.inspect({fields: fields, files: files}))
  })
})

module.exports = router
