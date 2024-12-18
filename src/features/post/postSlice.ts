import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../config/axiosConfig";
import { CommentType, CreatePostType, PostType } from "../../util/types";
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
    async (search: string, thunkAPI) => {
        try {
            const response = await axios.get(`/posts?search=${search}`);
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

export const likePost = createAsyncThunk(
    'post/likePost',
    async(data: {postId: number, userId: number}, thunkAPI) => {
        const type = 'LIKE';
        try{
            await axios.post('/reactions', {
                postId: data.postId as number,
                type: type as string
            })
            return;
        }catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
)

export const unLikePost = createAsyncThunk(
    'post/unLikePost',
    async(data: {postId: number, userId: number}, thunkAPI) => {
        try{
            await axios.delete(`/posts/reactions/${data.postId as number}`)
            return;
        }catch (error: any) {
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
            const newState = state.posts; 
            const filterd = newState.posts.filter(post => post.id !== action.payload).slice()
            state.posts = filterd;
        })

        // builder.addCase(deletePost.rejected, (state) => {

        // }
        1
        // Delete Comment
        // builder.addCase(deleteComment.pending, (state) => {

        // })

        builder.addCase(deleteComment.fulfilled, (state, action) => {
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

        builder.addCase(createPost.pending, (state, action) => {

        })

        builder.addCase(createPost.fulfilled, (state, action) => {
            
        })

        builder.addCase(createPost.rejected, (state, action) => {
            toast.error("Post Failed");
        })

        builder.addCase(likePost.pending, (state, action) => {

        })

        builder.addCase(likePost.fulfilled, (state, action) => {
            const data = action.payload;

            const newState = state.posts.at(data.postId);
            newState?.reactions.push(data.userId);

            state.posts = newState;
        })

        builder.addCase(likePost.rejected, (state, action) => {
            
        })

        builder.addCase(unLikePost.pending, (state, action) => {

        })

        builder.addCase(unLikePost.fulfilled, (state, action) => {
            const data = action.payload;

            let newState = state.posts.at(data.postId);

            newState?.reactions.splice(newState.reactions.indexOf(data.userId), 1);
            state.posts = newState;
        })

        builder.addCase(unLikePost.rejected, (state, action) => {
            
        })

    }

})

export const { } = postSlice.actions;

export default postSlice.reducer;