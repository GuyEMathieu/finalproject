import * as ActionTypes from './serviceTypes'


// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {

        case ActionTypes.GET_ALL:
            return {
                ...state,
                services: action.payload
            }
        case ActionTypes.SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state;
    }
}