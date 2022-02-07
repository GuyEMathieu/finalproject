import * as ActionTypes from './authTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch(action.type){
    
        case ActionTypes.SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
    
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                errors: state.errors.filter(e => e._id !== action.payload)
            }
        default:
            return state
    }
}