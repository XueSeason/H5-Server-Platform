const fs = require('fs')
const path = require('path')

exports.resource = function (req, res, next) {
  const appId = req.params.appId
  const version = req.params.version
  const filename = req.params.filename

  const dir = path.resolve(__dirname, `../resource/${appId}/${version}/${filename}`)

  if (!fs.existsSync(dir)) {
    res.writeHead(200, {'content-type': 'application/json'})
    res.end(JSON.stringify({ error: 'no such directory or file!' }))
  }

  res.sendFile(dir)
}
