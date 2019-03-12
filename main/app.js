/**
 *   服务主文件  edit by jdes on 2019-03-12
 */

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

/**
 * 读取配置文件
 */
const config = require('./config')

/**
 * 调用Token 拦截器
 */

const intercept = require('./intercept')

/**
 * 读取中间件
 */
const middleware = require('./middleware')

/**
 * 启动Express服务器
 */
const app = new express()

/**
 * 服务必要组件 cookie json序列化 表单序列化
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(intercept)

/**
 * 调用中间件
 */
middleware.forEach(row => {
    app.use(row)
})


app.listen(config.port, function () {
    console.log(`The server is running at ${config.hostname}:${config.port}`)
})