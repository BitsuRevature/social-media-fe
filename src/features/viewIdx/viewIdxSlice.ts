import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ViewIdxState{
    idx: number
}

const initialState : ViewIdxState = {
    idx: 1
};


const viewIdxSlice = createSlice({
    name: 'viewIdx',
    initialState,
    reducers: {
        changeIdx: (state, action: PayloadAction<number>) => {
            state.idx = action.payload
        }
    }
})

export const {changeIdx} = viewIdxSlice.actions;

export default viewIdxSlice.reducer;