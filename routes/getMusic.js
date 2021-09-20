const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const Music = require('../models/music')

//处理文件名
var files = fs.readdirSync(path.join(__dirname,'../public/music'))
//var musicNameList = []
//var musicUrlList = []
//var idList = []
/*
files.forEach((item,index)=>{
    //musicNameList.push(item.slice(0,-4))
    //idList.push(index+1)
    //musicUrlList.push('local:3000/public/music/'+item)

    var musicList = new Music({
        id:index+1,
        musicUrl:'http://localhost:3000/public/music/'+item.trim(),
        imgUrl:'http://localhost:3000/public/img/ZARD1991/1.jpg',
        name:item.slice(0,-4),
        singer:'zard'
    })

    musicList.save(function(err,data){
        if(err){
            console.log('save error')
        }else{
            console.log(data)
        }
    })

})

//增加音乐数据
/*
musicList.save(function(err,data){
    if(err){
        console.log('save error')
    }else{
        console.log(data)
    }
})*/



router.get('/music/:id',function(req,res){
    var id = req.params.id
    //处理音乐资源
    Music.find({id},function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'server error'
            })
        }else{
            res.status(200).json({
                err_code:0,
                message:'ok',
                data
            })
        }
    })
})

module.exports = router