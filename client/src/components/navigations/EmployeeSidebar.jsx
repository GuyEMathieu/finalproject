import React from 'react';
import {
    ListItemText,
    Tooltip, Typography
} from '@mui/material';
import {makeStyles, withStyles} from '@mui/styles'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';


import { Link } from 'react-router-dom'

import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';

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
            title={
                <List>
                    <ListItem button>
                        <Typography align='left'>Employee</Typography>
                    </ListItem>

                    <Link to={"/"} className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary='Employees' />
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
            <GroupIcon />
        </LightToolTip>
    );
}