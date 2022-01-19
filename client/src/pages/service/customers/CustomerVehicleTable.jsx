import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableRow, TablePagination,
    TableContainer, TableHead, Paper, TableFooter, Button
} from '@mui/material';

import NewVehicle from '../../../components/NewVehicle'

import Popup from '../../../components/Popup'

import { getName, maskString } from '../../../utils/Formatter';
// Components
import TablePaginationActions from '../../../components/PaginationActions';

export default function CustomerVehicleTable(props) {

    const { vehicles, handleSelection, defaults, } = props;
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

    const [openPopup, setOpenPopup] = useState(false)

    const handleClosePopup = () =>{
        setOpenPopup(false)
    }
    const addNewVehicle = vehicle => {
        props.addNewVehicle(vehicle)
        setOpenPopup(true)
    }

    
    
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
                        <TableCell align='right'>
                            <Button fullWidth={false} onClick={() => {setOpenPopup(true)}}>New Vehicle</Button>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? availableVehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : availableVehicles
                    ).map((vehicle, i) =>(
                        <TableRow key={vehicle.vin} hover onClick={() => handleSelection(vehicle)}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{getName(defaults.manufacturers, vehicle.make)}</TableCell>
                            <TableCell>{getName(defaults.models, vehicle.model)}</TableCell>
                            <TableCell>{vehicle.year}</TableCell>
                            <TableCell>{maskString(vehicle.vin, 4)}</TableCell>
                            <TableCell/>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={6}
                            count={availableVehicles.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
            <Popup open={openPopup} title={'New Vehicle'} showClose={false}>
                <NewVehicle  onClose={handleClosePopup} addNewVehicle={addNewVehicle}/>
            </Popup>
        </TableContainer>
    );
}


