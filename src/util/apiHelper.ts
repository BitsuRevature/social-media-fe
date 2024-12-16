import axios from "../config/axiosConfig.ts";
import { UserBioType, UserPIType } from "./types";


export async function changePIInfo(data: UserPIType){
    try{
        console.log(data);
        
        const response = await axios.put('/users/PI', data); 
    }catch (error){
        throw error;
    }
}

export async function changeBio(data: UserBioType){
    try{
        const response = await axios.put('/users/bio', data);
    }catch (error){
        throw error;
    }
}

export async function changeProfilePic(data: string) {
    try{
        const response = await axios.put('/users/profilePic',{mediaURL: data});
    }catch (error){
        throw error;
    }
}