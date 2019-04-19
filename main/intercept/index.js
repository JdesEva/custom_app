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
      if (results.password === user[0].password) {
        next()
      } else {
        res.sendStatus(401)
      }
    } catch (err) {
      res.sendStatus(401) //设置响应状态,代表token过期 or token 解析错误
    }
  }
}

module.exports = intercept
