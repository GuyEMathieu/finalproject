import * as ActionTypes from '../ActionTypes'

const initialState = {
    employeeList: null,
    filteredEmployees: null,
    isEmployeeError: false,
    isEmployeeLoading: false,
    employeeMessage: null
}

// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.GET_EMPLOYEES:
            return {
                ...state,
                employeeList: action.payload,
            }
        case ActionTypes.FILTER_EMPLOYEES:
            let found;
            const  {firstName, lastName} = action.payload
            if(firstName && !lastName){
                found = state.employeeList.filter(emp => emp.firstName.toUpperCase() === firstName.toUpperCase())
            }
            else if(!firstName && lastName){
                found = state.employeeList.filter(emp => emp.lastName.toUpperCase() === lastName.toUpperCase())
            }
            else {
                found = state.employeeList.filter(emp => 
                emp.firstName.toUpperCase() === firstName.toUpperCase() &&
                emp.lastName.toUpperCase() === lastName.toUpperCase())
            }
        return {
            ...state,
            filteredEmployees: found
        }
        case ActionTypes.EMPLOYEE_ERROR:
            return {
                ...state,
                isEmployeeError: true,
                employeeMessage: action.payload
            }
        case ActionTypes.EMPLOYEE_RESET:
            return {
                ...state,
                isError: false,
                isEmployeeLoading: false,
                employeeMessage: null,
                filteredEmployees: null
            }
        default:
            return state;
    }
}

export default reducer
