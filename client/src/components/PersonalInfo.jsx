import React from 'react';
import {
    Grid, TextField, MenuItem
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import { formatPhone } from '../utils/Formatter';
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
        handleChange, defaults
    } = props
    const {
        firstName, lastName, middleName, dateOfBirth, 
        gender, phone, ssn, email
    } = data

    const handleDateChange = date => {
        const e = {
            target:{
                name: 'dateOfBirth', value: date
            }
        }
        handleChange(e)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
                <TextField
                    error={!isDisabled && firstName.length === 0}
                    helperText={!isDisabled && firstName.length === 0 ? 'Required': ''}
                    label='First Name' name='firstName' disabled={isDisabled}
                    value={firstName} onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    label='M.I.' name='middleName' disabled={isDisabled}
                    value={middleName} onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} md={5}>
                <TextField
                    error={!isDisabled && lastName.length === 0 ? true : false}
                    helperText={!isDisabled && lastName.length === 0 ? 'Required' : ''}
                    label='Last Name' name='lastName' disabled={isDisabled}
                    value={lastName} onChange={handleChange}/>
            </Grid>
            
            <Grid item xs={12} md={4}>
                <TextField
                    label='SSN' name='ssn' disabled={isDisabled}
                    value={ssn} onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} md={4}>
                <DatePicker
                    
                    label="Date of Birth"
                    value={dateOfBirth} disabled={isDisabled}
                    onChange={(date) => handleDateChange(date)}
                    renderInput={(params) => <TextField  {...params} />}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    error={!isDisabled && gender.length === 0 ? true : false}
                    helperText={!isDisabled && gender.length === 0 ? 'Required' : ''}
                    label='Gender' name='gender' disabled={isDisabled}
                    value={gender || ''} onChange={handleChange} select>
                    {defaults && defaults.genders.map(g => (
                        <MenuItem key={g._id} value={g._id}>{g.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    error={!isDisabled && phone.length === 0 ? true : false}
                    helperText={!isDisabled && phone.length === 0 ? 'Required' : ''}
                    label='Phone' name='phone' disabled={isDisabled}
                    value={formatPhone(phone)} onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    error={!isDisabled && email.length === 0 ? true : false}
                    helperText={!isDisabled && email.length === 0 ? 'Required' : ''}
                    label='Email' name='email' disabled={isDisabled}
                    value={email} onChange={handleChange}/>
            </Grid>
            

        </Grid>
    )
}



