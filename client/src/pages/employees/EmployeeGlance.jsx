import {useContext, useEffect} from 'react';
import {
    Grid, Paper, TextField
} from '@mui/material';
import Loading from '../../components/Loading';
import {DefaultContext} from '../../context/default_context/DefaultState';

import {getName, formatDate} from '../../utils/Formatter'

export default function EmployeeGlance({employee}) {
    const defaultContext = useContext(DefaultContext);
    const {
        defaults, getAll
    } = defaultContext;

    useEffect(() => {
        if(!defaults){
            getAll()
        }
    }, [defaults, getAll])


    return (
        <Paper>
            { !employee 
                ? <Loading  />

                : <Grid container spacing={2}>
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
            }
        </Paper>
    )
}

