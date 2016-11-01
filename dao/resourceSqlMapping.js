const resource = {
	insert: 'INSERT INTO resource(id, app_id, version, branch) VALUES(0,?,?,?)',
	queryByAppIdAndVersion: "SELECT * FROM resource WHERE app_id=? and version=?",
	queryAll: 'SELECT * FROM resource'
};

module.exports = resource
