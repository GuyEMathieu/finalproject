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

const CustomerPaper = styled(Paper)(({theme}) => ({
    // marginLeft: '30vw',
    // marginRight: '30vw',
    marginTop: '25vh',
    backgroundColor: 'gray'
}))

const StyledAvatar = styled(Avatar)(({theme}) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

    const [user, setUser] = useState({
        username: 'Giffy.Willsmore',
        password: 'password'
    });

    const onLogin = e => {
        loginUser(user)
    }

    const handleChange = e => {
        const {name, value} =  e.target;
        setUser({...user, [name]: value})
    }
    const list = [
        {
            username: "Steve.Pudge",
            label: "Steve Pudge (Sales Manager)"
        },
        {
            username: "Giffy.Willsmore",
            label: "Giffy Willsmore (Sales Representative)" 
        },
        {
            username: "Horten.Learie",
            label: "Horten Learie (RePair Manager)"
        },
        {
            username: "Omero.Lathwell",
            label: "Omero Lathwell (Repair Technician)"
        },
    ]
    return (
            <Container >
                <CustomerPaper >
                    <Stack direction={'row'} sx={{pb: 2}}>
                        <StyledAvatar >
                            <LockOutlinedIcon />
                        </StyledAvatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    </Stack>    
                    {errors && 
                        <Alerts alerts={errors} removeAlert={clearError}/>
                    }
                    <Stack spacing={2}>

                        <TextField
                            label='Select User' value={user.username} select
                            onChange={handleChange} name='username'
                        >
                            <MenuItem disabled>Select User</MenuItem>
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
                </CustomerPaper>

                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>

    )
};

export default Login;
