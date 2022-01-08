import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//#region Components
import EmployeeDash from './pages/employees/EmployeeDash';
import Showroom from './pages/sales/Showroom';
import VehiclePurchase from './pages/sales/VehiclePurchase'
import VehicleProfile from './pages/sales/VehicleProfile'
import Login from './authPages/Login';
import PrivateRoute from './pages/PrivateRoute';
import PageNotFound from './pages/PageNotFound';

//#endregion

// #region States
import AuthState, { setAuthToken } from './context/auth_context/AuthState'
import DefaultState from './context/default_context/DefaultState'
import EmployeeState from './context/employee_context/EmployeeState'
import AddressState from './context/address_context/AddressState'
import BankState from './context/bank_context/BankState'
import DeptPosState from './context/deptPosContext/DeptPosState'
import BaseVehicleState from './context/baseVehicle_context/BaseVehicleState'
import CustomerState from './context/customer_context/CustomerState'
import InventoryState from './context/inventoryContext/InventoryState';
//#endregion

if(localStorage.token){
    setAuthToken(localStorage.token)
}

function App() {

    console.info("Token", localStorage.token)
    return (
        <AuthState>
            <CustomerState>
                <AddressState>
                        <EmployeeState>
                            <BankState>
                                <BaseVehicleState>
                                    <DeptPosState>
                                        <DefaultState>
                                            <InventoryState> 
                                                <div className="App">
                                                    <BrowserRouter>
                                                        <Routes>
                                                            <Route path='/login' element={<Login />} />
                                                            <Route path='*' element={<PageNotFound />} />
                                                            <Route path='/' element={<PrivateRoute />}>
                                                                <Route path='/' element={<EmployeeDash />} />
                                                                <Route path='/hr/employees' element={<EmployeeDash  />} />
                                                                <Route path='/service' element={<EmployeeDash  />} />
                                                                <Route path='/sales/showroom' element={<Showroom  />} />
                                                                <Route path='/sales/purchase/:id' element={<VehiclePurchase  />} />
                                                                <Route path='/sales/vehicleprofile/:id' element={<VehicleProfile  />} />
                                                            </Route>
                                                            {/* <PrivateRoute path='/hr/employees' element={<PrivateRoute component={EmployeeDash}/>} /> */}
                                                        </Routes>
                                                    </BrowserRouter>
                                                </div>
                                            </InventoryState>
                                        </DefaultState>
                                    </DeptPosState>
                                </BaseVehicleState>
                            </BankState>
                        </EmployeeState> 
                </AddressState> 
            </CustomerState>
        </AuthState>
    );
}

export default App;
