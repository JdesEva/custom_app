const jwt = require('jsonwebtoken')
const response = require('../response/index')

const secret = 'WXBHGASKXAYA98213hsnuuad' //密钥，可以使用证书

/**生成Token 有效期 1小时 */
function token(payload, mode = true, token = null) {
    if (mode) {
        return jwt.sign(payload, secret, { expiresIn: 3600 })
    } else {
        return jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return response(401, false, null, '无权限')
            } else {
                return decoded
            }
        })
    }

}

module.exports = token