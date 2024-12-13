import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../config/axiosConfig";


const initialState = {
    posts: [],
    isLoading: false,
}

export const getPosts = createAsyncThunk(
    'post/getPosts',
    async ( arg, thunkAPI) => {
        try {
            const response = await axios.get("/posts");
            return response.data;
        }catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        // Add reducers here
    },
    extraReducers: (builder) => {
        // Get Posts Reducer
        builder.addCase(getPosts.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
        })

        builder.addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false;
        })


    }

})

export const {} = postSlice.actions;

export default postSlice.reducer;