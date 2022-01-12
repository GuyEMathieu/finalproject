import React, {useState, useEffect, useContext} from 'react';
import {
    Grid, Button, ButtonGroup, Paper
} from '@mui/material'

//#region Context
import {DefaultContext} from '../../../context/default_context/DefaultState'
//#endRegion

//#region Components
import PeopleGlance from '../../../components/peopleComponents/PeopleGlance';
import Loading from '../../../components/Loading';
import AccordionShell from '../../../components/AccordionShell';
import PersonalInfo from '../../../components/peopleComponents/PersonalInfo'
import Address from '../../../components/Address'
//#endRegion

const CustomerProfile = (props) => {
    const {
        profile, profileDisabled,
        enableEdit, onSaveProfile
    } = props

    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const [isLoading, setLoading] = useState(true);
    const [currentProfile, setCurrentProfile] = useState({address: {}})

    useEffect(() => {

        if(defaults === null){
            getAll()
        }

        if(profile){
            setCurrentProfile(profile)
            setLoading(false)
        }
    },[defaults, getAll, profile])


    const [expanded, setExpanded] = useState('Personal Information');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
            <Grid container spacing={1}>
                <Grid item xs={4} sx={{display: {sx: 'none', lg: 'block'}}}>
                    {isLoading ? <Loading /> : <PeopleGlance profile={currentProfile} defaults={defaults} />}
                </Grid>

                <Grid xs={12} lg={8} item>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper sx={{display: 'flex', justifyContent: 'flex-end', py: 0.5}}>
                                <ButtonGroup variant="outlined" size='small'>
                                    <Button onClick={enableEdit}>Edit</Button>
                                    <Button onClick={onSaveProfile}>Save</Button>
                                </ButtonGroup>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <AccordionShell 
                                expanded={expanded}
                                title='Personal Information' handleChange={handleChange}>
                                {isLoading ? <Loading  /> : <PersonalInfo data={currentProfile} defaults={defaults} isDisabled={profileDisabled} />}
                            </AccordionShell>

                            <AccordionShell 
                                expanded={expanded}
                                title='Personal Address' handleChange={handleChange}>
                                {isLoading 
                                    ? <Loading  /> 
                                    : <Address address={currentProfile.address} 
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
