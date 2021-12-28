import React from 'react';
import {
    ListItemText, Tooltip, Typography
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import {makeStyles, withStyles} from '@mui/styles'

import { Link } from 'react-router-dom'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SearchIcon from '@mui/icons-material/Search';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import PeopleIcon from '@mui/icons-material/People';

const useStyles = makeStyles((theme) => ({

    links: {
        textDecoration: 'none',
        color: 'inherit'
    },
    tooltip: {
        backgroundColor: theme.palette.common.silver,
        fontSize: 30
    }
}));

const LightToolTip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#f00",
      fontSize: 11
    },
    links: {
        textDecoration: 'none',
        color: 'inherit'
    } 
}))(Tooltip);

export default function EmployeeSidebar() {
    const classes = useStyles();
    return (
        <LightToolTip
            className={classes.tooltip}
            arrow
            interactive
            title = {
                <List>
                    <ListItem button>
                        <Typography align='left'>HR</Typography>
                    </ListItem>

                    <Link to={"/hr/countries_states"} className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <LocationOnIcon />
                            </ListItemIcon>
                            <ListItemText primary='Countries and States' />
                        </ListItem>
                    </Link>

                    <Link to={"/hr/banks"} className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <AttachMoneyIcon />
                            </ListItemIcon>
                            <ListItemText primary='Banks' />
                        </ListItem>
                    </Link>

                    <Link to={"/hr/vehicles"} className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <DirectionsCarIcon />
                            </ListItemIcon>
                            <ListItemText primary='Vehicle Makes & Models' />
                        </ListItem>
                    </Link>

                    <Link to={"/hr/employees"} className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary='Employees' />
                        </ListItem>
                    </Link>
                    <Link to={"/hr/dept_pos"} className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary='Department And Positions' />
                        </ListItem>
                    </Link>

                </List>
            }
            PopperProps={{
                placement: "left",
                modifiers: {
                    offset: {
                        enabled: true,
                        offset: "140px, 15px"
                    }
                }
            }}>
            <PanToolOutlinedIcon color='primary'/>
        </LightToolTip>
    );
}