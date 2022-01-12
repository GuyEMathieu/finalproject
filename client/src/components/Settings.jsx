import {useState, useEffect, useContext} from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Switch } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';


export default function Settings(props) {

    return (
        <FormGroup fullWidth>

            <LabelSwitch label={'Dark theme?'} checked={props.settings.darkTheme}/>
        </FormGroup>
    );
}


function LabelSwitch(props){

    return (
        <Box sx={{display: 'flex'}}>
            <Typography sx={{flexGrow: 1}}>{props.label}</Typography>
            <Switch name={props.label} checked={props.checked}/>
        </Box>
    )
}
