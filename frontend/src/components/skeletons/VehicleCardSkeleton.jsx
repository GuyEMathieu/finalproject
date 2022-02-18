import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

export default function VehicleCardSkeleton({wave = 'wave'}) {
    return (
        <Paper spacing={1} sx={{height: '400px'}} >
            <Skeleton variant="rectangular" 
                animation={wave}
                width={'100%'} height={'70%'} 
            />
            <Skeleton variant="text" animation={wave}/>
            <Skeleton variant="text" animation={wave}/>
            <Skeleton variant="text" animation={wave}/>
            <Stack spacing={2} direction={'row'} sx={{height: '10%'}}>
                <Skeleton variant="rectangular" 
                    animation={wave}
                    sx={{height: '100%', width: '50%'}}/>
                <Skeleton variant="rectangular" 
                    animation={wave}
                    sx={{height: '100%', width: '50%'}} />
            </Stack>
        </Paper>
    );
}
