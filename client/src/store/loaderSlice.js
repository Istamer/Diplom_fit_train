import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoad: false, // default value
    },
    reducers: {

        loadOn(state, action) {
            state.isLoad = true;
        },
        loadOff(state, action) {
            state.isLoad = false;
        }
    },
});

export const { loadOff, loadOn } = loaderSlice.actions;

export default loaderSlice.reducer;