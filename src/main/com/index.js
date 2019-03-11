const config = require('../config/index')
const token = require('../token/index')
const sql = require('../sqlconnection/index')
const response = require('../response/index')

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())


app.all(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})


app.post('/process_post', function (req, res) {
    res.send('abcdefg')
})

app.post('/login', function (req, res) {
    sql.query(`SELECT * FROM u_user WHERE username='${req.body.userName}'`, function (error, results, fields) {
        if (error) throw error
        else if (JSON.parse(JSON.stringify(results))[0].password === req.body.passWord) {
            res.send(response(200, token({
                username: req.body.userName,
                passWord: req.body.passWord
            }), '登陆成功'))
        } else {
            res.send('登陆失败')
        }

    })
})

app.listen(config.port, function () {
    console.log(`The server is running at ${config.hostname}:${config.port}`)
})
