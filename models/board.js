var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/zard',{useMongooClient:true})

var boardSchema = new Schema({
    id:{
        type:Number,
        require:true
    },
    nickname:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    commentList:[{
        resName:String,
        resAvatar:String,
        resDate:Date,
        resContent:String
    }]
})

//发布模型
module.exports = mongoose.model('Board',boardSchema)