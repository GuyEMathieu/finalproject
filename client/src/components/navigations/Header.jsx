import {useState} from 'react'
import { styled } from '@mui/material/styles';
import {
    Menu,MenuItem, Divider, 
    Avatar, Toolbar, Typography
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';

import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/actions/authActions';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export default function Header(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        open, handleDrawerOpen, title
    } = props

    const {user} = useSelector(state => state.auth)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToProfile = id => {
        navigate(`/hr/employees/profile/${user.profile._id}`)
    }

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <MenuIcon 
                    onClick={handleDrawerOpen}
                    sx={{ 
                        ":hover": {cursor: 'pointer'}, mr: 2, 
                        ...(open && { display: 'none' }) 
                    }}
                />
                <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                    {title}
                </Typography>

                {user ? 
                    <div>
                        <Avatar onClick={handleMenu} src={user.profile.avatar} sx={{":hover": {cursor: 'pointer'}}}/> 
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={goToProfile}>Profile</MenuItem>
                            <Divider variant='middle'  />
                            <MenuItem onClick={onLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                : null }
            </Toolbar>
        </AppBar>
    );
}
