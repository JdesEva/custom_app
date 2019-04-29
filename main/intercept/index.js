/**
 *  http拦截器 by jdes on 2019-03-12
 */

const token = require("../components/token")
const redis = require('../components/redis')

async function intercept(req, res, next) {
  if (req.url === "/user/login" || req.url === '/user/register') {
    next()
  } else {
    try {
      var results = await token.verify(req.headers.authorization)
      var user = await redis.get(results.username)
      var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '')
      if (ip === '::1') ip = '127.0.0.1'
      if (results.password === user[0].password && results.login_ip === ip && ip === user[0].login_ip) { //判断token中密码,ip是否一致
        next()
      } else {
        res.sendStatus(401)
      }
    } catch (err) {
      res.sendStatus(500) //设置响应状态,代表token过期 or token 解析错误
    }
  }
}

module.exports = intercept
