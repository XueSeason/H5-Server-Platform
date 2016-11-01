const db = require('../common/db')
const sql = require('./resourceSqlMapping')

function all(req, res, next) {
  db.query(sql.queryAll).then(rows => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ 'error': err.toString() }))
  })
}

function add(req, res, next) {
  const values = []
  values.push(req.body.app_id)
  values.push(req.body.version)
  values.push(req.body.branch)
  db.query(sql.queryByAppIdAndVersion, values).then(rows => {
    if (Array.isArray(rows) && rows.length > 0) {
      throw new Error('存在重复数据')
    } else {
      return db.query(sql.insert, values)
    }
  }).then(rows => {
   res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ 'error': err.toString() }))
  })
}

exports.all = all
exports.add = add