import * as ActionTypes from './customerContextTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        

        case ActionTypes.GET_ALL:
            return {
                ...state,
                customerList: action.payload
            }
        case ActionTypes.ADD_CUSTOMER:
            return {
                ...state,
                customerList: [...state.customerList, action.payload]
            }
        case ActionTypes.FILTER_CUSTOMERS:
            return {
                ...state,
                filteredCustomers: [...state.customerList, action.payload]
            }
        
        case ActionTypes.UPDATE_CUSTOMER:
            return {
                ...state,
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
            const updatedCustomer = state.customerList.find(c => c._id === action.payload.customer)
            updatedCustomer.vehicles.push(action.payload.vehicle)
            return {
                ...state,
                currentCustomer: updatedCustomer,
                customerList: state.customerList.map(c => c._id === updatedCustomer._id ? updatedCustomer : c)
            }
        case ActionTypes.ADD_SERVICE:
            console.info("payload", action.payload)
            const currentCustomer = state.customerList.find(c => c._id === action.payload.customer);
            console.info("Current Customer", currentCustomer)

            currentCustomer.vehicles.find(v => v.vin === action.payload.vin).serviceLogs.push(action.payload.newService)
            console.info("udpated customer", currentCustomer)
            return {
                ...state,
                currentCustomer: currentCustomer,
                customerList: state.customerList.map(customer => customer._id === currentCustomer ? currentCustomer : customer)
            }
        default:
            return state;
    }

}