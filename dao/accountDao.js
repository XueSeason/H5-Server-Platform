const db = require('../common/db')
const sql = require('./accountSqlMapping')
const md5 = require('../common/md5').md5

function login(username, password) {
  return db.query(sql.verify, [username, md5(password)]).then(rows => {
    if (rows.length === 1) {
      return rows[0]
    } else {
      throw new Error('用户不存在或者密码错误')
    }
  })
}

function updatePassword(username, password, oldPasswd) {
  return db.query(sql.verify, [username, md5(oldPasswd)]).then(rows => {
    if (rows.length === 1) {
      return db.query(sql.updatePassword, [md5(password), username])
    } else {
      throw new Error('用户不存在或者密码错误')
    }
  })
}

function register(post) {
  return db.query(sql.filterByUsername, post.username).then(rows => {
    if (rows.length === 1) {
      throw new Error('用户已存在')
    } else {
      return db.query(sql.filterByMail, post.mail)
    }
  }).then(rows => {
    if (rows.length === 1) {
      throw new Error('邮箱已存在')
    } else {
      const account = {
        username: post.username,
        password: md5(post.password),
        mail: post.mail
      }
      return db.query(sql.register, account)
    }
  })
}

function remove(username) {
  return db.query(sql.disable, username).then(rows => {
    if (rows.affectedRows === 1) {
      return true
    } else {
      throw new Error('用户不存在')
    }
  })
}

function updateRole(username, role) {
  return db.query(sql.updateRole, [role, username]).then(rows => {
    if (rows.affectedRows === 1) {
      return true
    } else {
      throw new Error('用户不存在')
    }
  })
}

function mail(username) {
  return db.query(sql.filterByUsername, username).then(rows => {
    if (rows.length === 1) {
      return rows[0].mail
    } else {
      throw new Error('用户名不存在')
    }
  })
}

exports.login = login
exports.updatePassword = updatePassword
exports.register = register
exports.remove = remove
exports.updateRole = updateRole
exports.mail = mail