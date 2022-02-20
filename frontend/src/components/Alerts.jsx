import {useEffect, useState} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function Alerts({alerts}) {

    const [localAlerts, setLocalAlerts] = useState(null)
    useEffect(() => {
        if(alerts) alert(JSON.stringify(alerts))
        if(alerts) setLocalAlerts(alerts)
    },[alerts])

    const removeAlert = (id) =>{
        const remaining = alerts.filter( a => a._id !== id);
        setLocalAlerts(remaining.length > 0 ? remaining : null)
    }

    return (
        <Stack sx={{ width: '100%' }} spacing={1}>
            {localAlerts && localAlerts.map(alert => (
                <Alert 
                    severity={alert.severity}
                    onClose={() => removeAlert(alert._id)}
                    >
                    {alert.msg}
                </Alert>
            ))}
        </Stack>
    );
}