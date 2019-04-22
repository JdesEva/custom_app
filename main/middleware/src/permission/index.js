/**
 * 菜单模块 by jdes on 2019-04-19
 */

const express = require('express')
const path = require('path')

const guid = require('../../../utils/guid')

require('node-require-alias').setAlias("@", path.join(__dirname.split('middleware')[0], "/components"))

require('node-require-alias').setAlias("&", path.join(__dirname.split('middleware')[0], "/utils"))

const query = require('@/sqlconnection')
const response = require('@/response')
const redis = require('@/redis')
const tool = require('&/tree')



const router = express.Router()

router.get('/permission/selectByCondition', async function (req, res, next) {
    var rows = await query('SELECT * FROM ??', ['u_permission'])
    var tree = tool.__ToTree(rows, 'per_id')
    res.send(response(200, true, tree, '查询成功'))
})

router.post('/permission/insert', async function (req, res, next) {
    var params = req.body
    var rows = await query('SELECT * FROM ??', ['u_permission'])
    if (Object.keys(params).length === 0) {
        if (rows.length === 0) {
            var cr = await query('INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)', ['u_permission', 'id', 'path', 'name', 'create_time', '0', '/', '新建节点', new Date()])
            if (cr) res.send(response(200, true, null, '根节点创建成功'))
        } else {
            res.send(response(200, false, null, '根节点已经存在'))
        }
    } else {
        var update = await query('UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?', ['u_permission', 'path', req.body.path, 'name', req.body.name, 'id', req.body.id])
        if (update) res.send(response(200, true, null, '节点更新成功'))
    }
    next()
})





module.exports = router