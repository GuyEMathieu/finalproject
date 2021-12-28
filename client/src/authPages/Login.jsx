import React, {useState, useContext, useEffect} from 'react';

import {
    Avatar, Button,
    TextField, FormControlLabel,
    Checkbox, Grid,
    Box, Typography, Container, Paper
} from '@mui/material';

import { makeStyles } from '@mui/styles'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth_context/AuthState';

import Copyright from '../components/Copyright'
import Alerts from '../components/Alerts'

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const {loginUser, alerts, addUIAlert, removeAlert, isAuthenticated} = authContext;

    const [user, setUser] = useState({
        username: 'Admin',
        password:'123456'
    })
    const {username, password} = user;

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/')
        }
    }, [isAuthenticated, props.history])

    const onChange = e => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value})
        console.info("Login", user)
    }

    const onLogin = async e => {
        e.preventDefault();
        
        if(username === ''){
            addUIAlert([{severity: 'error', msg: 'A valid username is required'}])
            return;
        }

        if(password === '' || password.length < 6){
            addUIAlert([{severity: 'error', msg: 'A valid password of 6 or more characters is required'}])
            return;
        }

        await loginUser(user)
    }

    return (
        // <React.Fragment>
            // {/* <CssBaseline /> */}

            <Container component="main" maxWidth="xs">
                
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {alerts && 
                        <Alerts alerts={alerts} removeAlert={removeAlert}/>
                    }
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"  margin="normal"
                            required  fullWidth value={username}
                            label="Username"
                            name="username"
                            onChange={onChange}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal" required
                            fullWidth value={password}
                            name="password"  label="Password"
                            type="password" id="password"
                            autoComplete="current-password"
                            onChange={onChange}
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth onClick={onLogin}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/forgotpassword" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        // </React.Fragment>
    );
}