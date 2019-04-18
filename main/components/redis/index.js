/**
 * redis 缓存操作 by jdes on 2019-04-18
 */


const redisPool = require('redis-connection-pool')

const Pool = redisPool('RedisPool', {
    host: '127.0.0.1', // default 
    port: 6379, //default 
    max_clients: 30, // defalut 
    perform_checks: false
})

const expire = 3600 //数据过期时间,秒

module.exports = {
    set: function (key, value) {
        return new Promise((resolve, reject) => {
            if (typeof (value) === 'object') value = JSON.stringify(value)
            Pool.set(key, value, function (err) {
                if (err) reject(-1)
                Pool.expire(key, expire) //过期时间
                resolve(undefined)
            })
        })
    },
    get: function (key) {
        return new Promise((resolve, reject) => {
            Pool.get(key, function (err, res) {
                if (err) reject(-1)
                var res = res === null ? 'null' : res.trim() //null不能进行trim()操作,必须排除
                var reg = /^[\{|\[](.)*[\]|\}]$/
                if (res === 'true' || res === 'false' || res === 'null' || reg.test(res)) {
                    resolve(JSON.parse(res))
                } else if (res === 'undefined') {
                    resolve(undefined)
                } else {
                    if (isNaN(res * 1)) {
                        resolve(res)
                    } else {
                        resolve(res * 1)
                    }
                }
            })
        })
    },
    delete: function (key) {
        return new Promise((resolove, reject) => {
            Pool.del(key, function (err) {
                if (err) reject(-1)
                resolove(undefined)
            })
        })
    }
}