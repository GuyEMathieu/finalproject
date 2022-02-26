import React from 'react';
import Table from '@mui/material/Table';
import TextField from '@mui/material/TextField'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FormatNumber } from '../../utils/Formatter';
import Loading from '../../components/Loading';


export default function FeesAndCredits(props) {

    if(!props.purchase && !props.defaults){
        return <Loading  />
    }
    return (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell align="right">Credits(-)</TableCell>
                        <TableCell align="right">Charges(+)</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">Vehicle Price</TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell/>
                        <TableCell align="right">{FormatNumber(props.purchase.sale.vehiclePrice)}</TableCell>
                    </TableRow>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">Dealer Fees</TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell/>
                        <TableCell align="right">{FormatNumber(props.purchase.sale.dealerFees)}</TableCell>
                    </TableRow>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"/>
                        <TableCell/>
                        
                        <TableCell align='right'>Subtotal</TableCell>
                        <TableCell/>
                        <TableCell align="right">{FormatNumber(props.purchase.sale.subtotal)}</TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"/>
                        <TableCell/>
                        
                        <TableCell align='right'>Taxes</TableCell>
                        <TableCell/>
                        <TableCell align="right">{FormatNumber(props.purchase.sale.taxes)}</TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"/>
                        <TableCell/>
                        
                        <TableCell align='right'>Grand Total</TableCell>
                        <TableCell/>
                        <TableCell align="right">{FormatNumber(props.purchase.sale.grandTotal)}</TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"/>
                        <TableCell/>
                        <TableCell align='right'>Down Payment</TableCell>
                        
                        <TableCell align="right" sx={{py: 0}}>
                            <TextField autoFocus fullWidth={false} name='downPayment' value={props.purchase.sale.downPayment} onChange={props.handleChange}/>
                        </TableCell>
                        <TableCell/>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"/>
                        <TableCell/>
                        
                        <TableCell align='right'>Balance</TableCell>
                        <TableCell/>
                        <TableCell align="right">{FormatNumber(props.purchase.sale.balance)}</TableCell>
                    </TableRow>


                </TableBody>
            </Table>
    );
}
