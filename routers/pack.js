const express = require('express')
const router = express.Router()

const packDao = require('../dao/packDao')

router.get('/', function (req, res) {
  const query = req.query || {}
  packDao.all(query).then(rows => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ err: err.toString() }))
  })
})

router.post('/add', function (req, res) {
  packDao.add(req.body).then(rows => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ err: err.toString() }))
  })
})

router.post('/update', function (req, res) {
  packDao.update(req.body).then(rows => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ err: err.toString() }))
  })
})

router.post('/remove', function (req, res) {
  packDao.remove(req.body.appId, req.body.version).then(rows => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ err: err.toString() }))
  })
})

module.exports = router
