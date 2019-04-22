/**
 * tree by jdes on 2019-04-19
 */

module.exports = {
    /**
     * List -> Tree
     * @param {原始List结构数据} data 
     * @param {父节点Id字段(SQL字段)} perKey 
     */
    __ToTree: function (data, perKey) {
        var map = {}
        /**
         * 预处理,生成一个以id为主键的map便于后续查找
         */
        data.forEach(item => {
            map[item.id] = item
        })

        /**
         * 生成tree结构
         */

        var result = []

        data.forEach(row => {
            var parent = map[row[perKey]] //查找当前数据的pid,即父元素在不在，如果在证明他是子集，扔进该元素的children中即可，否则扔进顶级
            if (parent) {
                (parent.children || (parent.children = [])).push(row)
            } else {
                result.push(row)
            }
        })
        return result
    },
    __ToList: function (data) {

    }
}