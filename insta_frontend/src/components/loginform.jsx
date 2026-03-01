import React from 'react';
import { useContext } from 'react';
import { FaFacebook } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import {Authprovider, Auth } from '../Context/Auth';



const Loginform = () => {
    const {login}=useContext(Auth)
    function submit(e){
        e.preventDefault()
        const formdata=new FormData(e.target)
        const email=formdata.get("email")
        const password=formdata.get("password")
        console.log(email,password)

        login(email,password)
    }
    return (
        <div className='text-white  flex items-center flex-col gap-2  '>
            <h1 style={{fontFamily:"cursive"}} className='text-4xl font-bold mb-10'>Instagram</h1>
        <form className='w-[250px]' onSubmit={submit}>
           <input className='bg-gray-800  p-1.5 mb-1 w-full rounded-sm' type='email' name="email" placeholder='user Name'/>
           <input className='bg-gray-800 p-1.5 mb-2 w-full rounded-sm' type='password' name="password" placeholder='password'/>
           <button className='bg-blue-800  p-1 w-full rounded-md'  >Log in</button>
        </form>
        <div className='flex gap-2 w-[250px] justify-center  items-center'>
            <div className='border border-gray-600 h-0 w-3/5 '></div>
            <h3 className='text-xs text-gray-300'>OR</h3>
            <div className='border border-gray-600 h-0 w-3/5 '></div>
        </div>
        <div className='flex flex-col mt-3 gap-3 justify-center items-center'>
            
            <h2 className='text-blue-400 flex  items-center justify-center gap-2'><span className="text-2xl">< FaFacebook /></span>Log in with Facebook</h2>
            <h1 className=''>Forgot Password?</h1>
            <h1 className='m-[40px]'>Don't have an account?<NavLink to="/signin"> <span className='text-blue-400'>Sign Up</span></NavLink></h1>
        </div>

        </div>
    );
}

export default Loginform;
