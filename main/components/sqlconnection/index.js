/**
 * MySQL 连接池 by jdes on 2019-03-14
 */

const mysql = require('mysql')
const config = require('../../config')

/**
 * 连接池函数
 */
function pool() {
    return new Promise(resolve => {
        resolve(mysql.createPool({
            host: config.sql_host,
            user: config.sql_user,
            password: config.sql_password,
            database: config.sql_database
        }))
    })
}

/**
 * 运行SQL,并防止SQL注入
 * @param {SQL模型} sql 
 * @param {参数} inserts (type:Array)
 */
async function query(sql, inserts) {
    var sqlPool = await pool()
    return new Promise((resolve, reject) => {
        sqlPool.getConnection((error, connect) => {
            if (error) reject(error)
            connect.query(mysql.format(sql, inserts), (err, res) => {
                if (err) reject(err)
                resolve(JSON.parse(JSON.stringify(res)))
            })
            connect.release()
        })
    })
}


module.exports = query