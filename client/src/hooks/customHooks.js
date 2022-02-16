import {useContext} from 'react';
import {AuthContext} from '../context/auth_context/AuthState';
import {EmployeeContext} from '../context/employee_context/EmployeeState';
import {DefaultContext} from '../context/default_context/DefaultState'
import { ServiceContext } from '../context/service_context/ServiceState';
import { SalesContext } from '../context/sales_context/SaleState';
import { CustomerContext } from '../context/customer_context/CustomerState';
import { InventoryContext } from '../context/inventoryContext/InventoryState';


export const useAuth = () => {
    return useContext(AuthContext)
}

export const useEmployee = () => {
    return useContext(EmployeeContext)
}

export const useDefault = () => {
    return useContext(DefaultContext)
}

export const useService = () => {
    return useContext(ServiceContext)
}

export const useSales = () => {
    return useContext(SalesContext)
}

export const useCustomer = () => {
    return useContext(CustomerContext)
}

export const useInventoryVehicles = () => {
    return useContext(InventoryContext)
}

