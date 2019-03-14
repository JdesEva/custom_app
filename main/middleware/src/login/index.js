/***
 * 登陆模块  by jdes on 2019-03-13 
 */

const express = require('express')

const token = require('../../../components/token')
const pool = require('../../../components/sqlconnection')
const response = require('../../../components/response')

const router = express.Router()

/**
 * 登陆
 */
router.post('/login', function (req, res) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err,sql){
            if (err) reject(error)
            sql.query(`SELECT * FROM u_user WHERE username='${req.body.username}'`, function (error, results, fields) {
                if (error) reject(error)
                else if (JSON.parse(JSON.stringify(results))[0].password === req.body.password) {

                    // 操作数据库 修改 登陆状态
                    
                    token.encrypt({
                        username: req.body.username,
                        password: req.body.password
                    }).then(re => {
                        resolve(res.send(response(200, true, re, '登陆成功')))
                    }).catch(er => {
                        reject(er)
                    })
                } else {
                    resolve(res.send(response(200, false, null, '验证失败')))
                }
            })
            sql.release() //释放进程
            console.log(5674)
        })
        
    })
})


/**
 * 登出
 */
router.post('/logout', function (req, res) {
    //操作数据库
    var a = 1
    return new Promise((resolve, reject) => {
        if (a === 1) resolve(res.send(response(200, true, null, '登出成功')))
        reject(new Error('error'))

    })
})

module.exports = router