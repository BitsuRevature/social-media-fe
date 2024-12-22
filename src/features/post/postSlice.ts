import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axiosConfig";
import { CreatePostType, PostType } from "../../util/types";
import { Id, toast } from "react-toastify";

interface PostSliceType {
    posts: PostType[],
    isLoading: boolean,
    loadingId: Id[]
}

const initialState: PostSliceType = {
    posts: [],
    isLoading: false,
    loadingId: []
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
            return {postId: id};
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
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
)

export const addComment = createAsyncThunk(
    'post/addComment',
    async(data: { postId: number, content: string}, thunkAPI) => {
        try {
            const res = await axios.post(`/comments`, data)
            return {
                comment: res.data,
                postId: data.postId
            };     
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
            return data;
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
            return data;
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
            state.loadingId.push(toast.loading("Loading Posts"))
        })

        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
            state.loadingId.forEach(id => toast.done(id));
        })

        builder.addCase(getPosts.rejected, (state) => {
            state.isLoading = false;
            toast.error("Couldn't Load Posts");
        })

        // Delete Post
        // builder.addCase(deletePost.pending, (state) => {

        // })

        builder.addCase(deletePost.fulfilled, (state, action) => {
            const {postId} = action.payload;
            state.posts = state.posts.filter(post => post.id != postId);
        })

        builder.addCase(deletePost.rejected, () => {
            toast.error("Couldn't Delete Posts");
        })
        
        // Delete Comment
        // builder.addCase(deleteComment.pending, (state) => {

        // })

        builder.addCase(deleteComment.fulfilled, (state, action) => {
            const {postId, commentId} = action.payload;

            state.posts = state.posts.map(post => {
                if(post.id == postId){
                    post.comments = post.comments.filter(comment => {
                            return comment.id != commentId
                        }
                    )
                }

                return post
            })

        })

        builder.addCase(deleteComment.rejected, () => {
            toast.error("Couldn't Delete Comment");
        })

        // builder.addCase(createPost.pending, (state, action) => {

        // })

        // builder.addCase(createPost.fulfilled, (state, action) => {
            
        // })

        builder.addCase(createPost.rejected, () => {
            toast.error("Couldn't Create Post");
        })

        // builder.addCase(likePost.pending, (state, action) => {

        // })

        builder.addCase(likePost.fulfilled, (state, action) => {
            const {postId, userId} = action.payload;
            
            state.posts = state.posts.map((post => {
                if(post.id == postId){
                    post.reactions.push(userId)
                }
                return post;
            }))
        })

        builder.addCase(likePost.rejected, () => {
            toast.error("Couldn't Like Post");
        })

        // builder.addCase(unLikePost.pending, (state, action) => {

        // })

        builder.addCase(unLikePost.fulfilled, (state, action) => {
            const {postId, userId}= action.payload;

            state.posts = state.posts.map(post => {
                if(post.id == postId){
                    post.reactions = post.reactions.filter(reaction => reaction != userId)
                }
                return post;
            })
        })

        builder.addCase(unLikePost.rejected, () => {
            toast.error("Couldn't Unlike Posts");
            
        })

        // builder.addCase(addComment.pending, (state, action) => {

        // })

        builder.addCase(addComment.fulfilled, (state, action) => {
            const {postId, comment} = action.payload;
            state.posts = state.posts.map(post => {
                if(post.id == postId){
                    post.comments.push(comment)
                }

                return post;
            })
        })


        builder.addCase(addComment.rejected, () => {
            toast.error("Couldn't Create Comment");
        })


    }

})

export const { } = postSlice.actions;

export default postSlice.reducer;