import axios from 'axios'
import {ResponseType} from "./tasks-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2c59aa34-aaed-4614-8c12-316aeadce273'
    }
})

export type  LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?:string
}
export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<ResponseType<{userId?:number}>>(`auth/login`, data);
    },
    logout (){
        return instance.delete<ResponseType<{userId?:number}>>(`auth/login`);
    },
    me(){
      return  instance.get<ResponseType<{id:number,email: string, login:string}>>(`auth/me`)
    }
}
