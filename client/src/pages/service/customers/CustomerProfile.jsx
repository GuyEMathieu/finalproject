import React, {useState, useEffect} from 'react';
import {
    Grid, Button, ButtonGroup, Paper
} from '@mui/material'

//#region Context
import { getDefaults } from '../../../redux/actions/defaultActions';
//#endRegion

//#region Components
import PeopleGlance from '../../../components/peopleComponents/PeopleGlance';
import Loading from '../../../components/Loading';
import AccordionShell from '../../../components/AccordionShell';
import PersonalInfo from '../../../components/peopleComponents/PersonalInfo'
import Address from '../../../components/Address'
import { useDispatch, useSelector } from 'react-redux';
//#endRegion


const CustomerProfile = (props) => {
    const {
        profile, profileDisabled,
        enableEdit, onSaveProfile, 
        cancelEdit, handleProfileChange
    } = props

    const dispatch = useDispatch()

    const {defaults} = useSelector(state => state.defaults)
    const [isLoading, setLoading] = useState(true);
    const [currentProfile, setCurrentProfile] = useState({address: {}})

    useEffect(() => {

        if(defaults === null){
            dispatch(getDefaults())
        }

        if(profile){
            setCurrentProfile(profile)
            setLoading(false)
        }
    },[defaults, profile, dispatch, profileDisabled])

    const [expanded, setExpanded] = useState('Personal Information');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={4} sx={{display: {sx: 'none', lg: 'block'}}}>
                <PeopleGlance profile={currentProfile} defaults={defaults} />
            </Grid>

            <Grid xs item>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper sx={{display: 'flex', justifyContent: 'flex-end', py: 0.5}}>
                            <ButtonGroup variant="outlined" size='small'>
                                {!profileDisabled 
                                    ? <Button onClick={cancelEdit}>Cancel</Button>
                                    : <Button onClick={enableEdit}>Edit</Button>
                                }
                                {!profileDisabled ? <Button variant='contained' onClick={onSaveProfile}>Save</Button> : null}
                            </ButtonGroup>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <AccordionShell 
                            expanded={expanded}
                            title='Personal Information' handleChange={handleChange}>
                            <PersonalInfo 
                                data={currentProfile} handleChange={handleProfileChange}
                                defaults={defaults} isDisabled={profileDisabled} />
                        </AccordionShell>

                        <AccordionShell 
                            expanded={expanded}
                            title='Personal Address' handleChange={handleChange}>
                            {isLoading 
                                ? <Loading  /> 
                                : <Address 
                                    handleChange={handleProfileChange}
                                    address={currentProfile.address} 
                                    defaults={defaults} isDisabled={profileDisabled}/> 
                            }
                        </AccordionShell>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CustomerProfile
