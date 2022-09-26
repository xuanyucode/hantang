// 企业文化
const express = require('express')
// 引入连接池模块
const pool = require('../pool')
const router = express.Router()

router.get('/:cid',(req,res,next)=>{
    var obj = req.params
    pool.query('select * from ht_culture where cid=?',[obj.cid],(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'查询成功',data: r})
    })
})


module.exports = router