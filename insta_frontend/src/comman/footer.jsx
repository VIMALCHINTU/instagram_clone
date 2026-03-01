import React from 'react';
import { AiOutlineCopyright } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

const Footer = () => {
    return (
        <div className='flex flex-col gap-3'>
        <div className='text-gray-400 flex  gap-4 items-center justify-center'>
            <h3>Meta</h3>
            <h3>About</h3>
            <h3>Blog</h3>
            <h3>Jobs</h3>
            <h3>Help</h3>
             <h3>Api</h3>
            <h3>Privacy</h3>
            <h3>Terms</h3>
            <h3>Locations</h3>
            <h3>Instagram Lite</h3>
             <h3>Meta Ai</h3>
            <h3>Threads</h3>
            <h3>Contact Uploading & Non-Users</h3>
            <h3>Meta Verified</h3>
            <h3></h3>
        </div>
            <div className='text-gray-400 flex gap-4 items-center justify-center'>
                <h3 className='flex items-center gap-1'>English<IoIosArrowDown/></h3>
                <h3 className='flex items-center gap-1'><AiOutlineCopyright />Instagram from Meta</h3>
            </div>
        </div>
    );
}

export default Footer;
