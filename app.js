const bodyParser = require('body-parser')
var express = require('express')
var session = require('express-session')
var path = require('path')

//引入token相关
var vertoken = require('./token/token_vertify')
var expressJwt = require('express-jwt')

//引入处理跨域中间件
var cors = require('cors')

//各路由加载
const musicRouter = require('./routes/getMusic')
const photoRouter = require('./routes/getPhoto')
const videoRouter = require('./routes/getVideo')
const userRouter = require('./routes/getUserWithToken')
const boardRouter = require('./routes/getBoard')
const articleRouter = require('./routes/getArticle')

var app = express()

//处理跨域
app.use(cors())

//开放静态资源目录
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules/')))

//配置解析表单Post请求体插件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//配置session
/*
app.use(session({
    secret:'wezard',
    resave:false,
    saveUninitialized:true
}))*/


//解析token
app.use(function(req,res,next){
    var token = req.headers['authorization']
    if(token == undefined){
        return next()
    }else{
        vertoken.verToken(token).then(data=>{
            req.data = data
            return next()
        }).catch(error=>{
            return res.status(200).json({
                err_code:2,
                message:'发生错误'
            })
        })
    }
})

//验证token是否过期并规定哪些路由不用验证
/*
app.use(expressJwt({
    secret:'wezard_hgazx',
    algorithms:['HS256']
}).unless({
    path:[/^\/music/,/^\/photo/,/^\/video/,/^\/comment/,/^\/login/,/^\/register/]
}))*/


//挂载路由
app.use(musicRouter)
app.use(photoRouter)
app.use(videoRouter)
app.use(userRouter)
app.use(boardRouter)
app.use(articleRouter)


//用户信息、留言板回复等要验证token才能决定能否使用

//配置处理404中间件
app.use(function(err,req,res,next){/*
    if(err.status == 401){
        return res.status(401).send('token失效')
    }*/
    res.send('404')
})

app.listen(3024,function(){
    console.log('server running...');
})






