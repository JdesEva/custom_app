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


/**
 * 查询菜单
 */
router.get('/permission/selectByCondition', async function (req, res, next) {
    var rows = await query('SELECT * FROM ??', ['u_permission'])
    var tree = tool.__ToTree(rows, 'per_id')
    res.send(response(200, true, tree, '查询成功'))
})

/**
 * 添加菜单
 */
router.post('/permission/insert', async function (req, res, next) {
    var params = req.body
    var rows = await query('SELECT * FROM ??', ['u_permission'])
    if (Object.keys(params).length === 0) {
        if (rows.length === 0) {
            var cr = await query('INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)', ['u_permission', 'id', 'path', 'name', 'create_time', '0', '', '新建节点', new Date()])
            if (cr) res.send(response(200, true, null, '根节点创建成功'))
        } else {
            res.send(response(200, false, null, '根节点已经存在'))
        }
    } else {
        if (params.id) {
            var update = await query('UPDATE ?? SET ?? = ?, ?? = ?,??=?,??=?,??=? WHERE ?? = ?', ['u_permission', 'per_path', params.per_path, 'group', params.group, 'per_id', params.per_id, 'path', params.path, 'name', params.name, 'id', params.id])
            if (update) res.send(response(200, true, null, '节点更新成功'))
        } else {
            var add = await query('INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)', ['u_permission', 'id', 'path', 'name', 'create_time', 'per_id', 'group', 'per_path', guid(), params.path, params.name, new Date(), params.per_id, params.group, params.per_path])
            if (add) res.send(response(200, true, null, '节点创建成功'))
        }
    }
    next()
})

/**
 * 添加一级菜单
 */
router.get('/permission/insertRoot', async function (req, res, next) {
    var rows = await query('SELECT * FROM ??', ['u_permission'])
    if (rows.length > 0) {
        var cd = await query('INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)', ['u_permission', 'id', 'path', 'name', 'create_time', guid(), '', '新建节点', new Date()])
        if (cd) res.send(response(200, true, null, '一级菜单创建成功'))
    } else {
        res.send(response(200, false, null, '根节点不存在'))
    }
    next()
})

/**
 * 删除菜单
 */
router.get('/permission/delete', async function (req, res, next) {
    var params = req.query
    var child = await query('SELECT * FROM ?? WHERE ?? = ?', ['u_permission', 'per_id', params.id])
    if (child.length === 0) {
        var rows = await query('DELETE FROM ?? WHERE ?? = ?', ['u_permission', 'id', params.id])
        if (rows) res.send(response(200, true, null, '节点删除成功'))
    } else {
        res.send(response(200, false, null, '存在子节点无法删除'))
    }
    next()
})




module.exports = router