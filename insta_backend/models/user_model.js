
const mongoose=require("mongoose")
const userschema=mongoose.Schema({
    name:{type:String,required:true},
    hashpassword:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true}
})
const User=new mongoose.model("User",userschema);
module.exports={User}