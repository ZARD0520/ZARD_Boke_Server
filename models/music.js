var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/zard',{useMongooClient:true})

var musicSchema = new Schema({
    id:{
        type:Number,
        require:true
    },
    musicUrl:{
        type:String,
        require:true
    },
    imgUrl:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    singer:{
        type:String,
        require:true
    }
})


//发布模型
module.exports = mongoose.model('Music',musicSchema)