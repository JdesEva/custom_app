const response = require('../../../components/response')
const express = require('express')

const router = express.Router()

router.post('/process_post', function (req, res, next) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(res.send(response(200, true, null, '123')))
        }, 1000)
    })

})

module.exports = router