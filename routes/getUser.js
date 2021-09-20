var express= require('express')
var User = require('../models/user')
var md5 = require('blueimp-md5')

var router = express.Router()

//登录请求
router.post('/login',function(req,res){
    //获取表单数据、查询数据库用户密码是否正确、响应数据
    var body = req.body
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
        req.session.user = user

        res.status(200).json({
            err_code:0,
            message:'登录成功'
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
                userName:body.username
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

        //对密码进行md5加密
        body.password = md5(md5(body.password))
        new User(body).save(function(err,user){
            if(err){
                return res.status(500).json({
                    err_code:500,
                    message:'Server error'
                })
            }

            //注册成功，使用Session记录用户的登录状态
            req.session.user = user

            //该方法接收一个对象作为参数，会自动把对象转为字符串再发送给浏览器
            res.status(200).json({
                err_code:0,
                message:'注册成功'
            })
        })
    })
})


//退出请求
router.get('/logout',function(req,res){
    //清除登录态
    req.session.user = null
    //返回退出登录的状态码
    res.status(200).json({
        err_code:0,
        message:'退出成功'
    })
})

module.exports = router