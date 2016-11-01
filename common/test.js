const db = require('./db')
const pack = require('../dao/packSqlMapping')

db.query(pack.queryById, 1).then(rows => console.log('rows', rows)).catch(err => console.log('err', err))
db.query(pack.queryAll).then(rows => console.log('rows', rows)).catch(err => console.log('err', err))
