var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/zard',{useMongooClient:true})

var articleSchema = new Schema({
    id:{
        type:Number,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    commentList:[
        {
            nickname:String,
            avatar:String,
            date:Date,
            comment:String
        }
    ]

})

//发布模型
module.exports = mongoose.model('Article',articleSchema)