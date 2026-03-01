const {User} =require("../models/user_model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const usertoken=(userid)=>{
    return jwt.sign({sub:userid},process.env.JWT_SECERET,{expiresIn:"7d"})
    
}

const Signin=async (req,res)=>{
    const {email,password,name,username}=req.body
    if(!email || !password || !name || !username){
        return res.status(400).json({message:"plz fill all files"})
    }
    const existuser=await User.findOne({email})
    if(existuser){
        return res.status(400).json({message:"user  is exist for this email"})
    }
    const hashpassword=await bcrypt.hash(password,10)
    const newuser=User({email,hashpassword,username,name})
    const saveuser=await newuser.save() 
    const token=usertoken(saveuser._id) 
    const userobj=saveuser.toObject()
    delete userobj.hashpassword
    console.log("hi vimal youre singed in")
    return res.send({token,...userobj})
}


const Login=async (req,res)=>{  
 
    const {email,password}=req.body
    if(!email|| !password){
        return res.status(400).json({message:"plz fill the all detailes"})
    }
    try{

        const userexist=await User.findOne({email})
        if(!userexist){
            return res.status(400).json({message:"with this email user is not existed"})
        }
        console.log("REQ BODY:", req.body);
        console.log(userexist)
        const hashpassord=await bcrypt.compare(password,userexist.hashpassword)
        if(!hashpassord){
            return res.status(400).json({message:"password is not correct"})
        }
        const token=usertoken(userexist._id)
    
    
        console.log("hii vimal your loged in")
        return res.send({token,...userexist})
    }catch(err){
        res.send(err)
    }
}



module.exports={Login,Signin}