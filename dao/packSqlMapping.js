const pack = {
	insert: 'INSERT INTO pack(id, name, params, dev, pre, prod, version, fallback, app_id) VALUES(0,?,?,?,?,?,?,?,?)',
	// update: 'UPDATE pack SET name=?, params=?, dev=?, pre=?, prod=?, version=?, fallback=? WHERE id=?',
	update: (record, appId) => {
    const arr = []
    Object.keys(record).forEach(key => {
      if (key !== 'id' && key !=='app_id') {
        arr.push(`${key}='${record[key]}'`)
      }
    })
    return `UPDATE pack SET ${arr.join(',')} WHERE app_id='${appId}'`
	},
	remove: "DELETE FROM pack WHERE app_id=?",
	queryByAppId: "SELECT * FROM pack WHERE app_id=?",
	queryAll: 'SELECT * FROM pack'
};

module.exports = pack
