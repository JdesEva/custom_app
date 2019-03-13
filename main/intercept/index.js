/**
 *  http拦截器 by jdes on 2019-03-12
 */

const token = require('../components/token')

function intercept(req, res, next) {
    if (req.url === '/login' || req.url === '/logout') {
        next()
    } else {
        token.verify(req.headers.authorization).then(re => {
            //进行token 验证
            console.log(re)
            next()
        }).catch(() => {
            res.sendStatus(401) //设置响应状态,代表token过期 or token 错误
        })
    }
}

module.exports = intercept
