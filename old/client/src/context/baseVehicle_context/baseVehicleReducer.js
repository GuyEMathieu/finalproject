import {
    GET_ALL,
    ADD_MANUFACTURER, DELETE_MANUFACTURER, ADD_MODEL,
    DELETE_MODEL, REMOVE_ERROR, SET_ERROR, CLEAR_ERRORS
} from './bvContextTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        
        case GET_ALL:
            return {
                ...state,
                manufacturers: action.payload.manufacturers,
                models: action.payload.models,
            }        
        case ADD_MANUFACTURER:
            return {
                ...state,
                manufacturers: [...state.manufacturers, action.payload],
            }        
        case DELETE_MANUFACTURER:
            return {
                ...state,
                manufacturers: state.manufacturers.filter(m => m._id !== action.payload),
            }        
        case ADD_MODEL:
            return {
                ...state,
                models: [...state.models, action.payload],
            }        
        case DELETE_MODEL:
            return {
                ...state,
                models: state.models.filter(m => m._id !== action.payload),
            }        
        case SET_ERROR:
            return {
                ...state,
                errors: action.payload
            }
        case REMOVE_ERROR:
            const remaining = state.errors.filter(e => e._id !== action.payload)
            return {
                ...state,
                errors: remaining.length > 0 ? remaining : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }
        default:
            return state;
    }

}