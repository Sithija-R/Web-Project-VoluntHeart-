import axios from "axios"
import { api } from "../../config/APIconfig"
import { CREATE_POST_FAILURE, CREATE_POST_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_SUCCESS, FIND_POST_BY_CONTENT_FAILURE, FIND_POST_BY_CONTENT_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_LIKED_POST_FAILURE, GET_LIKED_POST_SUCCESS, GET_USERS_ALL_POST_FAILURE, GET_USERS_ALL_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_SUCCESS, USER_LOGOUT } from "./ActionType";


export const getAllPosts=()=>async(dispatch)=>{

    try {
        const {data} = await api.get("/api/posts/all");
       
        
        dispatch({type:GET_ALL_POST_SUCCESS,payload:data})
        
        
    } catch (error) {
        dispatch({type:GET_ALL_POST_FAILURE,payload:error.message})
    }

}


export const getUsersPosts=()=>async(dispatch)=>{

    try {
        const {data} = await api.get(`/api/posts/users`);
       
        dispatch({type:GET_USERS_ALL_POST_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:GET_USERS_ALL_POST_FAILURE,payload:error.message})
    }

}


export const getUsersLikedPosts=()=>async(dispatch)=>{
   
    try {
        const {data} = await api.get(`/api/posts/user/likes`);
      
        dispatch({type:GET_LIKED_POST_SUCCESS,payload:data})
        
        
    } catch (error) {
        dispatch({type:GET_LIKED_POST_FAILURE,payload:error.message})
    }

}


export const findPostByContent=(keyword)=>async(dispatch)=>{

    try {
        const {data} = await api.get(`api/${keyword}`);
        
        dispatch({type:FIND_POST_BY_CONTENT_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:FIND_POST_BY_CONTENT_FAILURE,payload:error.message})
    }

}

export const createPost=(postData)=>async(dispatch)=>{

    try {
        const {data} = await api.post(`/api/posts/create`,postData);
       
        dispatch({type:CREATE_POST_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:CREATE_POST_FAILURE,payload:error.message})
    }

}


export const likePost=(postId)=>async(dispatch)=>{

    try {
        const {data} = await api.post(`/like/${postId}`);
      
        dispatch({type:LIKE_POST_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:LIKE_POST_FAILURE,payload:error.message})
    }

}



export const deletePost=(uniqueKey)=>async(dispatch)=>{

    try {
        const {data} = await api.post(`/api/posts/delete/${uniqueKey}`);
       
        dispatch({type:DELETE_POST_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:DELETE_POST_FAILURE,payload:error.message})
    }

}

