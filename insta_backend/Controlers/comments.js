const { Post } = require("../models/post")
const mongoose = require("mongoose");
const { Comment }= require("../models/comments")

const Comments=async (req,res)=>{
    const {text}=req.body
    
    const {postid}=req.params
  
    
    try{
        const findpost=await Post.findById(postid)
        if(!findpost){
            return res.status(401).json({message:"post is not avilable"})
        }
        if(!text){
            return res.status(403).json({message:"plz fill the all fildes"})
        }
        const postcomment=new Comment({author:req.user._id,text,post:findpost})
        await findpost.comment.push(text)
        await postcomment.save()
        findpost.Commentcount=findpost.Commentcount+1
        await findpost.save()
        return res.status(200).json({postcomment})

    }catch(err){
        return res.status(400).json({message:err.message})
    }
    

}

const getallcoments= async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({post:postId}).populate("author", "name email username")
    return res.status(200).json(comments);
  } catch (error) {
    console.error("Get comments error:", error);
    return res.status(500).json({ message: "Failed to fetch comments" });
  }
};

const Updatecomment=async (req,res)=>{
    const {text}=req.body
    const {user}=req.user._id
    const {commentid}=req.params
    try{
        const findcomment= await Comment.findById(commentid)
        if(!findcomment){
            return res.status(401).json({message:"comment is not founded"})
        }
       findcomment.text=text
       await findcomment.save()
       return res.status(400).json({findcomment})

    }catch(err){
        return res.status(400).json({message:err.message})
    }

}

const Deletecomment=async (req,res)=>{
    const {commentid}=req.params

    try{
        const post =await Post.findById({commentid})

        if(!commentid){
            return res.status(401).json({message:"comment is not founded"})
        }
        const findcomment=await Comment.findById(commentid)
        await findcomment.deleteOne()
        
        
        res.status(200).json({message:"deleted"})
    }catch(err){
        return res.status(400).json({message:err.message})
    }


}

const deleteallcomments=async (req,res)=>{
    const {postid}=req.params  
    const post=await Post.findById(postid)
    if(!post){
        return res.send("post is not available")
    }
    post.comment=[]
    await post.save()
    console.log(post.comment)
    res.send("all deletede")


}


module.exports={Comments,Updatecomment,Deletecomment,getallcoments,deleteallcomments}