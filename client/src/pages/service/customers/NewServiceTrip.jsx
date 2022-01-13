import React, {useState} from 'react';
import {
    Grid, TextField, MenuItem, Stack, Box
} from '@mui/material'
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

    const handleChange = e => {
        const {name, value} = e.target;
        setSelectedTrip(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

        if(name === 'serviceName'){
            setService(SERVICES.find(s => s.serviceName === value))
        }
    }
    console.info("new trip", service)
    const [newPart, setNewPart] = useState({})
    const changeNewPart = e => {
        const {name, value} = e.target
        if(name === 'partName'){
            setNewPart(prev =>{
                return {
                    ...prev,
                    [name]: value,
                    //unit: SERVICES.parts.find(p => p.partName === name).unit
                }
            })
        } else {
            setNewPart(prev =>{
                return {
                    ...prev,
                    [name]: value,
                }
            })
        }
    }
    console.info("new part", newPart)
    return (
        <Grid container spacing={2} sx={{width: '60vw'}}>
            <Grid item xs={12} lg={6}>
                <Stack spacing={2}>
                    <TextField 
                        name='serviceName' onChange={handleChange}
                        label='Service Type' select>
                            <MenuItem value={null}> --none-- </MenuItem>
                            {SERVICES.map(service => (
                                <MenuItem key={service.serviceName} value={service.serviceName}>{service.serviceName}</MenuItem>
                            ))}
                    </TextField>

                    <Stack direction='row' spacing={2}>
                        <TextField 
                            name='partName' onChange={changeNewPart}
                            label='Part' select >
                                <MenuItem value={null}> --none-- </MenuItem>
                                {service.parts.map(part => (
                                    <MenuItem key={part.partName} value={part.partName}>{part.partName}</MenuItem>
                                ))}
                        </TextField>
                        <TextField 
                            name='unit' onChange={changeNewPart}
                            label='Quantity' select >
                                <MenuItem value={null}> --none-- </MenuItem>
                                {[1,2,3,4,5].map(part => (
                                    <MenuItem key={part} value={part}>{part}</MenuItem>
                                ))}
                        </TextField>
                    </Stack>
                </Stack>

            </Grid>

            <Grid item xs={12} lg={6}>
                {/* <ServiceDetail selectedTrip={selectedTrip}  /> */}
            </Grid>
            
        </Grid>
    )
}

export default NewServiceTrip
