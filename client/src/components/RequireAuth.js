import {useLocation, Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../hooks/customHooks'

const RequireAuth = () => {
    const {user} = useAuth();
    const location = useLocation();

    return user ? <Outlet  />: <Navigate to='/login' state={{from: location}}   />
}

export default RequireAuth;