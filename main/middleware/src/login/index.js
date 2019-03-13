/***
 * 登陆模块  by jdes on 2019-03-13 
 */

const express = require('express')

const token = require('../../../components/token')
const sql = require('../../../components/sqlconnection')
const response = require('../../../components/response')

const router = express.Router()

/**
 * 登陆
 */
router.post('/login', function (req, res) {
    sql.query(`SELECT * FROM u_user WHERE username='${req.body.username}'`, function (error, results, fields) {
        if (error) throw error
        else if (JSON.parse(JSON.stringify(results))[0].password === req.body.password) {
            // 操作数据库 修改 登陆状态
            token.encrypt({
                username: req.body.username,
                password: req.body.password
            }).then(re => {
                res.send(response(200, true, re, '登陆成功'))
            })

        } else {
            res.send(response(200, false, null, '验证失败'))
        }

    })
})

/**
 * 登出
 */
router.post('/logout', function (req, res) {
    const username = token.verify(req.headers.authorization).username

    //操作数据库 修改登陆状态

    res.send(response(200, true, null, '登出成功'))
})

module.exports = router