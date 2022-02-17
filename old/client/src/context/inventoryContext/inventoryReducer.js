import {
    GET_VEHICLES, SET_ALERTS, REMOVE_ALERT, 
    CURRENT_VEHICLE, PURCHASE_COMPLETE
} from './inventoryTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        
        case CURRENT_VEHICLE:
            
            return {
                ...state,
                currentVehicle: state.inventoryVehicles.find(v => v._id === action.payload)
            }
        case PURCHASE_COMPLETE:
            return {
                ...state,
                alerts: action.payload.alerts,
                receipt: action.payload.receipt,
            }
        
        case GET_VEHICLES:
            return {
                ...state,
                inventoryVehicles: action.payload
            }
        
        case SET_ALERTS:
            return {
                ...state,
                alerts: action.payload
            }
        case REMOVE_ALERT:
            if(state.alerts !== null){
                const remaining = state.alerts.filter(e => e._id !== action.payload)
                return {
                    ...state,
                    alerts: remaining.length > 0 ? remaining : null
                }
            } else {
                return state
            }
        default:
            return state;
    }

}