/**
 * SQL连接池 by jdes on 2019-04-19
 */

const mysql = require('mysql')
const config = require('../../config')

/**
 * 连接池函数
 */

const pool = mysql.createPool({
    host: config.sql_host,
    user: config.sql_user,
    password: config.sql_password,
    database: config.sql_database
})

console.log('The sql Pool is running successfully!')

module.exports = pool
