const { default: mongoose } = require("mongoose")
const {Post}=require("../models/post")
const {User}=require("../models/user_model")
  
const Createpost=async (req,res)=>{ 
    const {caption,image_url}=req.body
   
    if( !image_url){
        return res.status(400).json({message:"plz fill the all fileds"})
    }
    const post=Post({author:req.user._id,image_url,caption})
    const savepost=await post.save()
    const populatepost=await Post.findById(savepost._id).populate("author","username email name")
    console.log("ypur created the post")
    return res.send(populatepost)
}

const Getallposts=async (req,res)=>{
        const posts=await Post.find().sort({createdAt:-1}).populate("author","user email username")
        return res.send(posts)

}

const Togglelikes=async (req,res)=>{
    try{
        const userid=req.user._id
        const postuserr=await Post.findById(req.params.postid)
        const isliked=postuserr.likes.includes(userid)
        if(isliked){
            postuserr.likes=postuserr.likes.filter((user)=>user.toString()!=userid.toString())
           

        }else{
            postuserr.likes.push(userid)
          
        }
        await postuserr.save() 
        res.send(postuserr)
    }catch(err){
        res.send(err)
    }
}
const Update= async (req,res)=>{
    const {image_url,caption}=req.body
    const {postid}=req.params
    try{
        const post=await Post.findById(postid)
        console.log(post)
        if(!post){
            return res.status(400).json({message:"unauthorzied"})
        }
        if(req.user._id.toString()!=post.author.toString()){
            return res.status(400).json({message:"your una"})
        }
        console.log(req.user._id,post.author)
        
        if(image_url){
            post.image_url=image_url
        }
        if(caption){
            post.caption=caption
        }
        await post.save()
        res.status(200).json(post)
        
    }catch(err){
        res.status(400).json({message:err.message})
    }

}
const Delete=async (req,res)=>{
    try{
        const post=await Post.findById(req.params.postid)
        if(!post){
            return res.status(400).json({message:"post is not available"})
        }
        if(req.user._id.toString()!=post.author.toString()){
            return res.status(400).json({message:"your unauthorized"})
        }
        await post.deleteOne()
        res.status(200).json({message:"deleted suscssfully"})

    }catch(err){
        res.status(400).json({message:err.message})
    }
}

module.exports=({Createpost,Getallposts,Togglelikes,Update,Delete})