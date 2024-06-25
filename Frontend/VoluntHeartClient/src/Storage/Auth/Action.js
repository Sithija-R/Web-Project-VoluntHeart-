import axios from "axios"
import { API_BASE_URL, api } from "../../config/APIconfig"
import { FIND_USER_BY_NAME_FAILURE, FIND_USER_BY_NAME_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_SUCCESS, GET_USER_FAILURE, GET_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "./ActionsType"
import Swal from 'sweetalert2'


const successAlert = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

//signup donor
export const donorRegister =(registerData)=>async(dispatch)=>{
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup/donor`,registerData);

        successAlert.fire({
            icon: "success",
            title: "Signed up successfully"
          });
          
        
       
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
        }
        dispatch({type:REGISTER_USER_SUCCESS,payload:data})
        
    } catch (error) {
        console.log("error",error);
        dispatch({type:REGISTER_USER_FAILURE,payload:error.response.data.message})
        Swal.fire({
            title: "Signup failed!",
            text: error.response.data.message,
            icon: "error"
          });
        
    }
}

//signup fundraiser
export const fundRegister =(registerData)=>async(dispatch)=>{
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup/fundraiser`,registerData);

        successAlert.fire({
            icon: "success",
            title: "Signed up successfully"
          });
          
        
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
        }
        dispatch({type:REGISTER_USER_SUCCESS,payload:data})
        
    } catch (error) {
        console.log("error",error);
        dispatch({type:REGISTER_USER_FAILURE,payload:error.response.data.message})
        Swal.fire({
            title: "Signup failed!",
            text: error.response.data.message,
            icon: "error"
          });
    }
}

//login
export const userLogin =(loginData)=>async(dispatch)=>{
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/user/login`,loginData);
       
        
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
        }
        dispatch({type:LOGIN_USER_SUCCESS,payload:data})
      
    } catch (error) {
        console.log("error", error);
        let errorMessage = "An error occurred"; // Default error message
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({ type: LOGIN_USER_FAILURE, payload: errorMessage });
      
        Swal.fire({
            title: "Login failed!",
            text: errorMessage,
            icon: "error"
          });
    }
}

//get user profile
export const getUserProfile =(jwt)=>async(dispatch)=>{
    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/user/profile`,{
            headers:{
                "Authorization":`Bearer ${jwt}`
            }
        });
        dispatch({type:GET_USER_SUCCESS,payload:data})
        console.log(data)
        
    } catch (error) {
        console.log("error",error);
        dispatch({type:GET_USER_FAILURE,payload:error.message})
        
    }
}
export const getUserByEmail =(userSecret)=>async(dispatch)=>{

  
    try {
     
        const {data} = await api.get(`/api/user/get/${userSecret}`);
        dispatch({type:GET_USER_BY_ID_SUCCESS,payload:data})
        console.log("get user", data)
       
        
    } catch (error) {
        console.log("error",error);
        dispatch({type:GET_USER_BY_ID_FAILURE,payload:error.message})
        
    }
}

//search user by name
export const findUserByName =(keyword)=>async(dispatch)=>{
    try {
        
        const {data} = await api.get(`/api/user/search/${keyword}`);
        dispatch({type:FIND_USER_BY_NAME_SUCCESS,payload:data})
      
        
    } catch (error) {
        console.log("error",error);
        dispatch({type:FIND_USER_BY_NAME_FAILURE,payload:error.message})
    }
}

//donor google login
export const googleLoginhandler= (googleId,fullName,email,profilePic)=>async(dispatch)=>{
    
   

    const {data} = await axios.post(`${API_BASE_URL}/auth/signup/google/donor`, {googleId,fullName,email,profilePic});
  
    if(data.jwt){
       console.log(data.jwt)
      localStorage.setItem("jwt",data.jwt)
  }
    dispatch({type:LOGIN_USER_SUCCESS,payload:data}) 
    
  }

  //update user profile
  export const updateUserProfile =(userData)=>async(dispatch)=>{
    try {
        const {data} = await api.post(`api/user/profile/update`,userData);

        dispatch({type:UPDATE_USER_SUCCESS,payload:data})
        Swal.fire({
            title: "Success!",
            text: "Profile Updated!",
            icon: "success"
          });
        
    } catch (error) {
        console.log("error",error);
        dispatch({type:UPDATE_USER_FAILURE,payload:error.message})
        Swal.fire({
            title: "Failed!",
            text: "Update Failed!",
            icon: "error"
          });
    }
}

//follow user
export const followUserProfile =(userSecret)=>async(dispatch)=>{
    try {
       
        const {data} = await api.get(`api/user/follow/${userSecret}`);
        console.log("follow ",data)
        dispatch({type:FOLLOW_USER_SUCCESS,payload:data})
        
    } catch (error) {
        console.log("error",error);
        dispatch({type:FOLLOW_USER_FAILURE,payload:error.message})
    }
}



//logout
  export const logOut =()=>async(dispatch)=>{   
    localStorage.removeItem("jwt");
    localStorage.clear();
    
    dispatch({type:LOGOUT,payload:null})
   
  
    
  }
