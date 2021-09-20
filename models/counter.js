var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/zard',{useMongooClient:true})

var counterSchema = new Schema({
    id:{
        type:Number,
        default:0
    },
    commentCounter:{
        type:Number,
        default:0
    },
    commentResCounter:{
        type:Number,
        default:0
    },
    articleCounter:{
        type:Number,
        default:0
    },
    articleCommentCounter:{
        type:Number,
        default:0
    }
})

//发布模型
module.exports = mongoose.model('Counter',counterSchema)