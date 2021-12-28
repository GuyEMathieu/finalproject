import {
    GET_ALL,
    ADD_DEPARTMENT, DELETE_DEPARTMENT, SET_CURRENT_DEPARTMENT, UPDATE_DEPARTMENT,
    ADD_POSITION, DELETE_POSITION, SET_CURRENT_POSITION, UPDATE_POSITION,
    SET_ALERT, CLEAR_ALERTS, REMOVE_ALERT
} from './deptPosTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case GET_ALL: {
            return {
                ...state,
                departments: action.payload.departments,
                positions: action.payload.positions
            }
        }
        case ADD_DEPARTMENT:
            return {
                ...state,
                departments: [...state.departments || [], action.payload]
            }
        case UPDATE_DEPARTMENT:
            const deptIndex =state.departments.map(function(e) {return e._id;}).indexOf(action.payload._id)
            let departments = state.departments;
            departments[deptIndex] = action.payload
            return {
                ...state,
                departments: departments
            }
        case DELETE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.filter(department => department._id !== action.payload._id),
                alerts: action.payload.alerts
            }
        case SET_CURRENT_DEPARTMENT:
            return {
                ...state,
                currentDepartment: action.payload
            }
        case ADD_POSITION:
            return {
                ...state,
                positions: [...state.positions || [], action.payload]
            }
        case UPDATE_POSITION:
            const posIndex =state.departments.map(function(e) {return e._id;}).indexOf(action.payload._id)
            let positions = state.positions;
            positions[posIndex] = action.payload
            return {
                ...state,
                positions: positions
            }
        case DELETE_POSITION:
            return {
                ...state,
                positions: state.departments.filter(position => position._id !== action.payload._id),
                alerts: action.payload.alerts
            }
        case SET_CURRENT_POSITION:
            return {
                ...state,
                currentPosition: action.payload
            }

        case SET_ALERT:
            return {
                ...state,
                alerts: action.payload
            }

        case REMOVE_ALERT:
            console.info("Deleting ", action.payload)
            const alerts = state.alerts.filter(alert => alert._id !== action.payload);

            return {
                ...state,
                alerts: alerts.length > 0 ? alerts : null
            }

        case CLEAR_ALERTS:
            return {
                ...state,
                alerts: null
            }
        default:
            return state
    }
}