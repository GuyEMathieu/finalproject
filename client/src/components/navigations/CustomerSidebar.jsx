import React from 'react';
import {
    ListItemText, Tooltip, Typography
} from '@mui/material';
import {makeStyles} from '@mui/styles'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import {withStyles} from '@mui/styles'

import { Link } from 'react-router-dom'

import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles((theme) => ({

    links: {
        textDecoration: 'none',
        color: 'inherit'
    },
    tooltip: {
        backgroundColor: theme.palette.common.silver,
        //color: "rgba(0,0,0, 0.9)",
        // boxShadow: theme.shadows[1],
        fontSize: 30
      }
}));

const LightToolTip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#f00",
      //color: "rgba(0,0,0, 0.9)",
      // boxShadow: theme.shadows[1],
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
            title={
                <List>
                    <ListItem >
                        <Typography fullWidth align='right'>Customer</Typography>
                    </ListItem>
                    <Link to={"/customer/home"} className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary='Customer Search' />
                        </ListItem>
                    </Link>
                </List>
            }
            PopperProps={{
                placement: "left",
                modifiers: {
                    offset: {
                        enabled: true,
                        offset: "70px, -5px"
                    }
                }
            }}
        >
            <PeopleOutlineIcon />
        </LightToolTip>
    );
}