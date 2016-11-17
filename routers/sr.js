const express = require('express')
const router = express.Router()

const packDao = require('../dao/packDao')
const appUrl = require('../service/resource').appUrl
const fallback = require('../service/resource').fallback

const util = require('../util/util')

router.get('/:appId', function (req, res) {
  const appId = req.params.appId
  packDao.all({ app_id: appId }).then(rows => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows.map(row => row.version)))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ err: err.toString() }))
  })
})

router.get('/:appId/latest', function (req, res) {
  const appId = req.params.appId
  packDao.all({ app_id: appId }).then(rows => {
    res.writeHead(200, { 'content-type': 'application/json' })
    const latest = rows.map(row => row.version).sort(util.compareVersion).pop()
    res.end(JSON.stringify({ latestVersion: latest }))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ err: err.toString() }))
  })
})

router.get('/:appId/:version', function (req, res) {
  const appId = req.params.appId
  const version = req.params.version

  packDao.all({ app_id: appId, version: version }).then(rows => {
    if (Array.isArray(rows) && rows.length > 0) {
      const record = rows[0]
      const fb = fallback('prod', appId, version)
      const obj = {
        name: record.name,
        params: record.params,
        appUrl: appUrl(appId, version),
        host: {
          dev: record.dev,
          pre: record.pre,
          prod: record.prod
        },
        fallback: fb.tar,
        cert: fb.cert,
        manifest: fb.manifest
      }
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(obj))
    } else {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ err: '数据不存在' }))
    }
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ err: err.toString() }))
  })
})

module.exports = router
