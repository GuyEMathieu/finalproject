import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './authReducer';
import defaultReducer from './defaultReducer';
import inventoryReducer from './inventoryReducer';
import customerReducer from './customerReducer';
import employeeReducer from './employeeReducer';
import saleReducer from './saleReducer'
import serviceReducer from './serviceReducer'

export default combineReducers({
    auth: authReducer,
    defaults: defaultReducer,
    inventory: inventoryReducer,
    customers: customerReducer,
    employees: employeeReducer,
    sales: saleReducer,
    services: serviceReducer
})