const express = require('express')
const bodyParser = require('body-parser')

const port = require('./config/project').port

// 中间件
const auth = require('./middlewares/auth')

// 路由
const pack = require('./routers/pack')
const sr = require('./routers/sr')
const resource = require('./routers/resource')
const upload = require('./routers/upload')
const account = require('./routers/account')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// use html file
app.use(express.static('public'))
// 提供给 App 端的接口
app.use('/sr/', sr)

// 账号操作
app.use('/user/', account)

// jwt 验证
app.use(auth)
// 上传资源文件接口
// 主要负责资源上传到服务器和 OSS，同时将资源信息登记到数据库
app.use('/upload', upload)
// 登记的资源信息接口
app.use('/resource', resource)
// 配置离线资源包
app.use('/pack', pack)

app.listen(port, function () {
  console.log(`Server listening at ${port}.`)
})
