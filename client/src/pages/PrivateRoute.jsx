import React, {useContext} from 'react'
import {AuthContext} from '../context/auth_context/AuthState'
import {Outlet} from 'react-router'

import Login from '../authPages/Login';

const PrivateRoute = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading} = authContext;

    return isAuthenticated ? <Outlet  /> : <Login  />
}

export default PrivateRoute