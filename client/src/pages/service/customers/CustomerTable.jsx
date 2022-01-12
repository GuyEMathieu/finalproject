import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableRow, TablePagination,
    TableContainer, TableHead, Paper, TableFooter
} from '@mui/material';
import {formatDate} from '../../../utils/Formatter'


// Components
import TablePaginationActions from '../../../components/PaginationActions';

export default function CustomerTable(props) {

    const { customers, handleSelection, } = props;
    const [ availableCustomers, setAvailableCustomers] = useState([])

    useEffect(() => {
        if (customers) {
            setAvailableCustomers(customers)
        }
    }, [customers])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, availableCustomers.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align='left'>First Name</TableCell>
                        <TableCell align='left'>Last Name</TableCell>
                        <TableCell align='left'>Date of Birth</TableCell>
                        {/* <TableCell align='right'>Actions</TableCell> */}
                    </TableRow>
                    </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? availableCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : availableCustomers
                    ).map((customer, i) =>(
                        <TableRow key={customer._id} hover onClick={() => handleSelection(customer)}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{customer.firstName}</TableCell>
                            <TableCell>{customer.lastName}</TableCell>
                            <TableCell>{formatDate(customer.dateOfBirth)}</TableCell>

                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow>
                            <TableCell colSpan={5} />
                        </TableRow>
                    )}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={5}
                            count={availableCustomers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
