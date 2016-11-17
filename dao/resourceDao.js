const db = require('../common/db')
const sql = require('./resourceSqlMapping')

function group() {
  return db.query(sql.queryGroup)
}

function all() {
  return db.query(sql.queryAll)
}

/**
 * 登记 resource 表时，先查询之前时候登记过
 * 如果已登记则返回之前的数据，没有则正常进行登记
 */
function add(app_id, version, branch) {
  const values = [app_id, version, branch]
  return db.query(sql.query, values).then(rows => {
    if (Array.isArray(rows) && rows.length > 0) {
      return rows
    } else {
      return db.query(sql.insert, values)
    }
  })
}

exports.all = all
exports.group = group
exports.add = add