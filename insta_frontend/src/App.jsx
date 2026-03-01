import React from 'react';
import { Outlet } from 'react-router-dom';
import Modal from "react-modal";

Modal.setAppElement("#root");


const App = () => {
  return (
    <div className='h-screen sticky bg-[#0B1013] '>
      
      
      <Outlet/>
      
    </div>
  );
}

export default App;
