/**
 * logs by jdes on 2019-03-13
 */


const fs = require('fs')
const FileStreamRotator = require('file-stream-rotator')
const path = require('path')

var dir = __dirname.split('main')[0]

var logDirectory = path.join(dir, 'logs')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'debug-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})

module.exports = {
    stream: accessLogStream
}