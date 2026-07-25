const express=require("express")
const app=express();
const mongoose=require("mongoose");
const { userRouter } = require("./Routers/routers");
require("dotenv").config()
const cors=require("cors")
app.use(express.json()) 

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://instagram-clone-three-dun.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

const MONGODB=process.env.MONGODB_URI
const PORT =  4000;

app.use("/",userRouter)
app.use("/post",userRouter)
app.use("/comment",userRouter)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




mongoose.connect(MONGODB).then(()=>console.log("connted to db")).catch(()=>console.log("failed to conect to db"))