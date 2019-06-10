/***
 * 登陆模块  by jdes on 2019-03-13
 */

const express = require('express')
const path = require('path')

const guid = require('../../../utils/guid')

require('node-require-alias').setAlias(
  '@',
  path.join(__dirname.split('middleware')[0], '/components')
)

const token = require('@/token')
const query = require('@/sqlconnection')
const response = require('@/response')
const redis = require('@/redis')

const router = express.Router()

/**
 * 登陆
 */
router.post('/user/login', async (req, res, next) => {
  try {
    var rows = await query('SELECT * FROM ?? WHERE ?? = ?', [
      'u_user',
      'username',
      req.body.username
    ])
    if (rows.length > 0 && rows[0].password === req.body.password) {
      //获取客户端IP
      var ip = req.headers['x-real-ip']
        ? req.headers['x-real-ip']
        : req.ip.replace(/::ffff:/, '')
      //生成Token
      var Authorization = await token.encrypt({
        username: req.body.username,
        password: req.body.password,
        login_ip: ip
      })
      //更新数据库
      var result = await query('UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?', [
        'u_user',
        'login_ip',
        ip,
        'login_time',
        new Date(),
        'username',
        req.body.username
      ])
      //将当前登陆成功的用户信息取出放入redis
      var user = await redis.get(req.body.username)
      if (!user) await redis.set(req.body.username, rows)

      //输出
      if (result) {
        res.send(response(200, true, Authorization, '登陆成功'))
        next()
      } else {
        res.send(response(200, false, null, '登陆失败'))
      }
    } else {
      res.send(response(200, false, null, '登陆失败'))
    }
  } catch (err) {
    res.sendStatus(500)
  }
})

/**
 * 登出
 */
router.get('/user/logout', async function(req, res) {
  try {
    res.send(response(200, true, null, '登出成功'))
  } catch (err) {
    throw err
  }
})

/**
 * 注册
 */
router.post('/user/register', async function(req, res, next) {
  try {
    var rows = await query('SELECT * FROM ?? WHERE ?? = ?', [
      'u_user',
      'username',
      req.body.username
    ])
    if (rows.length === 0) {
      //获取客户端IP
      var ip = req.headers['x-real-ip']
        ? req.headers['x-real-ip']
        : req.ip.replace(/::ffff:/, '')
      //插入用户数据
      var register = await query(
        'INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,?,?,?)',
        [
          'u_user',
          'id',
          'username',
          'password',
          'create_ip',
          'create_time',
          guid(),
          req.body.username,
          req.body.password,
          ip,
          new Date()
        ]
      )
      if (register) {
        res.send(response(200, true, null, '注册成功'))
      }
    } else {
      res.send(response(200, false, null, '用户名已存在'))
      next()
    }
  } catch (err) {
    res.sendStatus(500)
  }
})

/**
 * 查询用户数据
 */

router.get('/user/selectByCondition', async function(req, res, next) {
  var rows = await query(
    `SELECT ??,??,??,??,??,DATE_FORMAT(??,'%Y-%m-%d %H:%i:%s') AS ??,DATE_FORMAT(??,'%Y-%m-%d %H:%i:%s') AS ?? FROM u_user`,
    [
      'username',
      'id',
      'telphone',
      'create_ip',
      'login_ip',
      'login_time',
      'login_time',
      'create_time',
      'create_time',
      'u_user'
    ]
  )
  if (rows) res.send(response(200, true, rows, '查询成功'))
  next()
})

module.exports = router
