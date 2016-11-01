const shell = require('shelljs')

// for upload cache
shell.mkdir('dist')

// for tar resource file
shell.mkdir('-p', 'resource/dev')
shell.mkdir('-p', 'resource/pre')
shell.mkdir('-p', 'resource/prod')

// for security Verification
shell.mkdir('rsa')
