import {useState, useEffect, useContext} from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Switch } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';

import { DefaultContext } from '../context/default_context/DefaultState';

const GetSetting = () => {
    const defaultContext = useContext(DefaultContext);
    return defaultContext.Settings

}

export default function Settings(props) {
    const defaultContext = useContext(DefaultContext);
    const {settings, updateSettings} = defaultContext;

    const [currentSettings, setCurrentSettings] = useState(GetSetting())

    // useEffect(() => {
    //     console.info("changing")
    //     setCurrentSettings(settings)
    // }, [defaultContext])

    return (
        <FormGroup fullWidth>

            <LabelSwitch label={'Dark theme?'} checked={currentSettings.darkTheme}/>
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
