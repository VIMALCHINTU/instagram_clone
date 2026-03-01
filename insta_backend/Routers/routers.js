const express=require("express");
const {Verify}=require("../middlewares/verifyauth")
const {Signin,Login}=require("../Controlers/auth")
const {Getallposts,Createpost,Togglelikes,Update,Delete} = require("../Controlers/post")
const {Comments,Updatecomment,getallcoments,Deletecomment, deleteallcomments}=require("../Controlers/comments");
const Parser = require("../utilities/utilities");

const userRouter=express.Router()
userRouter.post("/signin",Signin)
userRouter.post("/login",Login)

userRouter.get("/getallposts",Verify,Getallposts)
userRouter.post("/createpost",Verify,Createpost)
userRouter.post("/likecount/:postid",Verify,Togglelikes)
userRouter.patch("/update/:postid",Verify,Update)
userRouter.delete("/delete/:postid",Verify,Delete)
userRouter.post(
  "/upload",
  Verify,
  Parser.single("file"),
  (req, res) => {
   
    res.status(200).json({image_url:req.file.path});
  }
);



userRouter.post("/createcomment/:postid",Verify,Comments)
userRouter.patch("/updatecomment/:postid",Verify,Updatecomment)
userRouter.get("/getallcomments/:postId",Verify,getallcoments)
userRouter.delete("/deletecomment/:commentid",Verify,Deletecomment)
userRouter.delete("/deleteallcomments/:postid",deleteallcomments)



module.exports={userRouter}