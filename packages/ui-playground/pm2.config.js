const pkg = require('./package.json')
const pm2 = require('@saulx/pm2')
module.exports = pm2(pkg)
