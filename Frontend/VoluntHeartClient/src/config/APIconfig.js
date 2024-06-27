import axios from "axios"

export const API_BASE_URL = "https://voluntheart.zeabur.app"



export const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type":"application/json"
    }
})