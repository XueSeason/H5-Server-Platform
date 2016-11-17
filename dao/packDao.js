const db = require('../common/db')
const sql = require('./packSqlMapping')

/**
 * post 为普通 JSON 对象进行条件过滤
 * 支持 appId、version 和 name 查询
 */
function all(post) {
  const record = {}
  if (post.appId) record.app_id = post.appId
  if (post.version) record.version = post.version
  if (post.name) record.name = post.name
  return db.query(sql.all(record))
}

/**
 * 添加 pack 信息时，首先会对同一 app_id 和 version 的包检测是否存在
 * 如果存在，则更新 pack 信息，否则插入一条新字段
 */
function add(post) {
  const record = {
    app_id: post.appId,
    version: post.version,
    name: post.name,
    params: post.params,
    dev: post.dev,
    pre: post.pre,
    prod: post.prod
  }
  return db.query(sql.all({
    app_id: record.app_id,
    version: record.version
  }, true)).then(rows => {
    if (Array.isArray(rows) && rows.length > 0) {
      // 存在重复数据
      return db.query(sql.update(record, record.app_id, record.version))
    } else {
      return db.query(sql.insert, record)
    }
  })
}

/**
 * 此处移除并非真实移除数据库中字段，只是将 state 置为 0
 */
function remove(appId, version) {
  return db.query(sql.remove, [appId, version])
}

/**
 * 更新某个字段，此时 state 会被置为 1
 */
function update(post) {
  const record = {
    app_id: post.appId,
    version: post.version,
    name: post.name,
    params: post.params,
    dev: post.dev,
    pre: post.pre,
    prod: post.prod
  }
  return db.query(sql.update(record, record.app_id, record.version))
}

exports.all = all
exports.add = add
exports.remove = remove
exports.update = update
