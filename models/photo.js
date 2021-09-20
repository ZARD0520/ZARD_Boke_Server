var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/zard',{useMongooClient:true})

var photoSchema = new Schema({
    id:{
        type:Number,
        require:true
    },
    photoName:{
        type:String,
        require:true
    },
    photoStart:{
        type:String,
        require:true
    },
    photoList:{
        type:Array,
        require:true
    }
})

//发布模型
module.exports = mongoose.model('Photo',photoSchema)