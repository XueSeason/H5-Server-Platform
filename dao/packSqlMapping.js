const pack = {
	insert: 'INSERT INTO pack(id, name, params, dev, pre, prod, version, fallback) VALUES(0,?,?,?,?,?,?,?)',
	// update: 'UPDATE pack SET name=?, params=?, dev=?, pre=?, prod=?, version=?, fallback=? WHERE id=?',
	update: (record, id) => {
    const arr = []
    Object.keys(record).forEach(key => {
      if (key !== 'id') {
        arr.push(`${key}='${record[key]}'`)
      }
    })
    return `UPDATE pack SET ${arr.join(',')} WHERE id=${id}`
	},
	remove: 'DELETE FROM pack WHERE id=?',
	queryById: 'SELECT * FROM pack WHERE id=?',
	queryAll: 'SELECT * FROM pack'
};

module.exports = pack
