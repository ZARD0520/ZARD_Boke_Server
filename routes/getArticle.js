var express = require('express')
var articleList = require('../models/articleList')
var article = require('../models/article')
var counter = require('../models/counter')

var router = express.Router()

/**
 * 新建文章数据
 *//*
var id = 0
var list = new articleList({
    id,
    title:'关于博客的搭建以及介绍',
    introduce:'本博客是基于vue+node+mongodb搭建，其中node是采用了express框架，功能有待继续开发，bug有待解决，温馨提示:首次打开博客小站，尤其是相册、视频等页面，要等它慢慢加载，毕竟服务器带宽有限(1M)...',
})
var article = new article({
    id,
    content:`本博客小站的开发是基于vue+node+mongodb，是个人开发的第一个项目，所以写得很烂很烂...本项目中node采用了express框架，mongodb则是用了mongoose驱动库，说实话，这俩东西都没怎么学过，所以做后端的时候煎熬啊...不过最后懵着懵着还是鼓弄出来了.../
    项目的具体源码就放在我的github上了，有兴趣看屎山的可以移步到我的github上，github链接在本站的更多功能-联系方式上，后续项目的演示视频也会上传到我的b站，也欢迎来b站观看屎之项目。 至于为什么要开发这个博客呢，其实就是想通过做出来这个东西然后去找实习...其次就是想在服务器上放些喜欢的歌、喜欢的相片、学习笔记以及一些视频，这个项目其实还有一些功能没实现的，不过还是慢慢来把，有空就把搜索功能给补了，然后再弄个后台管理.../
    温馨提示：由于服务器带宽有限，建议第一次进站时，慢慢点慢慢按，让它慢慢加载，特别是相册和视频那边，毕竟带宽小，传输速率太慢了，所以我暂时也不敢放太多好看的图片和视频，还是得努力赚钱提升服务器带宽...
    `
})
//这就是回调地狱
list.save(function(err1,data){
    if(err1){
        console.log('1:'+err1)
    }else{
        article.save(function(err2,data){
            if(err2){
                console.log('2:'+err2)
            }else{
                counter.findOneAndUpdate({
                    id:0
                },{
                    $set:{
                        articleCounter:id+1
                    }
                },function(err3,ret){
                    if(err3){
                        console.log('3:'+err3)
                    }else{
                        console.log(ret)
                    }
                })
            }
        })
    }
})*/


/**
 * 处理首页列表请求
 */
 router.get('/articleList',function(req,res){
    articleList.find(function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'server error'
            })
        }else if(data==0){
            return res.status(200).json({
                err_code:1,
                message:'没有文章'
            })
        }
        return res.status(200).json({
            err_code:0,
            message:'show the 文章列表',
            data
        })
    })
})


/**
 * 处理具体文章请求
 */
router.get('/article/:id',function(req,res){
    var id = req.params.id
    article.find({id},function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'server error'
            })
        }else{
            var resData = data
            articleList.findOneAndUpdate({
                id
            },{
                $inc:{
                    viewCounter:1
                }
            },{},function(err,data){
                if(err){
                    return res.status(500).json({
                        success:false,
                        message:'server error'
                    })
                }
            })
            res.status(200).json({
                err_code:0,
                message:'ok,request article success',
                resData
            })
        }
    })
})

/**
 * 处理评论请求
 */
router.post('/articleComment',function(req,res){
    var {id,obj} = req.body
    //article更新评论列表
    article.findOneAndUpdate({
        id
    },{
        $push:{
            "commentList":obj
        }
    },{},function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'评论失败'
            })
        }else{
            //articleList更新评论数
            articleList.findOneAndUpdate({
                id
            },{
                $inc:{commentCounter:1}
            },{},function(err,data){
                if(err){
                    return res.status(500).json({
                        success:false,
                        message:'评论数更新失败'
                    })
                }else{
                    res.status(200).json({
                        err_code:0,
                        message:'评论成功'
                    })
                }
            })
        }
    })

})



/**
 * 处理点赞请求
 */
router.post('/zan',function(req,res){
    var {id,user} = req.body
    var obj = {}
    obj.user = user
    articleList.find({id},function(err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'server error'
            })
        }else if(data){
            var person = data[0].zanCounter
            var result = person.find(item=>item.user === user)
            if(result){
                return res.status(200).json({
                    err_code:1,
                    message:'已经点赞过该文章了'
                })
            }else{
                articleList.findOneAndUpdate({
                    id
                },{
                    $push:{
                        "zanCounter":obj
                    }
                },{},function(err3,ret){
                    if(err3){
                        console.log('3:'+err3)
                    }else{
                        res.status(200).json({
                            err_code:0,
                            message:'点赞成功',
                            ret
                        })
                    }
                })
            }
        }
    })
})

 module.exports = router