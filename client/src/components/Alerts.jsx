import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function Alerts(props) {

    const {alerts, 
        removeAlert = () => {}
    } = props;

    return (
        <Stack sx={{ width: '100%' }} spacing={1}>
            {alerts.map(alert => (
                <Alert 
                    severity={alert.severity}
                    onClose={() => removeAlert(alert._id)}>
                    {alert.msg}
                </Alert>
            ))}
        </Stack>
    );
}