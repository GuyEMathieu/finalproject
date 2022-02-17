import React, {useState, useEffect} from 'react';
import {
    Paper, MenuItem,
    InputAdornment, Button, Stack, TextField, Typography,
    Container, Avatar, Box, 
} from '@mui/material';
import Copyright from '../../components/Copyright';
import Alerts from '../../components/Alerts';
import { styled } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/customHooks';

const CustomContainer = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.default,    
    height: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    position: 'relative'
}))
const CustomerPaper = styled(Container)(({theme}) => ({
    height: '25vh',
    position: 'absolute',
    marginTop: '25vh',
    left: '35vw',
    width: '30vw',   
}))

const StyledAvatar = styled(Avatar)(({theme}) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}))
const Typo = styled(Typography)(({theme}) => ({
    color: theme.palette.text.primary
}))


const Login = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const {loginUser, errors, clearError, isAuthenticated} = useAuth();

    useEffect(() => {
        if(isAuthenticated){
            navigate(from, {replace: true})
        }
        // eslint-disable-next-line
    },[isAuthenticated])

    const list = [
        {
            username: "Steve.Pudge",
            label: "Steve Pudge (Sales Manager)",
            password: 'password'
        },
        {
            username: "Giffy.Willsmore",
            label: "Giffy Willsmore (Sales Representative)" ,
            password: 'password'
        },
        {
            username: "Horten.Learie",
            label: "Horten Learie (Repair Manager)",
            password: 'password'
        },
        {
            username: "Omero.Lathwell",
            label: "Omero Lathwell (Repair Technician)",
            password: 'password'
        },
    ]
    const [user, setUser] = useState(list[1]);

    const onLogin = e => {
        loginUser(user)
    }

    const handleChange = e => {
        let {name, value} =  e.target;
        setUser({...user, [name]: value})
    }
    
    return (
        <CustomContainer>
            <CustomerPaper >
                <Stack direction={'row'} sx={{mb: 0, alignItems: 'center'}} justifyContent='center'>
                    <StyledAvatar >
                        <LockOutlinedIcon />
                    </StyledAvatar>
                    <Typo component="h1" variant="h5" align='center'>
                        Sign in
                    </Typo>
                </Stack>    
                {errors && 
                    <Alerts alerts={errors} removeAlert={clearError} />
                }
                <Stack spacing={2} sx={{mt: 2}}>
                    <TextField
                        label='Select A User' value={user.username} select
                        onChange={handleChange} name='username'
                    >
                        {list.map(ele => (
                            <MenuItem key={ele.username} value={ele.username}>{ele.label}</MenuItem>
                        ))}
                    </TextField>
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

                    <Button
                        onClick={onLogin}
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                </Stack>

                <Box mt={2}>
                    <Copyright />
                </Box>
            </CustomerPaper> 
        </CustomContainer>
    )
};

export default Login;
