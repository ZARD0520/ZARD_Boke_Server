var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/zard',{useMongooClient:true})

var articleListSchema = new Schema({
    id:{
        type:Number,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    introduce:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true,
        default:Date.now
    },
    author:{
        type:String,
        require:true,
        default:'清泉'
    },
    zanCounter:[
        {
            user:String
        }
    ],
    viewCounter:{
        type:Number,
        default:0
    },
    commentCounter:{
        type:Number,
        default:0
    }
})

//发布模型
module.exports = mongoose.model('ArticleList',articleListSchema)