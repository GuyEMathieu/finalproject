import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import defaultService from './defaultService'


//get User from localstorage
const initialState = {
    defaults: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getAll = createAsyncThunk('/', async (thunkAPI) => {
    try{
        return await defaultService.getAll();
    } catch (err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const defaultSlice = createSlice({
    name: 'defaults',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading =  false;
            state.isError =  false;
            state.isSuccess =  false;
            state.message =  null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.defaults = action.payload
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false;
                state.defaults = null;
                state.message = action.payload;
                state.isError = true;
            })
    }
})


export const {reset} = defaultSlice.actions;
export default defaultSlice.reducer