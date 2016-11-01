const express = require('express')
const bodyParser = require('body-parser')

const pack = require('./routers/pack')
const packconfig = require('./routers/packconfig')
const resource = require('./routers/resource')
const upload = require('./routers/upload')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.writeHead(200, { 'content-type': 'text/html' })
  res.end(
    '<form action="/upload/pre" enctype="multipart/form-data" method="post">'+
    'App ID: <input type="text" name="appId"><br>'+
    'Name: <input type="text" name="name"><br>'+
    'Version: <input type="text" name="version"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  )
})

// get pack config
app.use('/static/', packconfig)
// serach for resource
app.use('/resource', resource)
// upload file
app.use('/upload', upload)
// control pack
app.use('/pack', pack)

app.listen(4000, function () {
  console.log('Server listening at 4000.');
})
