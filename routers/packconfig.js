const express = require('express')
const router = express.Router()

const db = require('../common/db')
const sql = require('../dao/packSqlMapping')
const appUrl = require('../service/resource').appUrl
const fallback = require('../service/resource').fallback

router.get('/:appId/:version', function (req, res) {
  const appId = req.params.appId
  const version = req.params.version
  // read data from db and reduce data.
  db.query(sql.queryByAppIdAndVersion, [appId, version]).then(rows => {
    if (Array.isArray(rows) && rows.length > 0) {
      const record = rows[0]
      const obj = {
        name: record.name,
        params: record.params,
        appUrl: appUrl(appId, version),
        host: {
          dev: record.dev,
          pre: record.pre,
          prod: record.prod
        },
        version: record.version,
        fallback: fallback('prod', appId, version)
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
