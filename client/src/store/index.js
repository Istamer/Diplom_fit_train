import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loaderSlice from './loaderSlice';

export default configureStore({
  reducer: {
    appUser: userReducer,
    loader: loaderSlice,
  },
});