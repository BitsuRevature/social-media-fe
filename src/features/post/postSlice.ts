import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../config/axiosConfig";
import { CommentType, CreatePostType } from "../../util/types";
import { toast } from "react-toastify";

interface PostSliceType {
    posts: PostType[],
    isLoading: boolean
}

const initialState: PostSliceType = {
    posts: [],
    isLoading: false,
}

export const getPosts = createAsyncThunk(
    'post/getPosts',
    async (arg, thunkAPI) => {
        try {
            const response = await axios.get("/posts");
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)

export const createPost = createAsyncThunk(
    'post/createPost',
    async(post: CreatePostType, thunkAPI) => {
        try{
            await axios.post('/posts', post);
            return;
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
)

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (id: number, thunkAPI) => {
        try {
            await axios.delete(`/posts/${id}`)
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
)

export const deleteComment = createAsyncThunk(
    'post/deleteComment',
    async (data: { postId: number, commentId: number }, thunkAPI) => {
        try {
            await axios.delete(`/comments/${data.commentId}`)
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message })
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

        // Delete Post
        // builder.addCase(deletePost.pending, (state) => {

        // })

        builder.addCase(deletePost.fulfilled, (state, action) => {

            state.posts = state.posts.filter(post => post.id !== action.payload).slice()
        })

        // builder.addCase(deletePost.rejected, (state) => {

        // }
        1
        // Delete Comment
        // builder.addCase(deleteComment.pending, (state) => {

        // })

        builder.addCase(deleteComment.fulfilled, (state, action: PayloadAction<{ postId: number, commentId: number }>) => {

            let newState = state.posts.at(action.payload.postId)
            newState.comments = newState.comments.filter(
                (comment: CommentType) => {
                    return comment.id !== action.payload.id
                }
            );

            state.posts = newState;
        })

        // builder.addCase(deleteComment.rejected, (state) => {

        // }

        builder.addCase(createPost.pending), (state, action) => {

        }

        builder.addCase(createPost.fulfilled), (state, action) => {
            
        }

        builder.addCase(createPost.rejected), (state, action) => {
            toast.error("Post Failed");
        }

    }

})

export const { } = postSlice.actions;

export default postSlice.reducer;