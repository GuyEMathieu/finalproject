import React, {useState, useEffect} from 'react';
import {
    Grid, TextField, MenuItem, Stack, Button
} from '@mui/material'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loading from '../../../components/Loading'

import { SERVICES } from '../../../context/shared/services';
import ServiceDetail from './ServiceDetail';

const NewServiceTrip = () => {
    const [service, setService] = useState(null)
    const [selectedTrip, setSelectedTrip] = useState({

            date: new Date(),
            serviceName: '',
            parts: [],
            labor: {}
    })

    const handleSelectedTrip = e => {
        const {value} = e.target
        setSelectedTrip(value)
        setService({
            serviceName: value.serviceName,
            labor: value.labor
        })
    }

    const [newPart, setNewPart] = useState({})
    const {partName, quantity} = newPart;

    const handleNewPart = e => {
        const {name, value} = e.target;
        if(name === 'partName'){
            setNewPart(value)
        } else {
            setNewPart(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }
    }
    

    const AddNewPart = () => {
        console.info("new part", newPart)
        
        setService(prev => {
            return {
                ...prev,
                parts: [...prev.parts || [], newPart]
            }
        })

        // setNewPart({
        //     partName: ''
        // })        
    }

    console.info(newPart)
    
    return (
        <Grid container spacing={2} sx={{width: '80vw'}}>

            <Grid item xs={12} lg={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                            name='serviceName' onChange={handleSelectedTrip}
                            label='Service Type' select>
                                <MenuItem value={null}> --none-- </MenuItem>
                                {SERVICES.map(service => (
                                    <MenuItem key={service.serviceName} value={service}>{service.serviceName}</MenuItem>
                                ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                    {selectedTrip &&
                        <Grid container spacing={2}>
                            <Grid item xs={5} >
                                <TextField 
                                    name='partName' 
                                    onChange={handleNewPart}
                                    label='Part' select >
                                        <MenuItem value={null}> --none-- </MenuItem>
                                        {selectedTrip.parts.map(part => (
                                            <MenuItem key={part.partName} value={part}>{part.partName}</MenuItem>
                                        ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={5}>
                                <TextField 
                                    name='quantity' onChange={handleNewPart}
                                    label='Quantity' select value={newPart.quantity || ''}>
                                        <MenuItem value={null}> --none-- </MenuItem>
                                        {[1,2,3,4,5].map(quantity => (
                                            <MenuItem key={quantity} value={quantity}>{quantity}</MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Button size={'size'} onClick={AddNewPart}>Add</Button>
                            </Grid>
                        </Grid>
                    } 

                    </Grid>


                </Grid>
            </Grid>

            <Grid item xs={12} lg={6}>
                {service ? <BasicTable service={service} /> : <Loading /> }
            </Grid>
        </Grid>
    )
}





function BasicTable(props) {
    const {service} = props;
    const [trip, setTrip] = useState({parts: []})

    useEffect(() => {
        setTrip(service)
    },[service])
    const {
        serviceName, 
        parts, labor
    } = trip;

    console.info("Trip", trip)
    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow >
                    <TableCell colSpan={4} align='left'>Service Type:    {serviceName}</TableCell>
                </TableRow>
                
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell align='left'>Desc</TableCell>
                    <TableCell align='left'>Quantity</TableCell>
                    <TableCell align='left'>Unit</TableCell>
                    <TableCell align='right'>Cost</TableCell>
                </TableRow>
                {labor && 
                    <TableRow >
                        <TableCell align='left'>Labor</TableCell>
                        <TableCell align='left'>{labor.duration}</TableCell>
                        <TableCell align='left'>{labor.laborRate}/hr</TableCell>
                        <TableCell align='right'>{labor.laborRate * labor.duration}</TableCell>
                        {/* <TableCell align='left'>{part.unit}</TableCell>
                        <TableCell align='right'>{part.quantity * part.unit}</TableCell> */}
                    </TableRow>
                }
                {parts && parts.map(part => (
                    <TableRow key={part.partName}>
                        <TableCell align='left'>{part.partName}</TableCell>
                        <TableCell align='left'>{part.quantity}</TableCell>
                        <TableCell align='left'>{part.unit}</TableCell>
                        <TableCell align='right'>{part.quantity * part.unit}</TableCell>
                    </TableRow>
                ))}
                
                

            </TableBody>
        </Table>
    );
}


export default NewServiceTrip
