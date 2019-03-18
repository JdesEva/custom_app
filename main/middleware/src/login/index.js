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
        var rows = await query(`SELECT * FROM u_user WHERE username='${req.body.username}'`)
        if (rows[0].password === req.body.password) {
            var Authorization = await token.encrypt({ username: req.body.usernam, password: req.body.password })
            res.send(response(200, true, Authorization, '登陆成功'))
        }
    } catch (err) {
        throw err
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