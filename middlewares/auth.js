const jwt = require('jsonwebtoken')
const cert = require('../service/rsa').publicKey 

/**
 * token 验证中间件
 */
module.exports = function (req, res, next) {
  // 获取请求 token
  const token = req.body.token
                || req.query.token
                || req.headers['x-access-token']
  
  if (token) {
    jwt.verify(token, cert, (err, decoded) => {
      if (err) {
        res.writeHead(403, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ err: 'Failed to authenticate token' }))
      } else {
        req.account = decoded
        console.log('account', decoded)
        next()
      }
    })
  } else {
    res.writeHead(403, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ err: 'No token provided' }))
  }
}