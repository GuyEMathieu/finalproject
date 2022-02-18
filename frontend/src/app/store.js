import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import defaultReducer from '../features/defaults/defaultSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        defaults: defaultReducer,
    },
})