import * as ActionTypes from '../ActionTypes'


const initialState = {
    customerList: null,
    filteredCustomers: null,
    isCustomerSuccess: false,
    isCustomerError: false,
    isCustomerLoading: false,
    customerMessage: null
}

// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = initialState, action) => {
    switch(action.type){

        case ActionTypes.GET_CUSTOMERS:
            return {
                ...state,
                isCustomerSuccess: true,
                customerList: action.payload
            }
        case ActionTypes.ADD_CUSTOMER:
            return {
                ...state,
                isCustomerSuccess: true,
                customerList: [...state.customerList, action.payload],
                currentCustomer: action.payload
            }
        case ActionTypes.UPDATE_CUSTOMER:
            return {
                ...state,
                isCustomerSuccess: true,
                customerList: state.customerList.map(customer => customer._id === action.payload._id ? action.payload : customer)
            }
        case ActionTypes.CUSTOMER_ERROR:
            return {
                ...state,
                isCustomerError: true,
                customerMessage: action.payload.message
            }
        case ActionTypes.FILTER_CUSTOMERS:
            let found;
            const firstName = action.payload.firstName;
            const lastName = action.payload.lastName
            if(firstName && !lastName){
                found = state.customerList.filter(c => c.firstName.toUpperCase() === firstName.toUpperCase())
            } else if(!firstName && lastName){
                found = state.customerList.filter(c => c.lastName.toUpperCase() === lastName.toUpperCase())
            } else {
                found = state.customerList.filter(c => c.firstName.toUpperCase() === firstName.toUpperCase() && c.lastName.toUpperCase() === lastName.toUpperCase())
            }
            return {
                ...state,
                filteredCustomers: found
            }
        case ActionTypes.CUSTOMER_RESET:
            return {
                ...state,
                isCustomerError: false,
                isCustomerLoading: false,
                customerMessage: null,
                filteredCustomers: null,
                isCustomerSuccess: false
            }
        default:
            return state;
    }
}

export default reducer
