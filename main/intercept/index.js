/**
 *  http拦截器 by jdes on 2019-03-12
 */

const token = require("../components/token")

async function intercept(req, res, next) {
  if (req.url === "/login") {
    next()
  } else {
    try {
      var results = await token.verify(req.headers.authorization)
      if (results) next()
    } catch (err) {
      res.sendStatus(401) //设置响应状态,代表token过期 or token 解析错误
    }
  }
}

module.exports = intercept
