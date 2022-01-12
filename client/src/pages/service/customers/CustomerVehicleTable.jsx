import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableRow, TablePagination,
    TableContainer, TableHead, Paper, TableFooter
} from '@mui/material';

import { getName, maskString } from '../../../utils/Formatter';
// Components
import TablePaginationActions from '../../../components/PaginationActions';

export default function CustomerVehicleTable(props) {

    const { vehicles, handleSelection, defaults} = props;
    const [ availableVehicles, setAvailableVehicles] = useState([])

    useEffect(() => {
        if (vehicles) {
            setAvailableVehicles(vehicles)
        }
    }, [vehicles])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, availableVehicles.length - page * rowsPerPage);

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
                        <TableCell align='left'>Make</TableCell>
                        <TableCell align='left'>Model</TableCell>
                        <TableCell align='left'>Year</TableCell>
                        <TableCell align='left'>VIN</TableCell>
                    </TableRow>
                    </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? availableVehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : availableVehicles
                    ).map((vehicle, i) =>(
                        <TableRow key={vehicle._id} hover onClick={() => handleSelection(vehicle)}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{getName(defaults.manufacturers, vehicle.make)}</TableCell>
                            <TableCell>{getName(defaults.models, vehicle.model)}</TableCell>
                            <TableCell>{vehicle.year}</TableCell>
                            <TableCell>{maskString(vehicle.vin, 4)}</TableCell>
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
                            count={availableVehicles.length}
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
