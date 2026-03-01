import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { LuSquarePlay } from "react-icons/lu";
import { RiTelegram2Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { TbAlignBoxBottomRight } from "react-icons/tb";
import { AiOutlineMenu } from "react-icons/ai";
import { FaMeta } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import { Auth,Authprovider } from "../Context/Auth";
import Postupperpart from "../comman/Postupperpart";
import Postmiddlepart from "../comman/postmiddlepart";
import Postlowerpart from "../comman/Postlowerpart";
import Status from "../comman/status";
import Creatpostmodal from "../components/creatpostmodal"
import Modal from "react-modal";
import {api} from "../../client/api";
import { RightNav } from "./Rightnav";

Modal.setAppElement("#root");



const Homepage = () => {
    const {user,logout}=useContext(Auth)
    const BASE_URL = "http://127.0.0.1:4000";
    const [posts,userposts]=useState([])
    const [open,setopen]=useState(false)

    useEffect(()=>{

        async function postsload() {
            
             const res = await fetch(`${BASE_URL}/post/getallposts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
               
            });
            const data =await res.json()
             userposts(data)

            
        }
        postsload()

    },[open,posts])
   
    
    return (
        <div className="text-white flex  gap-[200px] ">
            
        
                <div className="w-[260px] h-screen border-r border-gray-700 sticky top-0 flex-shrink-0">

                <div className="ml-4  flex flex-col gap-8">

                    <div className="text-3xl  mt-10" style={{fontFamily:"cursive"}}>instgram</div>
                    <div className="flex gap-3 items-center"><span className="text-2xl" ><GoHomeFill /></span>Home</div>
                    <div className="flex gap-3 items-center"><span className="text-2xl"><IoSearch /></span>Search</div>
                    <div className="flex gap-3 items-center"><span className="text-2xl"><MdExplore/></span>Explor</div>
                    <div className="flex gap-3 items-center"><span className="text-2xl"><LuSquarePlay/></span>Reels</div>
                    <div className="flex gap-3 items-center"><span className="text-2xl"><RiTelegram2Line/></span>Messages</div>
                    <div className="flex gap-3 items-center"><span className="text-2xl"><FaRegHeart/></span>Notification</div>
                    <div className="w-[90px]"  onClick={()=>setopen(true)}>
                        <div className="flex gap-3 cursor-pointer  items-center"><span className="text-2xl"  ><FaPlus/></span >Create</div>
                    </div>
                    <div className="flex gap-3 items-center"><span className="text-2xl"><TbAlignBoxBottomRight/></span>Dashbord</div>
                    <div className="flex gap-3 items-center"><span className="text-2xl"><CgProfile/></span>Profile</div>
                    <div className="flex gap-3 items-center"><span className="text-2xl"><AiOutlineMenu/></span>More</div>
                    <button onClick={logout} className="flex gap-3 items-center"><span className="text-2xl"><FaMeta/></span  >Logout</button>
                 </div>
                 <Creatpostmodal open={open} setopen={setopen} />
             </div>

            
             <div className="flex-1 max-w-[500px] h-screen overflow-y-auto hide-scrollbar">


                <div className="mt-4 h-[100px]  flex overflow-x-auto hide-scrollbar scroll-smooth ">
                    <Status/>
                </div>
                     <div className="m-4 gap-9 flex flex-col items-center justify-center" >
                      

                        {
                            posts.map((post)=>(
                                <div key={post._id}>

                                    <Postupperpart  username={post.author.username}/>
                                    <div className="flex mt-2 " ><Postmiddlepart image={post.image_url}/></div>
                                    <Postlowerpart likescount={post.likes} post={post} postid={post._id} comment={post}   />
                                    <h1 className="ml-2">{post.caption}</h1>
                                </div>
                            ))
                          
                        }
                       

                    </div>
             </div>
<div className="w-[340px]  h-screen border border-gray-700 sticky top-0 flex-shrink-0">
                        <RightNav/>
</div>

        </div>
    );
}

export default Homepage;
