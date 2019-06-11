/**
 * guid by jdes on 2019-04-19
 */

module.exports = function() {
  return 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
