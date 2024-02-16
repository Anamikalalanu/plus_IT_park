const mongoose = require("mongoose")
itemSchema = mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    qty:{type:Number,required:true},
    price:{type:Number,required:true}
})
 module.exports=mongoose.model("Item",itemSchema)