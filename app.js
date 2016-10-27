const express = require('express')
const bodyParser = require('body-parser')
const file = require('./middleware/file')
const api = require('./middleware/api')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.writeHead(200, {'content-type': 'text/html'})
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    'App ID: <input type="text" name="appId"><br>'+
    'Name: <input type="text" name="name"><br>'+
    'Version: <input type="text" name="version"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  )
})

// serach for resource
app.get('/resource/:appId/:version/:filename', api.resource)

app.post('/upload', file.upload)

app.listen(4000, function () {
  console.log('Server listening at 4000.');
})
