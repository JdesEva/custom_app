/**
 * MySQL 连接池 by jdes on 2019-03-14
 */

const mysql = require('mysql')
const config = require('../../config')

const pool = mysql.createPool({
    host: config.sql_host,
    user: config.sql_user,
    password: config.sql_password,
    database: config.sql_database
})

module.exports = pool