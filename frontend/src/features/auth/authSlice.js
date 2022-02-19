import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'


//get User from localstorage
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const registerUser = createAsyncThunk('/register', async (user, thunkAPI) => {
    try{
        return await authService.register(user);
    } catch (err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const loginUser = createAsyncThunk('/login', 
    async (user, thunkAPI) => {
        try{
            return await authService.login(user);
        } catch(err){
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
})

// Logout user
export const logout = createAsyncThunk('/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading =  false;
            state.isError =  false;
            state.isSuccess =  false;
            state.message =  '';
        }
    },
    extraReducers: (builder) => {
        builder

            // Register User
            .addCase(REGISTER_PENDING, (state) => {
                state.isLoading = true
            })
            .addCase(REGISTER_SUCCESS, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(REGISTER_ERROR, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.message = action.payload;
                state.isError = true;
            })


            // Login User
            .addCase(LOGIN_PENDING, (state) => {
                state.isLoading = true
            })
            .addCase(LOGIN_SUCCESS, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(LOGIN_ERROR, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.message = action.payload;
                state.isError = true;
            })

            //Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
})

const LOGIN_PENDING = 'LOGIN_PENDING'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'

const REGISTER_PENDING = 'REGISTER_PENDING'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_ERROR = 'REGISTER_ERROR'


export const {reset} = authSlice.actions;
export default authSlice.reducer