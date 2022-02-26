import React, {useState, useEffect} from 'react';
import {
    Grid, TextField, MenuItem, 
} from '@mui/material'
import Loading from './Loading'

const DriverLicense = ({driverLicense, handleChange, isDisabled, defaults}) => {

    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        if(driverLicense && defaults){
            setLoading(false)
        }
    }, [driverLicense, defaults])

    if(isLoading){
        return <Loading  />
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField
                    disabled={isDisabled}
                    label="DL State" name='dlState' select
                    value={driverLicense.dlState || ''} onChange={handleChange}>
                        <MenuItem disabled>Select DL State</MenuItem>
                        {defaults && defaults.states.map(state => (
                            <MenuItem key={state._id} value={state._id}>{state.name}</MenuItem>
                        ))}
                </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    disabled={isDisabled}
                    label="DL Number" name='dlNumber' 
                    value={driverLicense.dlNumber} onChange={handleChange}/>
            </Grid>
        </Grid>
        
    )
}

export default DriverLicense
