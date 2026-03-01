const mongoose=require("mongoose")
const postschema=mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    caption:{type:String,default:""},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    comment:[{type:String,ref:"Post"}],
    image_url:{type:String,required:true}
},{ timestamps: true })
const Post=mongoose.model("Post",postschema)
module.exports={Post} 