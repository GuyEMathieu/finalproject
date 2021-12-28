import React, {Fragment, useContext, useState, useEffect} from 'react';

import {
    Avatar, Button, CssBaseline,
    TextField, Grid,
    Box, Typography, Container
} from '@mui/material';
import { makeStyles } from '@mui/styles'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth_context/AuthState'

import Copyright from '../components/Copyright'
import Header from '../components/Navigations//Header';
import Alerts from '../components/Alerts';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register(props) {
    const authContext = useContext(AuthContext)
    const {alerts, registerUser, addUIAlert, removeAlert, isAuthenticated} = authContext;

    const classes = useStyles();
    const [user, setUser] = useState({
        username: 'Admin',
        password: '123456',
        confirmPassword: '123456'
    })
    const {username, password, confirmPassword} = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value})

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/')
        }
    },[isAuthenticated, props.history])
    const onSubmit = async e => {
        e.preventDefault();

        if(username === ''){
            addUIAlert([{severity: 'error', msg: 'A valid username is required'}])
            return
        }

        if(password === '' || password.length < 6){
            addUIAlert([{severity: 'error', msg: 'A valid password of 6 or more characters is required'}])
            return
        }

        if(password !== confirmPassword) {
            addUIAlert([{severity: 'error', msg: 'Passwords do not match'}])
            return
        }

        console.info(user)
        await registerUser({username, password})
    }

    return (
        <Fragment>
            <CssBaseline />
            <Header />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    {alerts && 
                        <Alerts alerts={alerts} removeAlert={removeAlert}/>
                    }
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="Username"
                                    name="username"
                                    variant="outlined"
                                    required fullWidth
                                    value={username}
                                    onChange={onChange}
                                    label="Username"
                                    autoFocus
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={onChange}
                                    autoComplete="current-password"
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={confirmPassword}
                                    onChange={onChange}
                                    label="Confirm Password"
                                    name="confirmPassword"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth onClick={onSubmit}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>

                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </Fragment>
    );
}