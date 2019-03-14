const response = require('../../../components/response')
const express = require('express')

const router = express.Router()

router.post('/process_post2', function (req, res, next) {
    return new Promise(resolve => {
        resolve(res.send(response(200, true, null, '456')))
    })
})

module.exports = router