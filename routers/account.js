const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const accountDao = require('../dao/accountDao')
const cert = require('../service/rsa').privateKey
const passphrase = require('../config/project').passphrase

router.post('/login', function (req, res) {
  if (req.body.username && req.body.password) {
    const username = req.body.username.trim()
    const password = req.body.password.trim()

    accountDao.login(username, password).then(account => {
      const token = jwt.sign(account, { key: cert, passphrase }, {
        algorithm: 'RS512',
        expiresIn: 60 * 60 * 24 // 24 小时后过期
      })
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ token }))
    }).catch(err => {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ err: err.toString() }))
    })

  } else {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ err: '请输入正确的用户名和密码' }))
  }
})

router.post('/register', function (req, res) {
  if (req.body.username && req.body.password && req.body.mail) {
    const username = req.body.username.trim()
    const password = req.body.password.trim()
    const mail = req.body.mail.trim()

    accountDao.register({ username, password, mail }).then(() => {
      return accountDao.login(username, password)
    }).then(account => {
      const token = jwt.sign(account, { key: cert, passphrase }, {
        algorithm: 'RS512',
        expiresIn: 60 * 60 * 24 // 24 小时后过期
      })
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ token }))
    }).catch(err => {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ err: err.toString() }))
    })

  } else {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ err: '请输入正确的用户名、密码和邮箱' }))
  }
})

// router.post('/forget', function (req, res) {
//   if (req.body.username) {
//     const username = req.body.username.trim()
//     accountDao.mail(username).then(mail => {
//       // 发送邮件
//     }).catch(err => {
//       res.writeHead(200, { 'content-type': 'application/json' })
//       res.end(JSON.stringify({ err: err.toString() }))
//     })
//   } else if (req.body.mail) {
//     const mail = req.body.mail.trim()
//     // 发送邮件
//   } else {
//     res.writeHead(200, { 'content-type': 'application/json' })
//     res.end(JSON.stringify({ err: '请输入正确的用户名或邮箱' }))
//   }
// })

module.exports = router