// 新闻中心
const express = require('express')
// 引入连接池模块
const pool = require('../pool')
const router = express.Router()
// 新闻分类
router.get('/catlist',(req,res,next)=>{
    pool.query('select * from ht_cat',(err,r)=>{
        if(err) {
            return next(err)
        }
        res.send({code:200,msg:'新闻分类',data: r})
    })
})
// 新闻列表
router.get('/list',(req,res,next)=>{
    var obj = req.query
    if(!obj.pno) {
        obj.pno = 1
    }
    if(!obj.count) {
        obj.count = 10
    }
    var start = (obj.pno-1)*obj.count
    var size = parseInt(obj.count)
    pool.query('select * from ht_news where cat_id=? order by nid desc limit ?,?;select count(*) as total from ht_news',[obj.cat_id,start,size],(err,r)=>{
        if(err) {
            return next(err)
        }
        console.log(r)
        res.send({code:200,msg:'新闻列表',data: r[0], total: r[1][0].total, pno: obj.pno, pages: Math.floor(r[1][0].total/obj.count)})
    })
})
// 新闻详情
router.get('/detail/:nid',(req,res,next)=>{
    var obj = req.params
    pool.query('select * from ht_news where nid=?',[obj.nid],(err,r)=>{
        if(err) {
            return next(err)
        }
        if(r.length === 0){
            res.send({code:400,msg:'新闻不存在'})
        }else{
            res.send({code:200,msg:'新闻详情',data: r})
        }
    })
})


module.exports = router