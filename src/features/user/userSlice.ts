import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from '../../util/types';
import { getFriendRequests } from '../../util/apiHelper';

interface UserState {
    friendRequests: UserType[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    friendRequests: [],
    loading: false,
    error: null,
};

export const fetchFriendRequests = createAsyncThunk(
    'user/fetchFriendRequests',
    async (_, thunkAPI) => {
        try {
            return await getFriendRequests();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFriendRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFriendRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.friendRequests = action.payload;
            })
            .addCase(fetchFriendRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { } = userSlice.actions;
export default userSlice.reducer;