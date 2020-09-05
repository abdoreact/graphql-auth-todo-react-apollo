const {model, Schema} = require("mongoose")
const validator=require("validator")
const {hash} = require("argon2")
const userSchema=new Schema({
    email:{
        type:String,
        unique:true,
        validate:[validator.isEmail, "Error. Invalid Email."]
    },
    password:{
        type:String,
        minlength:[8, "Error. Password too short."]
    }
})
userSchema.pre("save", async function(next){
    this.password=await hash(this.password)
    next()
})
module.exports=model("User", userSchema)