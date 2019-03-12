const response = require('../../../components/response')
const express = require('express')

const router = express.Router()

router.post('/process_post',function(req,res,next){
    res.send(response(200,true,null,'123'))
})

module.exports = router