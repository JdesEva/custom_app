/**
 * 将传入的数据转化为数组前后对应的结构 { id: guid(), path: '', name: '新建节点', create_time: new Date() }
 */

module.exports = function (obj, mode = true) {
    var result = []
    if (mode) {
        for (var key in obj) {
            result.push(key)
            result.push(obj[key])
        }
    } else {
        var key = Object.keys(obj)
        var val = Object.values(obj)
        result = [...key, ...val]
    }
    return result
}