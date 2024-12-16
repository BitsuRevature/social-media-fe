import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthContextType, LoginType, UserBioType, UserPIType } from "../../util/types";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "react-toastify";
import { act } from "react";

interface AuthSliceType {
    auth: AuthContextType | null,
    isLoading: boolean
}

const initialState: AuthSliceType = {
    auth: null,
    isLoading: false
}

export const login = createAsyncThunk(
    'auth/signIn',
    async (data: LoginType, thunkAPI) => {
        try {
            const response = await axios.post('/auth/login', data);
            console.log(response);
            // navigate("/");
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuth: (state, action) => {
            const data = action.payload as AuthContextType;
            state.auth = data;
        },
        updatePI: (state, action) => {
            const data = action.payload as UserPIType;
            const newState = state.auth;
            newState!.firstname = data.firstname;
            newState!.lastname = data.lastname;
            state.auth = newState;
        },
        updateBio: (state, action) => {
            const data = action.payload as UserBioType;
            const newState = state.auth;
            newState!.bio = data.bio;
            state.auth = newState;
        },
        updateProfilePic: (state, action) => {
            const data = action.payload as string;
            const newState = state.auth;
            newState!.profilePicture = data
            state.auth = newState;
        },
        logout: (state) => {
            state.auth = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(login.fulfilled, (state, action) => {

            const data = action.payload.token as string;
            const decodedToken: JwtPayload & AuthContextType = jwtDecode(data);

            console.error("==========Auth Slice ==========")
            console.log(decodedToken)

            const tokenToStore = {
                token: data,
                username: decodedToken.sub,
                id: decodedToken.id,
                profilePicture: decodedToken.profilePicture,
                firstname: decodedToken.firstname,
                lastname: decodedToken.lastname,
                bio: decodedToken.bio
            }

            localStorage.setItem('user', JSON.stringify(tokenToStore));
            state.isLoading = false;
            window.location.reload();
        })

        builder.addCase(login.rejected, (state) => {
            state.isLoading = false;
            toast.error("Username or password wrong. Try Again!");
        })


    }
})

export const { updateAuth, logout, updateBio, updatePI, updateProfilePic } = authSlice.actions;
export default authSlice.reducer