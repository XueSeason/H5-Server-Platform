// https://github.com/mysqljs/mysql
const util = require('util')
const mysql = require('mysql')
const dbconfig = require('../config/dbconfig')
const pool = mysql.createPool(dbconfig.connect)

/**
 * 建立链接池访问数据库
 */
exports.query = function () {
  const args = Array.prototype.slice.call(arguments)
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
        console.log('db error', err.toStirng())
        return
      }
      args.push((err, rows) => {
        if (err) {
          reject(err)
          connection.release()
          return
        }
        resolve(rows)
        connection.release()
      })
      connection.query.apply(connection, args)
    })
  })
}
