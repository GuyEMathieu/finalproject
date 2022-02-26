import {useState, useEffect} from 'react'
import {
    Grid, Paper, TextField, Skeleton, Typography
} from '@mui/material';

import {getName, formatDate} from '../../utils/Formatter'

export default function PeopleGlance({profile , defaults}) {

    const animation = 'wave';

    const [currentProfile, setCurrentProfile] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        dateOfBirth: '',
        email: ''
    })


    useEffect(() => {
        if(profile) setCurrentProfile(profile)
    },[profile])

    const {
        firstName, lastName, gender, phone, email, dateOfBirth
    } = currentProfile

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
                                label='First Name' disabled value={firstName}
                            />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>

                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                                variant='standard'
                                label='Last Name' disabled value={lastName}
                        />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>

                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                                variant='standard'
                                label='Gender' disabled value={getName(defaults.genders, gender)}
                            />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>

                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                                variant='standard'
                                label='Date of Birth' disabled value={formatDate(dateOfBirth)}
                            />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>

                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                                variant='standard'
                                label='Phone' disabled value={phone}
                            />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>

                <Grid item xs={6}>
                    {(profile && defaults) 
                        ?   <TextField
                            variant='standard'
                            label='Email' disabled value={email}
                        />
                        :   <Skeleton variant="text" animation={animation}/>
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}