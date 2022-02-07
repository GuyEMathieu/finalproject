import React, {useState, useContext, useEffect} from 'react';
import {
    Paper, 
    InputAdornment, Button,
    Stack, TextField, Typography
} from '@mui/material';

import Alerts from '../../components/Alerts';
import { AuthContext } from '../../context/auth_context/AuthState';
import { styled } from '@mui/material';
import { prettyAlert } from '../../utils/Formatter';

import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const CustomerPaper = styled(Paper)(({theme}) => ({
    marginLeft: '30vw',
    marginRight: '30vw',
    marginTop: '25vh',
    backgroundColor: 'silver'
}))


const Login = () => {
    const authContext = useContext(AuthContext);
    const {loginUser, errors, clearError} = authContext;

    

    const [user, setUser] = useState({
        username: 'testUser',
        password: 'password'
    });

    const onLogin = e => {
        loginUser(user)
    }

    const handleChange = e => setUser({...user, [e.target.name]: e.target.value})
    
    return (
        <CustomerPaper>
            <Stack spacing={2}>
                <Typography align='center'>Login</Typography>
                {errors ? <Alerts alerts={errors} removeAlert={clearError} /> : null}
                <TextField
                    label={'Username'} name='username'
                    
                    value={user.username} onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label={'Password'} name='password' type={'password'}
                    value={user.password} onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}    
                />
                <Button onClick={onLogin} >Login</Button>
            </Stack>

        </CustomerPaper>
    )
};

export default Login;
