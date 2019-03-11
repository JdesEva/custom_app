/** http响应体  */

function response(code, data, msg) {
    const res = {
        code: code,
        status: code === 200 ? 'OK' : 'EROOR',
        success: code === 200,
        data: data,
        msg: msg
    }
    return JSON.stringify(res)
}

module.exports = response