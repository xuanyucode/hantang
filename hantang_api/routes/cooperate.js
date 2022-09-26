// 合作交流
const express = require('express')
// 引入连接池模块
const pool = require('../pool')
const router = express.Router()

router.post('/add',(req,res,next)=>{
    var obj = req.body
    pool.query('insert into ht_cooperate set ?',[obj],(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'添加成功'})
    })
})

module.exports = router