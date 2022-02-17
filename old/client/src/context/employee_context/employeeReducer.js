import {
    ADD_EMPLOYEE, UPDATE_EMPLOYEE, SET_CURRENT_EMPLOYEE,
    GET_ALL, SET_ALERTS, REMOVE_ALERT, 
} from './employeeContextTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        
        case ADD_EMPLOYEE:
            return {
                ...state,
                currentEmployee: action.payload,
                employeeList: [...state.employeeList, action.payload]
            }
        case SET_CURRENT_EMPLOYEE:
        case UPDATE_EMPLOYEE:
            const list = state.employeeList;
            if(state.employeeList){
                
                for(let i = 0; i < list.length; i++){
                    if(list[i]._id === action.payload){
                        list[i] = action.payload
                    }
                }
            }

            return {
                ...state,
                currentEmployee: action.payload,
                employeeList: list
            }

        case GET_ALL:
            return {
                ...state,
                employeeList: action.payload
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