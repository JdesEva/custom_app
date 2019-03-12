/**
 * 服务主文件
 */

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('../config/index')
const login = require('../login/index')
const token_intercept = require('../intercept/index')
const test = require('../test/index')


const app = new express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())


app.use(login)

app.use(token_intercept) //在此之后的请求都需要进行Token拦截验证

app.use(test)



app.listen(config.port, function () {
    console.log(`The server is running at ${config.hostname}:${config.port}`)
})