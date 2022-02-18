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
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.message = action.payload;
                state.isError = true;
            })


            // Login User
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
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


export const {reset} = authSlice.actions;
export default authSlice.reducer