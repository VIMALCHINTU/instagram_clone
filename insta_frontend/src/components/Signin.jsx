import React, { useContext } from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Footer from '../comman/footer';
import { Auth } from '../Context/Auth';


const Signin = () => {
    const {signin}=useContext(Auth)
    function submit(e){
        e.preventDefault()
        const formdata=new FormData(e.target)
        const email=formdata.get("email")
        const password=formdata.get("password")
        const name=formdata.get("name")
        const username=formdata.get("username")
        console.log(email,password,name,username)
        signin(email,password,name,username)
    }
    return (
        <div className='w-full pt-1.5  flex flex-col justify-center items-center'>

        <div className='h-[550px]  w-[340px] text-white border flex flex-col  gap-4 p-9  border-gray-500 items-center'>
            <h1 className='font-bold text-4xl'>Instagram</h1>
            <h1 className=' text-xs flex flex-col items-center justify-center'>Sign up to see photos and videos <span>from your friends.</span></h1>
            <button className='bg-blue-600 p-1 w-[280px] rounded-md font-bold items-center justify-center flex gap-4'><span className='text-xl'><FaFacebookSquare/></span>Log in with Facebook</button>
            <div className='flex text-xs  text-gray-500  items-center gap-3'>
                <h1 className='border h-0 w-[135px] text-gray-500 border-gray-500'></h1>
                <h1>OR</h1>
                <h1 className='border h-0 w-[135px] border-gray-500'></h1>
            </div>
            <form onSubmit={submit}>
                <input type="text" name="email" className='bg-gray-800 w-[280px] p-1.5 text-gray-400 mb-1' placeholder="Mobile Number or Email"/>
                <input type="password" name="password" className='bg-gray-800 w-[280px] p-1.5 text-gray-400 mb-1' placeholder="Password"/>

                <input type="text" name="name" className='bg-gray-800 w-[280px] p-1.5 text-gray-400 mb-1' placeholder="Full Name"/>

                <input type="text" name="username" className='bg-gray-800 w-[280px] p-1.5 text-gray-400' placeholder="Username"/>
            <div className='flex flex-col items-center justify-center  w-[280px]'>
                 <h3 className='text-xs flex items-center pb-2 justify-center flex-col'>People who use our service may have upload <br/><span> your contact information to Instgram. <span className='text-blue-400'>Learn</span></span> <span className='text-blue-400'>More</span> </h3>
             
                <h3 className='text-xs flex flex-col items-center mb-2'><span>By signing up. you to our<span>Terms</span>,<span>Privacy</span> </span> <span><span>Policy</span>and <span>Cookes Policy</span>.</span></h3>
                <button className= 'text-bold bg-blue-600 rounded-md p-1.5  w-[280px]'>sign up</button>
            </div>
            </form>
        </div>
        <div className='mt-2 h-[80px] border items-center justify-center flex flex-col border-gray-500 w-[340px] text-white'>
           <h3>Have an account?</h3>
           <NavLink to="/"><h3 className='text-blue-400'>Log in</h3></NavLink>
        </div>
        <div className='mt-5'>
            <Footer/>
        </div>
        </div>
    );
}

export default Signin;
