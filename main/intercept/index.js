/**
 *  Token 拦截验证
 */

const token = require('../components/token')

function token_intercept(req, res, next) {
    res.header("Content-Type", "application/json;charset=utf-8")
    if (req.url === '/login' || req.url === '/logout') {
        next()
    } else {
        const result = token({}, false, req.headers.authorization)
        console.log(result, typeof result)
        if (typeof result === 'string' && result.indexOf('401') > -1) {
            res.status(401) //设置响应状态,代表token过期 or token 错误
            res.send(result)
        } else {
            //此处进行 正确的token验证
            next()
        }
    }

}

module.exports = token_intercept
