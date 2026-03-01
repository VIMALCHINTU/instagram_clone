const express=require("express")
const app=express();
const mongoose=require("mongoose");
const { userRouter } = require("./Routers/routers");
require("dotenv").config()
const cors=require("cors")
app.use(express.json()) 
app.use(cors()) 

const MONGODB=process.env.MONGODB_URI

app.use("/",userRouter)
app.use("/post",userRouter)
app.use("/comment",userRouter)

app.listen(4000,()=>{
    console.log("index is hited")
})

mongoose.connect(MONGODB).then(()=>console.log("connted to db")).catch(()=>console.log("failed to conect to db"))