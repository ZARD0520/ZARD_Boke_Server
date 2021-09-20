var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/zard',{useMongooClient:true})

var userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true,
        default:'无名氏'
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'http://47.112.128.68/server/public/staticImg/zard002.jpg'
    },
    personal:{
        type:String,
        default:'一只憨憨'
    },
    createTime:{
        type:Date,
        default:Date.now
    },
    status:{
        type:Number,
        enum:[0,1,2],
        default:0
    }

})

//发布模型
module.exports = mongoose.model('User',userSchema)