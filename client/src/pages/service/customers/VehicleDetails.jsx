import React, {useState, Fragment, useEffect} from 'react'
import {
    Grid, Paper, Button, Typography
} from '@mui/material';

import {formatDate} from '../../../utils/Formatter'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ServiceDetails from './ServiceDetail'
import Popup from '../../../components/Popup';
import NewServiceTrip from './NewServiceTrip';

export default function VehicleDetails (props) {
    const {
        vehicle, customerId, customerContext
    } = props

    const {addVehicleService} = customerContext;

    const {serviceLogs} = vehicle

    const [selectedTrip, setSelectedTrip] = useState(null)

    const [openPopup, setOpenPopup] = useState(false)
    const handleClosePopup =()=> {
        setOpenPopup(false)
    }

    const handleSave = newService => {
        handleClosePopup();
        let service = newService;
        service.date = new Date()

        const data = {customer: customerId, vin: vehicle.vin, newService}
        addVehicleService(data)
    }

    return (
        <Fragment>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4} lg={4}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Service Dates</TableCell>
                                    <TableCell align='right'>
                                        <Button fullWidth={false} onClick={() => setOpenPopup(true)}>New</Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {serviceLogs.map((log, i) => (
                                    <TableRow hover key={i}
                                        onClick={() => setSelectedTrip(log)}
                                        sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">
                                            {formatDate(log.date)}
                                        </TableCell>
                                        <TableCell  />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                { selectedTrip 
                    ? <Grid item xs={12} md={8} lg={8}>
                        <ServiceDetails trip={selectedTrip}/>
                    </Grid>
                    : <Grid item xs={12} md={8} lg={8} sx={{my:' auto'}}>
                        <Paper >
                            <Typography>Select a Date for Service details</Typography>
                        </Paper>
                    </Grid>
                }
            </Grid>
            <Popup 
                handleClose={handleClosePopup} 
                open={openPopup} showClose={false}
                title={'New Service Trip'} 
                sx={{width: '60vw'}}>
                <NewServiceTrip  
                    onClose={handleClosePopup} 
                    onSave={handleSave}/>
            </Popup>
        </Fragment>
    )
}


