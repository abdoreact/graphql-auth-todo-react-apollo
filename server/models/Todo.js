const {Schema, model} = require("mongoose")
const todoSchema=new Schema({
    user:{
        type:String
    },
    body:{
        type:String
    }
})
module.exports=model('Todos', todoSchema)