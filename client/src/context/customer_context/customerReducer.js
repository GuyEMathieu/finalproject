import {
    ADD_CUSTOMER, UPDATE_CUSTOMER, CURRENT_CUSTOMER, SET_CURRENT_CUSTOMER,
    GET_ALL, SET_ALERTS, REMOVE_ALERT, FILTER_CUSTOMERS
} from './customerContextTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        

        case GET_ALL:
            return {
                ...state,
                customerList: action.payload
            }
        case ADD_CUSTOMER:
            return {
                ...state,
                customerList: [...state.customerList, action.payload]
            }
        case FILTER_CUSTOMERS:
            return {
                ...state,
                filteredCustomers: [...state.customerList, action.payload]
            }
        
        case UPDATE_CUSTOMER:
            return {
                ...state,
                customerList: state.customerList.map(customer => customer._id === action.payload._id ? action.payload : customer)
            }
        
        case SET_ALERTS:
            return {
                ...state,
                alerts: action.payload
            }
        case REMOVE_ALERT:
            const remaining = state.errors.filter(e => e._id !== action.payload)
            return {
                ...state,
                errors: remaining.length > 0 ? remaining : null
            }
        default:
            return state;
    }

}