import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import defaultService from './defaultService'


const initialState = {
    defaults: null,
    isDefaultError: false,
    isDefaultSuccess: false,
    isDefaultLoading: false,
    defaultMessage: null
}

export const getDefaults = createAsyncThunk('/', async (thunkAPI) => {
    try{
        const token = localStorage.getItem('token')
        return await defaultService.getDefaults(token);
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
            state.isDefaultLoading =  false;
            state.isDefaultError =  false;
            state.isDefaultSuccess =  false;
            state.defaultMessage =  null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(getDefaults.pending, (state) => {
                state.isDefaultLoading = true
            })
            .addCase(getDefaults.fulfilled, (state, action) => {
                state.isDefaultLoading = false;
                state.isDefaultSuccess = true;
                state.defaults = action.payload
            })
            .addCase(getDefaults.rejected, (state, action) => {
                state.isDefaultLoading = false;
                state.defaults = null;
                state.defaultMessage = action.payload;
                state.isDefaultError = true;
            })

    }
})


export const {reset} = defaultSlice.actions;
export default defaultSlice.reducer