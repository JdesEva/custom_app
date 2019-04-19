/**
 * 菜单模块 by jdes on 2019-04-19
 */

const express = require('express')
const path = require('path')

const guid = require('../../../utils/guid')

require('node-require-alias').setAlias("@", path.join(__dirname.split('middleware')[0], "/components"))

const query = require('@/sqlconnection')
const response = require('@/response')
const redis = require('@/redis')

const router = express.Router()

router.get('/permission/selectByCondition', async function (req, res, next) {
    var rows = await query('SELECT * FROM ??', ['u_permission'])
    res.send(response(200, true, rows, '查询成功'))
})

router.post('/permission/insert', async function (req, res, next) {

})





module.exports = router