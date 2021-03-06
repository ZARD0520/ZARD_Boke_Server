var express = require('express')
var md5 = require('blueimp-md5')
var User = require('../models/user')
var settoken = require('../token/token_vertify')

var router = express.Router()

//登录请求
router.post('/login',function(req,res){
    //获取表单数据、查询数据库用户密码是否正确、响应数据
    var body = req.body
    console.log(body)
    User.findOne({
        username:body.username,
        password:md5(md5(body.password))
    },function(err,user){
        if(err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
        //如果不存在该用户
        if(!user){
            return res.status(200).json({
                err_code:1,
                message:'用户或密码不存在'
            })
        }
        //如果用户存在，则成功登录，记录一个登录态
        settoken.setToken(user.username,user.password).then((data)=>{
            var username = user.username
            return res.status(200).json({
                err_code:0,
                message:'登录成功',
                username,
                token:data
            })
        })
    })
})

//注册请求
router.post('/register',function(req,res){
    //获取表单提交的数据、操作数据库、判断用户是否存在、响应
    var body = req.body
    User.findOne({
        $or:[
            {
                email:body.email
            },{
                username:body.username
            }
        ]
    },function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'Server error'
            })
        }
        if(data){
            return res.status(200).json({
                err_code:1,
                message:'用户名或邮箱已经存在'
            })
        }
        //生成随机数
        var random = Math.round(Math.random()*99+1)
        //对密码进行md5加密
        body.password = md5(md5(body.password))
        body.nickname = '无名氏'+random
        new User(body).save(function(err,user){
            if(err){
                return res.status(500).json({
                    err_code:500,
                    message:'Server error'
                })
            }

            //该方法接收一个对象作为参数，会自动把对象转为字符串再发送给浏览器
            res.status(200).json({
                err_code:0,
                message:'注册成功'
            })
        })
    })
})

//个人信息请求
router.get('/profile',function(req,res){
    var username = req.query.user
    User.findOne({
        username
    },function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'Server error'
            })
        }
        if(!data){
            return res.status(200).json({
                err_code:1,
                message:'没有该用户'
            })
        }
        return res.status(200).json({
            err_code:0,
            data
        })
    })
})

//个人信息修改
router.get('/update',function(req,res){
    console.log(req.query)
    var username = req.query.user
    var newNickname = req.query.newNickname
    var personal = req.query.personal

    User.findOneAndUpdate({
        username
    },{
        $set:{
            nickname:newNickname,
            personal
        }
    },{},function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'server error'
            })
        }else if(!data){
            return res.status(200).json({
                err_code:1,
                message:'未找到相关信息'
            })
        }
        return res.status(200).json({
            err_code:0,
            message:'更新成功',
            data
        })
    })
})



module.exports = router