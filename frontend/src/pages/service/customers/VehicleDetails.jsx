import React, {useState, Fragment, useEffect} from 'react'
import {
    Grid, Paper, Button, Typography, 
    MenuItem, TextField, Stack
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


import {getDefaults, resetDefaultError} from '../../../redux/actions/defaultActions';
import { getCustomers, addVehicleService, resetCustomerError, updateVehicle } from '../../../redux/actions/customerActions';
import {useSelector, useDispatch} from 'react-redux';


export default function VehicleDetails (props) {
    const dispatch = useDispatch()
    const [tempVehicle, setTempVehicle] = useState(null)
    const {
        vehicleVin, customerId
    } = props

    const {defaults} = useSelector(state => state.defaults)
    const {customerList, isCustomerSuccess} = useSelector(state => state.customers)

    useEffect(() => {
        if(!defaults){
            getDefaults()
        }

        if(customerList === null){
            dispatch(getCustomers());
        }
    },[defaults, dispatch, vehicleVin, customerId, customerList])

    const [currentVehicle, setCurrentVehicle] = useState({})
    const {serviceLogs} = currentVehicle;
    useEffect(() => {
        if(customerList === null){
            getCustomers();
        }

        if((customerList && customerId && vehicleVin) ||
            (customerList && customerId && vehicleVin && isCustomerSuccess)
        ){
            setCurrentVehicle(
                customerList
                    .find(c => c._id === customerId)
                    .vehicles.find(v => v.vin === vehicleVin)
            )
            dispatch(resetCustomerError())
        }
    },[customerList, customerId, vehicleVin, isCustomerSuccess, dispatch])

    const [isDisabled, setIsDisabled] = useState(true);

    const [selectedTrip, setSelectedTrip] = useState(null)

    const [openPopup, setOpenPopup] = useState(false)
    const handleClosePopup =()=> {
        setOpenPopup(false)
    }

    const handleVehicleChange = e => {
        const {name, value} = e.target;
        setCurrentVehicle({...currentVehicle, [name]: value})
    }

    const Years = () => {
        let _years = [];
        for(let i = 0; i < 20; i++){
            _years.push(new Date().getFullYear() - i);
        }
        return _years
    }

    const onEdit = () => {
        setTempVehicle(currentVehicle)
        setIsDisabled(false)
    }

    const onCancel = () => {
        setCurrentVehicle(tempVehicle)
        setIsDisabled(true)
    }

    const onUpdateVehicle = () => {
        dispatch(updateVehicle(currentVehicle, customerId))
        onCancel();
    }

    const handleAddNewService = newService => {
        handleClosePopup();
        dispatch(addVehicleService({
            customer: customerId,
            vin: vehicleVin,
            newService: {
                ...newService,
                date: new Date()
            }
        }))
    }
    return (
        <Fragment>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper sx={{p: 1}}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}md={10}>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <TextField 
                                            select disabled={isDisabled}
                                            value={currentVehicle.make || ''}label="Manufacturer"
                                            onChange={handleVehicleChange} name='make'>
                                            {defaults.manufacturers.map(make => (
                                                <MenuItem key={make._id} value={make._id}>{make.name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField 
                                            value={currentVehicle.model || ''} disabled={isDisabled}
                                            onChange={handleVehicleChange}
                                            select label="Model" name='model'>
                                            {defaults.models.filter(m => m.manufacturer === currentVehicle.make).map(model => (
                                                <MenuItem key={model._id} value={model._id}>{model.name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField 
                                            onChange={handleVehicleChange}
                                            name='year' value={currentVehicle.year  || ''}
                                            label="Year" select disabled={isDisabled}>
                                            {Years().map(year => (
                                                <MenuItem key={year} value={year}>{year}</MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField 
                                            name='mileage' value={currentVehicle.mileage || ''}
                                            label="Mileage" disabled={isDisabled}
                                            onChange={handleVehicleChange}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12} md={2}>
                                <Stack direction={'row'} spacing={1}>
                                    {isDisabled && <Button onClick={onEdit}>Edit Vehicle</Button> }
                                    {!isDisabled && <Button variant='outlined' onClick={onCancel}>Cancel</Button> }
                                    {!isDisabled && <Button onClick={onUpdateVehicle}>Save</Button> }
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Service Dates</TableCell>
                                    <TableCell align='right'>
                                        <Button 
                                            fullWidth={false} 
                                            onClick={() => setOpenPopup(true)}>
                                                New
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {serviceLogs && serviceLogs.map((log, i) => (
                                    <TableRow hover key={i}
                                        onClick={() => setSelectedTrip(log)}
                                        sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">
                                            {formatDate(log.date)}
                                        </TableCell>
                                        <TableCell>{log.serviceName}</TableCell>
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
                    onSave={handleAddNewService}/>
            </Popup>
        </Fragment>
    )
}


