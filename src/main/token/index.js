const jwt = require('jsonwebtoken')

const secret = 'WXBHGASKXAYA98213hsnuuad' //密钥，可以使用证书

/**生成Token 有效期 1小时 */
function token(payload) {
    return jwt.sign(payload, secret, { expiresIn: 3600 })
}

module.exports = token