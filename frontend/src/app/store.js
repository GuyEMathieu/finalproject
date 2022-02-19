import { createStore, combineReducers } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
// import authReducer from '../features/auth/authSlice';
// import employeeReducer from '../features/employees/employeeSlice';
// import inventoryReducer from '../features/inventory/inventorySlice'
// import defaultReducer from '../features/defaults/defaultSlice'

// const rootReducer = combineReducers({
//     auth: authReducer,
//     employees: employeeReducer,
//     inventory: inventoryReducer,
//     default: defaultReducer
// })
// export const store = createStore(rootReducer, composeWithDevTools())



import defaultReducer from '../redux/reducers/authReducer'
import authReducer from '../redux/reducers/authReducer';
import inventoryReducer from '../redux/reducers/inventoryReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    defaults: defaultReducer,
    inventory: inventoryReducer,

})
// Create Redux store
export const store = createStore(rootReducer, composeWithDevTools())
