import React from 'react'
import {
    Grid, Paper, Stack, Typography
} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function VehicleDetails (props) {
    console.info(props.vehicle.serviceLogs)
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Stack spacing={1}>
                    <ServiceTable serviceLogs={props.vehicle.serviceLogs}/>

                </Stack>
            </Grid>
        </Grid>
    )
}



function ServiceTable(serviceLogs) {
    return (
        <TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Service Dates</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {serviceLogs.map((log) => (
                        <TableRow
                            
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {log.date}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

