import {
    Grid, Paper, TextField, Skeleton, Typography
} from '@mui/material';

import {getName, formatDate} from '../../utils/Formatter'

export default function PeopleGlance({profile , defaults}) {

    const animation = 'wave';

    return (
        <Paper>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography align='center'>Quick Glance</Typography>
                </Grid>
                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                                variant='standard'
                                label='First Name' disabled value={profile.firstName}
                            />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>

                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                                variant='standard'
                                label='Last Name' disabled value={profile.lastName}
                        />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>

                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                                variant='standard'
                                label='Gender' disabled value={getName(defaults.genders, profile.gender)}
                            />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>

                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                                variant='standard'
                                label='Date of Birth' disabled value={formatDate(profile.dateOfBirth)}
                            />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>

                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                                variant='standard'
                                label='Phone' disabled value={profile.phone}
                            />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>

                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                            variant='standard'
                            label='Email' disabled value={profile.email}
                        />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}