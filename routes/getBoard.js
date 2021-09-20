var express = require('express')
var Board = require('../models/board')
var Counter = require('../models/counter')

var router = express.Router()

//留言展示请求
router.get('/comment',function(req,res){
    Board.find(function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'server error'
            })
        }else if(data==0){
            return res.status(200).json({
                err_code:1,
                message:'没有留言'
            })
        }
        return res.status(200).json({
            err_code:0,
            message:'show the 留言',
            data
        })
    })

})

//留言请求
router.post('/leave',function(req,res){
    var body = req.body
    var id = req.body.id+1
    new Board(body).save(function(err,info){
        if(err){
            return res.status(500).json({
                success:false,
                message:'server error'
            })
        }else{
            //更新留言数
            Counter.findOneAndUpdate({
                id:0
            },{
                $set:{
                    commentCounter:id
                }
            },function(err,ret){
                if(err){
                    return ret.status(500).json({
                        success:false,
                        message:'server error'
                    })
                }
                res.status(200).json({
                    err_code:0,
                    message:'留言成功',
                    info
                })
            })
        }
    })
})

//回复请求
router.post('/pinglun',function(req,res){
    var {id,obj} = req.body
    Board.findOneAndUpdate({
        id
    },{
        $push:{
            "commentList":obj
        }
    },{},function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'server error'
            })
        }else{
            res.status(200).json({
                err_code:0,
                message:'回复成功',
                data
            })
        }
    })
})

//获取留言数作为id
router.get('/commentId',function(req,res){
    
    Counter.find(function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:err
            })
        }else{
            res.status(200).json({
                err_code:0,
                message:'获取成功',
                data:data[0].commentCounter
            })
        }
    })
    /* 初始化counter表*//*
    new Counter().save(function(err,info){
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })*/
})




module.exports = router