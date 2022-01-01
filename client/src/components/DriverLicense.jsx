import React from 'react';
import {
    Grid, TextField, MenuItem
} from '@mui/material'

const DriverLicense = ({data, handleChange, isDisabled, defaults}) => {
    const {
        dlState, dlNumber
    } = data
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField
                    disabled={isDisabled}
                    label="DL State" name='dlState' select
                    value={dlState || ''} onChange={handleChange}>
                        <MenuItem disabled>Select DL State</MenuItem>
                        {defaults.states.map(state => (
                            <MenuItem key={state._id} value={state._id}>{state.name}</MenuItem>
                        ))}
                    </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    disabled={isDisabled}
                    label="DL Number" name='dlNumber' 
                    value={dlNumber} onChange={handleChange}/>
            </Grid>
            
        </Grid>
    )
}

export default DriverLicense
