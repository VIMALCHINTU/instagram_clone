import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { IoBookmarkOutline } from "react-icons/io5";
import { Auth } from '../Context/Auth';
import { useContext } from 'react';
import { useState,useEffect } from 'react';
import Creatcommentmodal from '../components/createcommentmodel';

const Postlowerpart = ({likescount=[],post,postid,comment=[]}) => {
    const BASE_URL = "http://127.0.0.1:4000";
    const {user}=useContext(Auth)
    const [open,setopen]=useState(false)
    
    
   const [likess,setlikess]=useState(likescount.length)
    async function like(id){
       
        const res=await fetch(`${BASE_URL}/post/likecount/${id}`,{
            method:"POST",
            headers: {
                       
                        Authorization: `Bearer ${user.token}`
                    }
        })
       const savedposts=await res.json()
       setlikess(savedposts.likes.length)   
    }
    return (
        <div className='flex justify-between mt-2 mr-6 items-center '>
        <div className='flex  items-center gap-4 text-xl mt-2 ml-2'>       
            <div className='flex gap-1 cursor-pointer items-center' >
                <FaRegHeart onClick={()=>like(postid)} />
               <h1 className="text-sm">{likess}</h1>

            </div>
            <div className='flex items-center gap-1 cursor-pointer '>
                <FaRegComment onClick={()=>setopen(true)} />
                <span className='text-sm'>{post.comment.length}</span>
            </div>
            <PiTelegramLogoDuotone/>
        </div>
        <div className='text-2xl  '>
            
            <IoBookmarkOutline/>
    
        </div>
       {open && <Creatcommentmodal  open={open} setopen={setopen} post={post} comment={comment} /> } 
        </div>
    );
}

export default Postlowerpart;
