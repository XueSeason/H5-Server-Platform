const path = require('path')

const clearDir = require('./file').clearDir.promise
clearDir(path.resolve(__dirname, '../dist/')).then(() => console.log('done')).catch(err => console.log(err))

// const extract = require('./tar').extract.promise
// const dest = path.resolve(__dirname, '../dist/')
// extract(path.resolve(dest, 'resource.tar'), dest).then(() => console.log('done')).catch(err => console.log(err))
