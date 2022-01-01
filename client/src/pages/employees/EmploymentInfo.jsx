import React from 'react';
import {
    TextField, MenuItem, Grid
} from '@mui/material'
import {DatePicker} from '@mui/lab'

const EmploymentInfo = ({defaults, employmentInfo, isDisabled, handleChange}) => {
    const {
        employeeNumber, department,
        startDate, position, salary
    } = employmentInfo;

    const handleDateChange =  date => {
        const e ={
            target: {
                name: 'startDate',
                value: date
            }
        }
        handleChange(e)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}md={4}>
                <TextField  
                    label='Employee#' name='employeeNumber'
                    value={employeeNumber} disabled/>
            </Grid>

            <Grid item md={8} sx={{xs:'none', md:'block'}}  />
            
            
            <Grid item xs={12} md={6}>
                <DatePicker
                    label="Date of Birth"
                    value={startDate} disabled={isDisabled}
                    onChange={(date) => handleDateChange(date)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>

            <Grid item xs={12}md={6}>
                <TextField  
                    label='Department' name='department'
                    value={department} disabled onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}md={6}>
                <TextField  
                    label='Position' name='position'
                    value={position} disabled onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}md={6}>
                <TextField  
                    label='Salary' name='salary'
                    value={salary} disabled onChange={handleChange}/>
            </Grid>
        
        </Grid>
    )
}

export default EmploymentInfo
