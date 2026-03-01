import React from 'react';
import { CiHeart } from "react-icons/ci";

const Commentmodel = ({username,caption}) => {
    return (
            
        <div className='flex ' >
            <div className=''>

                 <img className=' w-[60px]  rounded-full h-[60px]' src="https://images.unsplash.com/photo-1558203728-00f45181dd84?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "/>
            </div>
            <div>
                <div className='flex mt-2 ml-5 gap-2'  >
                    <h3 className='font-bold' >{username}</h3>
                    <p>{caption}</p>
                </div>
                <div className='ml-5 flex gap-4 items-center text-gray-500 mt-1 ' >
                    <p className='flex items-center mt-1' >0s</p>
                    <p>Replay</p>
                    <p>See transelation</p>
                </div>
            </div>
                <div className='flex items-center absolute right-4 mt-5 ' >
                    <CiHeart/>
                </div>
        </div>
    );
}

export default Commentmodel;
