/***
 * 登陆模块  by jdes on 2019-03-13 
 */

const express = require('express')

const token = require('../../../components/token')
const query = require('../../../components/sqlconnection')
const response = require('../../../components/response')

const router = express.Router()


/**
 * 登陆
 */
router.post('/login', async (req, res) => {
    try {
        var rows = await query('SELECT * FROM ?? WHERE ?? = ?', ['u_user', 'username', req.body.username])
        if (rows.length > 0 && rows[0].password === req.body.password) {
            var Authorization = await token.encrypt({ username: req.body.usernam, password: req.body.password }) //生成Token
            var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '') //获取客户端IP
            var result = await query('UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?', ['u_user', 'login_ip', ip, 'login_time', new Date(), 'username', req.body.username]) //更新数据库
            if (result) {
                res.send(response(200, true, Authorization, '登陆成功'))
            } else {
                res.send(response(200, false, null, '登陆失败'))
            }
        } else {
            res.send(response(200, false, null, '登陆失败'))
        }
    } catch (err) {
        res.sendStatus(500).send('后台异常, 请联系研发人员')
    }
})


/**
 * 登出
 */
router.get('/logout', function (req, res) {
    try {
        res.send(response(200, true, null, '登出成功'))
    } catch (err) {
        throw err
    }
})

module.exports = router