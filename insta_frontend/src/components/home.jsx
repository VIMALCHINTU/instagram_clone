import React from 'react';
import instagram from "../assets/instagram.jpeg"
import Loginform from './loginform';
import Footer from '../comman/footer';
import Modal from "react-modal";

Modal.setAppElement("#root");

const Home = () => {
    
    return (
        <div className='h-screen'>
            <div className='flex pt-[100px]'>
                <div className='w-1/2  flex  justify-end' ><img className=' h-[420px] ' src={instagram}/></div>
                <div className='ml-[170px]'><Loginform/></div>
            </div>
            <div className='mt-[80px]'> 
                    <Footer/>
            </div>
            
        </div>
    );
}

export default Home;
