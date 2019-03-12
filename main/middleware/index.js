/**
 * 遍历中间件,并导出中间件
 * 
 */

const fs = require('fs')

function dir_f(path) {
    return fs.readdirSync(path)
}

const dir = dir_f('./main/middleware/src')

var middleware = []

dir.forEach(row => {
    var mod = require('./src/' + row)
    middleware.push(mod)
})

module.exports = middleware