import {
    Grid, Paper, TextField
} from '@mui/material';

import {getName, formatDate} from '../../utils/Formatter'

export default function EmployeeGlance({employee, defaults}) {

    return (
        <Paper>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='First Name' disabled value={employee.firstName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='Last Name' disabled value={employee.lastName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='Gender' disabled value={getName(defaults.genders, employee.gender)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='Date of Birth' disabled value={formatDate(employee.dateOfBirth)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='Phone' disabled value={employee.phone}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='Email' disabled value={employee.email}
                    />
                </Grid>
            </Grid>
            
        </Paper>
    )
}

