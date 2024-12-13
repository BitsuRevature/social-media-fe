import axios from "axios";
import {AuthContextType, LoginType, RegisterType} from "./types.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

const localStorage = window.localStorage;

export async function signin(data: LoginType, authUpdate: (data: AuthContextType) => void){
    // eslint-disable-next-line no-useless-catch
    try{
        console.log(data)
        const response = await axios.post('/auth/login', data);
        console.log(response)

        // Save our token to local storage
        const token = response.data as AuthContextType;
        const decodedToken: JwtPayload & AuthContextType = jwtDecode(token.token!);

        console.log(decodedToken)

        const tokenToStore = {
            ...token,
            username: decodedToken.sub,
            id: decodedToken.id,
            profilePicture: decodedToken.profilePicture
        }

        console.log(tokenToStore)

        localStorage.setItem('user', JSON.stringify(tokenToStore));
        authUpdate(token);
    }catch (error){
        throw error;
    }
}

export async function register(data: RegisterType){
    // eslint-disable-next-line no-useless-catch
    try{
        console.log(data)
        const response = await axios.post('/auth/register', data);
        console.log(response)
    }catch (error){
        throw error;
    }
}