import './App.css';
import React, {useState, useContext, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { useDefault } from './hooks/customHooks';
import { DefaultContext } from './context/default_context/DefaultState';

//#region Components
import Service from './pages/service/Service';
import Showroom from './pages/sales/Showroom';
import VehiclePurchase from './pages/sales/VehiclePurchase'
import VehicleProfile from './pages/sales/VehicleProfile'
//  import Login from './authPages/Login';
import Login from './pages/home/Login'
import PageNotFound from './pages/PageNotFound';
import RequireAuth from './components/RequireAuth';

//#endregion

// #region States
import DefaultState from './context/default_context/DefaultState'
import EmployeeState from './context/employee_context/EmployeeState'
import AddressState from './context/address_context/AddressState'
import BankState from './context/bank_context/BankState'
import DeptPosState from './context/deptPosContext/DeptPosState'
import BaseVehicleState from './context/baseVehicle_context/BaseVehicleState'
import CustomerState from './context/customer_context/CustomerState'
import InventoryState from './context/inventoryContext/InventoryState';
import SaleState from './context/sales_context/SaleState';
import ServiceState from './context/service_context/ServiceState';
//#endregion

import { ThemeProvider } from '@mui/material/styles';
import {lightTheme} from './themes/lightTheme'
import {darkTheme} from './themes/darkTheme'
import EmployeeSearch from './pages/employees/EmployeeSearch';
import EmployeeMain from './pages/employees/EmployeeMain';

import Layout from './pages/Layout'


function App() {
    const {currentTheme} = useDefault();

    return (
        <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}> 
            <CustomerState>
                <AddressState>
                        <EmployeeState>
                            <BankState>
                                <BaseVehicleState>
                                    <DeptPosState>
                                            <InventoryState> 
                                                <ServiceState>
                                                    <SaleState>                                                    
                                                        <div className="App">
                                                            <BrowserRouter>
                                                                <Routes>
                                                                    <Route path='/' element={<Layout  />}>
                                                                        <Route path='/login' element={<Login />} /> 

                                                                        {/* Page NOT FOUND */}
                                                                        <Route path='*' element={<PageNotFound />} />
                                                                        
                                                                        {/* Protected Routes */}
                                                                        <Route element={<RequireAuth  />}>
                                                                            <Route path='/' element={<Showroom />} />
                                                                            <Route path='/hr/employees' element={<EmployeeSearch  />} />
                                                                            <Route path='/hr/employees/profile/:employeeId' element={<EmployeeMain  />} />

                                                                            <Route path='/service' element={<Service  />} />

                                                                            <Route path='/sales/showroom' element={<Showroom  />} />
                                                                            <Route path='/sales/purchase/:id' element={<VehiclePurchase  />} />
                                                                            <Route path='/sales/vehicleprofile/:id' element={<VehicleProfile  />} />
                                                                        </Route>
                                                                        
                                                                    </Route>
                                                                </Routes>
                                                                
                                                                {/* <Routes>
                                                                    <Route path='/login' element={<Login />} /> 
                                                                    <Route path='/' element={<Showroom />} />
                                                                    <Route path='*' element={<PageNotFound />} />
                                                                
                                                                    <Route path='/hr/employees' element={<EmployeeSearch  />} />
                                                                    <Route path='/hr/employees/profile/:employeeId' element={<EmployeeMain  />} />

                                                                    <Route path='/service' element={<Service  />} />

                                                                    <Route path='/sales/showroom' element={<Showroom  />} />
                                                                    <Route path='/sales/purchase/:id' element={<VehiclePurchase  />} />
                                                                    <Route path='/sales/vehicleprofile/:id' element={<VehicleProfile  />} />
                                                                </Routes> */}
                                                            </BrowserRouter>
                                                        </div>
                                                    </SaleState>
                                                </ServiceState>
                                            </InventoryState>
                                    </DeptPosState>
                                </BaseVehicleState>
                            </BankState>
                        </EmployeeState> 
                </AddressState> 
            </CustomerState>
        </ThemeProvider>
    );
}

export default App;
