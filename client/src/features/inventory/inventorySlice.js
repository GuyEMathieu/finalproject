import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import inventoryService from './inventoryService'


//get User from localstorage
const initialState = {
    inventoryVehicles:  null,
    isInventoryError: false,
    isInventorySuccess: false,
    isInventoryLoading: false,
    inventoryMessage: null
}

export const getInventoryVehicles = createAsyncThunk('/', async (user, thunkAPI) => {
    try{
        return await inventoryService.getInventoryVehicles();
    } catch (err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

        return thunkAPI.rejectWithValue(message)
    }
})



export const inventorySlice = createSlice({
    name: 'inventories',
    initialState,
    reducers: {
        reset: (state) => {
            state.isInventoryLoading =  false;
            state.isInventoryError =  false;
            state.isInventorySuccess =  false;
            state.inventoryMessage =  null;
        }
    },
    extraReducers: (builder) => {
        builder

            // Register User
            .addCase(getInventoryVehicles.pending, (state) => {
                state.isInventoryLoading = true
            })
            .addCase(getInventoryVehicles.fulfilled, (state, action) => {
                state.isInventoryLoading = false;
                state.isInventorySuccess = true;
                state.inventoryVehicles = action.payload
            })
            .addCase(getInventoryVehicles.rejected, (state, action) => {
                state.isInventoryLoading = false;
                state.inventoryVehicles = null;
                state.inventoryMessage = action.payload;
                state.isInventoryError = true;
            })

    }
})


export const {reset} = inventorySlice.actions;
export default inventorySlice.reducer