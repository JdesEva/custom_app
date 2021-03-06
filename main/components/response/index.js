/**
 * response by jdes on 2019-03-13
 */

function response(code, success, data, msg) {
    const res = {
        code: code,
        status: code === 200 ? 'OK' : 'EROOR',
        success: success,
        data: data,
        msg: msg
    }
    return JSON.stringify(res)
}

module.exports = response