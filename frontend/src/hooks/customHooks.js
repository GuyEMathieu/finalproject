import {useContext} from 'react';
import { SettingsContext } from '../context/settings_context/SettingState';
import { useDispatch, useSelector } from 'react-redux';

import * as InventoryActions from '../redux/actions/inventoryActions'
//import * as DefaultActions from '../redux/actions/defaultsActions'
//import * as AuthActions from '../redux/actions/authActions'


export const useSettings = () => {
    return useContext(SettingsContext);
}

// export const useAuth = () => {

//     const dispatch = useDispatch()
//     const {user, isError, isLoading, message} = useSelector((state) => state.auth)


//     return {
//         user, 
//         isError, 
//         isLoading,
//         message,
//         loginUser: dispatch(AuthActions.loginUser),
//         logout: dispatch(AuthActions.logout),
//     }
// }


// export const useInventory = () => {

//     const dispatch = useDispatch()
//     const {inventoryVehicles, isError, isLoading, message} = useSelector((state) => state.inventory)

//     return {
//         inventoryVehicles, 
//         isError, 
//         isLoading,
//         message,
//         getInventory: dispatch(InventoryActions.getInventory)
//     }
// }


// export const useDefaults = () => {

//     const dispatch = useDispatch()
//     const {defaults, isError, isLoading, message} = useSelector((state) => state.defaults)

//     const getDefaults = () => dispatch(DefaultActions.getInventory())

//     return {
//         defaults, 
//         isError, 
//         isLoading,
//         message,
//         getDefaults
//     }
// }