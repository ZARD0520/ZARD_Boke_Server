var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/zard',{useMongooClient:true})

var videoSchema = new Schema({
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
    imgUrl:{
        type:String,
        require:true
    },
    videoUrl:{
        type:String,
        require:true
    }
})

//发布模型
module.exports = mongoose.model('Video',videoSchema)