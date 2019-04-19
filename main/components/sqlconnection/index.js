/**
 * MySQL by jdes on 2019-03-14
 */

const mysql = require('mysql')
const sqlPool = require('./pool')

/**
 * 运行SQL,并防止SQL注入
 * @param {SQL模型} sql 
 * @param {参数} inserts (type:Array)
 */
async function query(sql, inserts) {
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