const pack = {
	insert: 'INSERT INTO pack(id, name, params, dev, pre, prod, version, fallback, app_id) VALUES(0,?,?,?,?,?,?,?,?)',
	update: (record, appId, version) => {
    const arr = []
    Object.keys(record).forEach(key => {
      if (key !== 'id' && key !=='app_id' && version !== 'version') {
        arr.push(`${key}='${record[key]}'`)
      }
    })
    return `UPDATE pack SET ${arr.join(',')} WHERE app_id='${appId}' and version='${version}'`
	},
	remove: "DELETE FROM pack WHERE app_id=? and version=?",
	queryByAppIdAndVersion: "SELECT * FROM pack WHERE app_id=? and version=?",
	queryAll: 'SELECT * FROM pack'
};

module.exports = pack
