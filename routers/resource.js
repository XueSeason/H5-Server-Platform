const fs = require('fs')
const path = require('path')

const resourceDao = require('../dao/resourceDao')
const express = require('express')
const router = express.Router()

// 该接口可能存在一定安全问题
router.get('/:branch/:appId/:version/:filename', function (req, res) {
  const branch = req.params.branch
  const appId = req.params.appId
  const version = req.params.version
  const filename = req.params.filename

  const dir = path.resolve(__dirname, `../resource/${branch}/${appId}/${version}/${filename}`)

  if (!fs.existsSync(dir)) {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ error: 'no such directory or file!' }))
  }

  res.sendFile(dir)
})

// 返回可配置的资源信息
router.get('/group', function (req, res) {
  resourceDao.group().then(rows => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ group: rows }))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ error: err.toString() }))
  })
})

module.exports = router
