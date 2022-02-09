import React, {useState, useEffect} from 'react';
import {
    TextField, MenuItem, Grid
} from '@mui/material'
import {DatePicker} from '@mui/lab'
import {FormatNumber} from '../../utils/Formatter';
import Loading from '../../components/Loading'

const EmploymentInfo = ({defaults, employmentInfo, isDisabled, handleChange}) => {

    const handleDateChange =  date => {
        const e ={
            target: {
                name: 'startDate',
                value: date
            }
        }
        handleChange(e)
    }

    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        if(employmentInfo && defaults){
            setLoading(false)
        }
    }, [employmentInfo, defaults])

    if(isLoading){
        return <Loading  />
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}md={4}>
                <TextField  
                    label='Employee#' name='employeeNumber'
                    value={employmentInfo.employeeNumber || ''} disabled/>
            </Grid>

            <Grid item md={8} sx={{xs:'none', md:'block'}}  />
            
            
            <Grid item xs={12} md={6}>
                <DatePicker
                    label="Start Date"
                    value={employmentInfo.startDate} disabled={isDisabled}
                    onChange={(date) => handleDateChange(date)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>

            <Grid item xs={12}md={6}>
                <TextField  
                    disabled={isDisabled}
                    label='Salary' name='salary'
                    value={FormatNumber(employmentInfo.salary)} 
                    onChange={handleChange}/>
            </Grid>

            <Grid item xs={12}md={6}>
                <TextField  
                    disabled={isDisabled}
                    label='Department' name='department' select
                    value={employmentInfo.department} onChange={handleChange}>
                    <MenuItem disabled >Select Department</MenuItem>
                    {defaults && defaults.departments.map(dept => (
                        <MenuItem key={dept._id} value={dept._id}>{dept.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}md={6}>
                <TextField  
                    select
                    label='Position' name='position' disabled={isDisabled}
                    value={employmentInfo.position} onChange={handleChange}>
                    <MenuItem disabled >Select Position</MenuItem>
                    {defaults && defaults.positions.filter(pos => pos.department === employmentInfo.department).map(pos => (
                        <MenuItem key={pos._id} value={pos._id}>{pos.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            
        
        </Grid>
    )
}

export default EmploymentInfo
