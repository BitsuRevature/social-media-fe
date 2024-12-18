import axios from "axios";
import {AuthContextType, LoginType, RegisterType, UserBioType, UserPIType} from "./types.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

const localStorage = window.localStorage;

export async function signin(data: LoginType, authUpdate: (data: AuthContextType) => void){
    // eslint-disable-next-line no-useless-catch
    try{
        const response = await axios.post('/auth/login', data);

        // Save our token to local storage
        const token = response.data as AuthContextType;
        const decodedToken: JwtPayload & AuthContextType = jwtDecode(token.token!);


        const tokenToStore = {
            ...token,
            username: decodedToken.sub,
            id: decodedToken.id,
            profilePicture: decodedToken.profilePicture,
            firstname: decodedToken.firstname,
            lastname: decodedToken.lastname,
            bio: decodedToken.bio
        }


        localStorage.setItem('user', JSON.stringify(tokenToStore));
        authUpdate(token);
    }catch (error){
        throw error;
    }
}

export async function register(data: RegisterType){
    // eslint-disable-next-line no-useless-catch
    try{
        const response = await axios.post('/auth/register', data);
    }catch (error){
        throw error;
    }
}

