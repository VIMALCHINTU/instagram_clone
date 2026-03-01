import axios from "axios"

const user=JSON.parse(localStorage.getItem("user"))
function getToken(){
    return user?.token

}

export  const api=axios.create({
    baseURL:"http://127.0.0.1:4000",
    timeout:1000

})
api.interceptors.request.use(
    (config)=>{
        const token=getToken()
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },(error)=>Promise.reject(error)
    )
api.interceptors.response.use((response)=>response.data)
