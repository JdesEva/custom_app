/**
 * 遍历中间件,并导出中间件
 * 
 */

const fs = require('fs')
function dir_f(path) {
    return fs.readdirSync(path)
}

const dir = dir_f('./main/middleware/src')

var middlewares = []


dir.forEach(row => {
    
    var fn = require('./src/' + row)

    middlewares.push(fn)

})

module.exports = middlewares