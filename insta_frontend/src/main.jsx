import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './components/Signin.jsx'
import Homepage from './components/homepage.jsx'
import { Authprovider } from './Context/Auth.jsx'
import Modal from "react-modal"


Modal.setAppElement("#root");


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <Authprovider>
    <Routes>
      <Route element={<App/>}>
         <Route path='/' element={<Home/>}/>
         <Route path="/signin" element={<Signin/>} />
         <Route path="/homepage" element={<Homepage/>}/>
         
      </Route>
    </Routes>
    </Authprovider>
    </BrowserRouter>
  </StrictMode>,
)
