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

/**
 * 
 * @param {string} sql SQL语句
 */
function query (sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connect) => {
            if (error) reject(error)
            connect.query(sql, (err, res) => {
                if (err) reject(err)
                resolve(JSON.parse(JSON.stringify(res)))
            })
            connect.release()
        })
    })
}


module.exports = query