import React from 'react';
import {
    TextField, MenuItem, Grid
} from '@mui/material'
import {DatePicker} from '@mui/lab'
import {FormatNumber} from '../../utils/Formatter';

const EmploymentInfo = ({defaults, employmentInfo, isDisabled, handleChange}) => {
    const {
        employeeNumber, department,
        startDate, position, salary,
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
                    label="Start Date"
                    value={startDate} disabled={isDisabled}
                    onChange={(date) => handleDateChange(date)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>

            <Grid item xs={12}md={6}>
                <TextField  
                    disabled={isDisabled}
                    label='Salary' name='salary'
                    value={FormatNumber(salary)} 
                    onChange={handleChange}/>
            </Grid>

            <Grid item xs={12}md={6}>
                <TextField  
                    disabled={isDisabled}
                    label='Department' name='department' select
                    value={department} onChange={handleChange}>
                    <MenuItem disabled >Select Department</MenuItem>
                    {defaults.departments.map(dept => (
                        <MenuItem key={dept._id} value={dept._id}>{dept.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}md={6}>
                <TextField  
                    select
                    label='Position' name='position' disabled={isDisabled}
                    value={position} onChange={handleChange}>
                    <MenuItem disabled >Select Position</MenuItem>
                    {defaults.positions.filter(pos => pos.department === department).map(pos => (
                        <MenuItem key={pos._id} value={pos._id}>{pos.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            
        
        </Grid>
    )
}

export default EmploymentInfo
