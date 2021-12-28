import React from 'react';
import {
    ListItemText, Tooltip, Typography
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import {withStyles, makeStyles} from '@mui/styles'

import { Link } from 'react-router-dom'

import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import SearchIcon from '@mui/icons-material/Search';


const useStyles = makeStyles((theme) => ({

    links: {
        textDecoration: 'none',
        color: 'inherit'
    },
    tooltip: {
        backgroundColor: theme.palette.common.silver,
        fontSize: 30
    },
    items: {
        padding: theme.spacing(0)
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
                        <Typography align='left'>Sales</Typography>
                    </ListItem>

                    <Link to={"/sales/showroom"} className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary='Showroom' />
                        </ListItem>
                    </Link>

                    <Link to={"/sales/search"} className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary='Vehicle Search' />
                        </ListItem>
                    </Link>
                </List>
            }
            PopperProps={{
                placement: "left",
                modifiers: {
                    offset: {
                        enabled: true,
                        offset: "70px, 15px"
                    }
                }
            }}
        >
            <LocalCarWashIcon className={classes.items}/>
        </LightToolTip>
    );
}