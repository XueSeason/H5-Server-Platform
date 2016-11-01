// https://github.com/mysqljs/mysql
const util = require('util')
const mysql = require('mysql')
const dbconfig = require('../config/dbconfig')
const pool = mysql.createPool(dbconfig.connect)

exports.query = function () {
  const args = Array.prototype.slice.call(arguments)
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
        connection.release()
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
