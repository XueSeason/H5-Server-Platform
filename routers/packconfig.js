const express = require('express')
const router = express.Router()

router.get('/:appId/:version', function (req, res) {
  const appId = req.params.appId
  const version = req.params.version
  // read data from db and reduce data.
  const config = {
    url: "/slideplus/home.html",
    params: {
      showTitleBar: true,
      showProgress: false
    },
    appUrl: {
      dev: "http://xxxx/xx.tar",
      prod: "http://xxxx/xx.tar",
      pre: "http://xxxx/xx.tar"
    },
    host: {
      dev: "http://www.xiaoying.tv",
      prod: "http://www.xiaoying.tv",
      pre: "http://pre.xiaoying.tv"
    },
    version: "2.0.0",
    fallback: "http://cdn.xiaoying.tv"
  }
  res.writeHead(200, { 'content-type': 'application/json' })
  res.end(JSON.stringify(config))
})

module.exports = router
