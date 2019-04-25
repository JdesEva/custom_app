/***
 * 虚拟接口 方便前台测试
 */

const express = require('express')
const path = require('path')

const guid = require('../../../utils/guid')

require('node-require-alias').setAlias("@", path.join(__dirname.split('middleware')[0], "/components"))

const response = require('@/response')

const router = express.Router()

router.get('/vt_x/selectByCondition', async function (req, res, next) {
    var params = req.query
    if (!params || Object.keys(params).length === 0) {
        var result = {
            id: guid()
        }
        var k = Math.floor(Math.random() * 10)
        for (let i = 0; i < k; i++) {
            var key = guid().substr(i, i + 4)
            result[key] = 'adsdasd'
        }
    }
})


module.exports = router