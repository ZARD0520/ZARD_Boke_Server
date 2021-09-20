const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const Photo = require('../models/photo')

/*
    初始化图片数据
*//*
var files = fs.readdirSync(path.join(__dirname,'../public/img'))
files.forEach((item,index)=>{
    let photo = []
    let photoStart = ''

    new Promise(function(resolve,reject){
        fs.stat(path.join(__dirname,'../public/img/'+item),(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    }).then(function(data){
        if(data.isDirectory()){
            var photoLister = fs.readdirSync(path.join(__dirname,'../public/img/'+item))
            photoLister.forEach((item2,index)=>{
                photo.push('http://localhost:3000/public/img/'+item+'/'+item2)
                if(index===0){
                    photoStart = ('http://localhost:3000/public/img/'+item+'/'+item2)
                }
            })

            //数据库存储
            var photoList = new Photo({
                id:index+1,
                photoName:item,
                photoList:photo,
                photoStart:photoStart
            })
            
            photoList.save(function(err,data){
                if(err){
                    console.log('save error')
                    console.log(err)
                    console.log(photoList)
                }else{
                    console.log(data)
                }
            })
        }else{
            console.log('error')
        }
    }).catch(function(err){
        console.log(err)
    })
    
})*/


router.get('/photo',function(req,res){
    //处理图片资源
    Photo.find(function(err,data){
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