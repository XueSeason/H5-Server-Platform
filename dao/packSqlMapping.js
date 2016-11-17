const pack = {
	insert: 'INSERT INTO pack SET ?',
	update: (record, appId, version) => {
    // 无法修改 id、app_id 和 version
    // 只要执行更新操作，那么 state 就被置为 1
    const arr = ['state=1']
    Object.keys(record).forEach(key => {
      if (key !== 'id' && key !=='app_id' && version !== 'version') {
        arr.push(`${key}='${record[key]}'`)
      }
    })
    return `UPDATE pack SET ${arr.join(',')} WHERE app_id='${appId}' and version='${version}'`
	},
  remove: "UPDATE pack SET state=0 WHERE app_id=? and version=?",
	all: (params, ignoreState) => {
    const post = params || {}
    var query = ignoreState === undefined ? 'WHERE state=1' : 'WHERE 1=1'
    Object.keys(post).forEach(key => {
      query += ` AND ${key}='${post[key]}'`
    })
    return `SELECT app_id, version, name, params, dev, pre, prod FROM pack ${query}`
  }
};

module.exports = pack
