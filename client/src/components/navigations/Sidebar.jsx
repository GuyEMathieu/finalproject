import React from "react";
import { Grid } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import {makeStyles} from '@mui/styles'

import EmployeeSidebar from "./EmployeeSidebar";
import CustomerSidebar from "./CustomerSidebar";
import VehicleSidebar from "./VehicleSidebar";
import HRSidebar from './HRSidebar'


const drawerWidth = 85;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0    
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: "auto",
        backgroundColor: '#000'
    },
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: "rgba(0,0,0.87)",
        //boxShadow: theme.shadows[1],
        fontSize: 30
    }
}));



export default function ClippedDrawer() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Toolbar />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <HRSidebar />
                </Grid>

                <Grid item xs={12}>
                    <EmployeeSidebar />
                </Grid>

                <Grid item xs={12}>
                    <CustomerSidebar />
                </Grid>

                <Grid item xs={12}>
                    <VehicleSidebar />
                </Grid>
            </Grid>
        </Drawer>
    );
}