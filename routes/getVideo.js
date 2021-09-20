const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const Video = require('../models/video')

/*
    初始化数据
*//*
var files = fs.readdirSync(path.join(__dirname,'../public/video'))
files.forEach((item,index)=>{
    var videoList = new Video({
        id:index+1,
        title:item,
        introduce:'这是视频简介，这是视频简介，这是视频简介',
        imgUrl:'http://localhost:3000/public/img/ZARD1994/1.jpg',
        videoUrl:'http://localhost:3000/public/video/'+item
    })
    
    videoList.save(function(err,data){
        if(err){
            console.log('save error')
            console.log(videoList)
        }else{
            console.log(data)
        }
    })
})*/

router.get('/video',function(req,res){
    var id = req.params.id
    //处理视频资源
    Video.find(function(err,data){
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