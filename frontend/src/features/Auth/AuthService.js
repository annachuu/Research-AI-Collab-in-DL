import axios from 'axios'
import { API_URL } from "../../config/env";

const API = API_URL + 'auth/';

//@desc User Register
//@route GET /API_URL/auth/
const userRegister = async (userData) => {
    const response = await axios.post(API + "register/", userData)  
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    } 
    return response.data
}


//@desc User Login
//@route POST /API_URL/login
const userLogin = async (userData) => {
    const response = await axios.post(API + "login/", userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//@desc User Logout
const userLogout = () =>{
    localStorage.removeItem('user')
}


const authService = {
    userLogin,
    userRegister,
    userLogout
}

export default authService;