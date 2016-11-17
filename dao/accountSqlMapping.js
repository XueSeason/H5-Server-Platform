const account = {
  filterByUsername: 'SELECT username, mail, role FROM account WHERE username=? AND role >= 0',
  filterByMail: 'SELECT username, mail, role FROM account WHERE mail=? AND role >= 0',
  verify: 'SELECT username, mail, role FROM account WHERE username=? AND password=? AND role >= 0',
  register: 'INSERT INTO account SET ?',
  updatePassword: 'UPDATE account SET password=? WHERE username=? AND role >= 0',
  updateRole: 'UPDATE account SET role=? WHERE username=?',
  disable: 'UPDATE account SET role=-1 WHERE username=?'
}

module.exports = account