const fs = require('fs')
const path = require('path')

const express = require('express')
const router = express.Router()

router.get('/:branch/:appId/:version/:filename', function (req, res) {
  const branch = req.params.branch
  const appId = req.params.appId
  const version = req.params.version
  const filename = req.params.filename

  const dir = path.resolve(__dirname, `../resource/${branch}/${appId}/${version}/${filename}`)

  if (!fs.existsSync(dir)) {
    res.writeHead(200, {'content-type': 'application/json'})
    res.end(JSON.stringify({ error: 'no such directory or file!' }))
  }

  res.sendFile(dir)
})

module.exports = router
