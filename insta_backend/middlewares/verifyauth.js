const jwt=require("jsonwebtoken")

const {User}=require("../models/user_model")

const Verify=async (req,res,next)=>{
    const header=req.headers.authorization
    if(!header){
        return res.status(403).json({message:"your unauthorized"})
    }
    const [bearer,token]=header.split(" ")
    if(bearer!="Bearer" || !token){
        return res.status(403).json({message:"token is not there"})
    }
    try{
        const decodetoken=jwt.verify(token,process.env.JWT_SECERET)
        console.log(decodetoken)
        const user= await User.findById(decodetoken.sub)
        if(!user){ 
            return res.status(403).json({message:"invailed token"})
        }
        const userobj=user.toObject()
        delete userobj.hashpassword
        console.log("hii vimal kumar your verified")
        req.user=userobj
        console.log(userobj)
        next()
    }catch(err){
        res.send(400).json(err.message)
    }
}
module.exports={Verify}