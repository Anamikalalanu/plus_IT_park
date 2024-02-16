const mongoose = require("mongoose")
userSchema = mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phonenumber:{type:Number,required:true}
})
 module.exports=mongoose.model("User",userSchema)