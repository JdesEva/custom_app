const mysql = require('mysql')
const config = require('../config/index')

const sql = mysql.createConnection({
    host: config.sql_host,
    user: config.sql_user,
    password: config.sql_password,
    database: config.sql_database
})

sql.connect()

module.exports = sql