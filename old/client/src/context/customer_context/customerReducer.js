import * as ActionTypes from './customerContextTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        
        case ActionTypes.GET_ALL:
            return {
                ...state,
                customerList: action.payload
            }
        case ActionTypes.REMOVE_FILTER:
            return {
                ...state,
                filteredCustomers: null
            }
        case ActionTypes.FILTER_CUSTOMERS:
            let filtered = null
            if(action.payload.firstName && !action.payload.lastName){
                filtered = state.customerList.filter(s => s.firstName === action.payload.firstName)
            } else if(!action.payload.firstName && action.payload.lastName){
                filtered = state.customerList.filter(s => s.lastName === action.payload.lastName)
            }else {
                filtered = state.customerList.filter(s => s.firstName === action.payload.firstName
                    && s.lastName === action.payload.lastName
                )
            }
            return {
                ...state,
                filteredCustomers: filtered
            }
        case ActionTypes.UPDATE_CUSTOMER:
        case ActionTypes.ADD_CUSTOMER:
            return {
                ...state,
                currentCustomer: action.payload,
                customerList: state.customerList.map(customer => customer._id === action.payload._id ? action.payload : customer)
            }
        case ActionTypes.SET_ALERTS:
            return {
                ...state,
                alerts: action.payload
            }
        case ActionTypes.REMOVE_ALERT:
            const remaining = state.errors.filter(e => e._id !== action.payload)
            return {
                ...state,
                errors: remaining.length > 0 ? remaining : null
            }
        case ActionTypes.CURRENT_CUSTOMER:
            return {
                ...state,
                currentCustomer: state.customerList.find(c => c._id === action.payload)
            }
        case ActionTypes.ADD_VEHICLE:
            return {
                ...state,
                currentCustomer: action.payload,
                customerList: state.customerList.map(c => c._id === action.payload._id ? action.payload : c)
            }
        case ActionTypes.ADD_SERVICE:
            const currentCustomer = state.customerList.find(c => c._id === action.payload.customer);
            currentCustomer.vehicles.find(v => v.vin === action.payload.vin).serviceLogs.push(action.payload.newService)
            return {
                ...state,
                currentCustomer: currentCustomer,
                customerList: state.customerList.map(customer => customer._id === currentCustomer ? currentCustomer : customer)
            }
        default:
            return state;
    }
}