const resource = {
	insert: 'INSERT INTO resource(app_id, version, branch) VALUES(?,?,?)',
	query: "SELECT app_id, version, branch FROM resource WHERE app_id=? and version=? and branch=?",
	queryGroup: 'SELECT app_id, version FROM resource GROUP BY app_id, version',
	queryAll: 'SELECT app_id, version, branch FROM resource'
};

module.exports = resource
