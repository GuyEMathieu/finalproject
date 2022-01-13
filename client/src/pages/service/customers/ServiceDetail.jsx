import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}


export default function ServiceDetail(selectedTrip) {
    const trip = selectedTrip.trip;

    // const [trip, setTrip] = useState({labor: {}, parts:[]})

    // useEffect(() => {
    //     setTrip(selectedTrip.trip)
    // }, [selectedTrip])

    const TAX_RATE = 0.07;

    const subtotal = () => {
        return trip.parts[0].cost + trip.labor.cost
    }

    const calculateTax = () => {
        return subtotal() * TAX_RATE
    }

    const calculateTotal = () => {
        return subtotal() + calculateTax()
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" colSpan={3}>Service Type: {trip.serviceName}</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Parts</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Unit</TableCell>
                        <TableCell />
                    </TableRow>
                    {trip.parts.map((part) => (
                        <TableRow key={part.partName}>
                            <TableCell>{part.partName}</TableCell>
                            <TableCell align="right">{part.quantity}</TableCell>
                            <TableCell align="right">{`$${ccyFormat(part.unit)}`}</TableCell>
                            <TableCell align="right">{`$${ccyFormat(part.cost)}`}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell/>
                        <TableCell align="right">Labor</TableCell>
                        <TableCell align="right">Duration</TableCell>
                        <TableCell  />
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell align="right">${ccyFormat(trip.labor.laborRate)}/hr</TableCell>
                        <TableCell align="right">{trip.labor.duration}hr</TableCell>
                        <TableCell align="right">${ccyFormat(trip.labor.cost)}</TableCell>
                    </TableRow>

                <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">${subtotal()}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{`Tax (${(TAX_RATE * 100).toFixed(0)}%)`}</TableCell>
                    <TableCell  />
                    <TableCell align="right">${ccyFormat(calculateTax())}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">${ccyFormat(calculateTotal())}</TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
