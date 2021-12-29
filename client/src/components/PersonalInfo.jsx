import React, {useContext, useEffect} from 'react';
import {
    Grid, TextField, MenuItem
} from '@mui/material';
import Loading from './Loading';

export default function PersonalInfo(props) {
    // useEffect(() => {
    //     if(defaults === null){
    //         getAll()
    //     }
    // }, [defaults, getAll])
    const {
        data = {}, 
        isDisabled = true,
        handleChange
    } = props
    const {
        firstName, lastName, middleName, dateOfBirth, 
        gender
    } = data

    

    const handleDateChange = date => {
        const e = {
            target:{
                name: 'dateOfBirth', value: date
            }
        }
        handleChange(e)
    }

    if(data === null){
        return <Loading  />
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
                <TextField
                    label='First Name' name='firstName' disabled={isDisabled}
                    value={firstName} onChange={handleChange}/>
            </Grid>

        </Grid>
    )
}



