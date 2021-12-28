import React from 'react';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Alerts(props) {
    const classes = useStyles();

    const {alerts, removeAlert} = props;

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            {alerts.map(alert => (
                <Alert 
                    onClose={() => removeAlert(alert._id)} 
                    severity={alert.severity}>
                        {alert.msg}
                </Alert>
            ))}
        </Stack>
    );
}