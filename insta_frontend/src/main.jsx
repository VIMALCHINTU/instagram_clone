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
import Reels from './components/reels.jsx'
import Search from './components/search.jsx'
import Message from './components/message.jsx'
import Dashbord from './components/dashbord.jsx'
Modal.setAppElement("#root");


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <Authprovider>
    <Routes>
      <Route element={<App/>}>
         <Route path='/' element={<Home/>}/>
         <Route path="/signin" element={<Signin/>} />
         <Route path="/reels" element={<Reels />}/>
         <Route path="/search"  element={<Search/>}/>
         <Route path="/homepage" element={<Homepage/>}/>
         <Route path='/dashbord' element={<Dashbord/>}  /> 
        <Route path="/message" element={<Message/>}/>
      </Route>
    </Routes>
    </Authprovider>
    </BrowserRouter>
  </StrictMode>,
)
