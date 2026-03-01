import { createContext } from "react"
import { Navigate, useNavigate } from "react-router-dom";


import { useState } from "react";
const Auth=createContext()
const BASE_URL = "http://127.0.0.1:4000";
const ls_key="user"

const Authprovider= ({children})=>{
    const[user,setuser]=useState(JSON.parse(localStorage.getItem(ls_key))|| null)
    const navigate=useNavigate()

    async function login(email,password){
       
        try{ 
            const res=await fetch(`${BASE_URL}/login`,
                {
                    method:"POST",
                    headers:{"content-type":"application/json"},
                    body:JSON.stringify({email,password})
                })
                const data=await res.json()
                if(!res.ok){
                    throw new Error(data.message|| "login failed")
                }
                console.log(data)
                localStorage.setItem(ls_key,JSON.stringify(data))
                setuser(data)
                navigate("/homepage");
        }catch(err){
           console.log(err.message)
        }
    
    }
    async function signin(email,password,name,username) {
        try{
            const res=await fetch(`${BASE_URL}/signin`,
                {
                    method:"POST",
                    headers:{"content-type":"application/json"},
                    body:JSON.stringify({email,password,name,username})

                })
                const data=await res.json()
                if(!res.ok){
                    
                    throw new Error(data.message ||"signin failed")
                    
                }
                localStorage.setItem(ls_key,JSON.stringify(data))
                setuser(data)
                navigate("/homepage")

        }catch(err){
           console.log(err.message)
        }
    
        
        
    }
    
    
    async function logout() {
        localStorage.clear(ls_key)
        setuser(null)   
        navigate("/")
    }
    return (
        <Auth.Provider value={{login,signin,logout,user}}>
            {children}
        </Auth.Provider>
    )
}
export { Authprovider,Auth}