/**
 * token 模块 by jdes on 2019-03-13
 */

const jwt = require('jsonwebtoken')

const secret = 'WXBHGASKXAYYXBNSYASDNYEJA982YYADATWJ13hsnuuad' //密钥，可以使用证书

const timeExpires = 3600 //过期时间(单位：秒)

const token = {
    encrypt: function (payload) {
        return new Promise((resolve, reject) => {
            var Authorization = jwt.sign(payload, secret, { expiresIn: timeExpires })
            if (Authorization) resolve(Authorization)
            reject(new Error('The Token Generation Failed!'))
        })
    },
    verify: function (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) reject(err)
                resolve(decoded)
            })
        })
    }
}

module.exports = token