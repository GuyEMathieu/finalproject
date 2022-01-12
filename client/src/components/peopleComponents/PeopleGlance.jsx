import {
    Grid, Paper, TextField
} from '@mui/material';

import {getName, formatDate} from '../../utils/Formatter'

export default function PeopleGlance({profile, defaults}) {

    return (
        <Paper>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='First Name' disabled value={profile.firstName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='Last Name' disabled value={profile.lastName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='Gender' disabled value={getName(defaults.genders, profile.gender)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='Date of Birth' disabled value={formatDate(profile.dateOfBirth)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='Phone' disabled value={profile.phone}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant='standard'
                        label='Email' disabled value={profile.email}
                    />
                </Grid>
            </Grid>
            
        </Paper>
    )
}

