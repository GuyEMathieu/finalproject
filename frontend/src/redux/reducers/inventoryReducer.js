import * as ActionTypes from '../ActionTypes'


const initialState = {
    inventoryVehicles: null,
    currentVehicle: null,
    isError: false,
    isLoading: false,
    message: null
}

// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.CURRENT_VEHICLE:
            return {
                ...state,
                currentVehicle: state.inventoryVehicles.find(v => v._id === action.payload)
            }
        case ActionTypes.GET_INVENTORY:
            return {
                ...state,
                inventoryVehicles: action.payload,
            }

        case ActionTypes.INVENTORY_ERROR:
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case ActionTypes.INVENTORY_RESET:
            return {
                ...state,
                isError: false,
                isLoading: false,
                message: null
            }
        default:
            return state;
    }
}

export default reducer
