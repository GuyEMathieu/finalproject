import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import employeeService from './employeeService'

const initialState = {
    employeeList: null,
    isEmployeeListError: false,
    isEmployeeListSuccess: false,
    isEmployeeListLoading: false,
    employeeMessage: null,
}

export const getEmployeeList = createAsyncThunk('/', async (thunkAPI) => {
    try{
        const token = localStorage.getItem('token')
        return await employeeService.getEmployeeList(token);
    } catch (err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

        return thunkAPI.rejectWithValue(message)
    }
})



export const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        reset: (state) => {
            state.isEmployeeListLoading =  false;
            state.isEmployeeListError =  false;
            state.isEmployeeListSuccess =  false;
            state.employeeMessage =  null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(GET_EMPLOYEE_LIST_PENDING, (state) => {
                state.isEmployeeListLoading = true
            })
            .addCase(GET_EMPLOYEE_LIST_SUCCESS, (state, action) => {
                state.isEmployeeListLoading = false;
                state.isEmployeeListSuccess = true;
                state.employeeList = action.payload
            })
            .addCase(GET_EMPLOYEE_LIST_ERROR, (state, action) => {
                state.isEmployeeListLoading = false;
                state.employeeList = null;
                state.employeeMessage = action.payload;
                state.isEmployeeListError = true;
            })
    }
})

const GET_EMPLOYEE_LIST_PENDING = 'GET_EMPLOYEE_LIST_PENDING';
const GET_EMPLOYEE_LIST_SUCCESS = 'GET_EMPLOYEE_LIST_SUCCESS';
const GET_EMPLOYEE_LIST_ERROR = 'GET_EMPLOYEE_LIST_PENDING';

export const {reset} = employeeSlice.actions;
export default employeeSlice.reducer