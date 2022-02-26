import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableRow, TablePagination,
    TableContainer, TableHead, Paper, TableFooter, Button
} from '@mui/material';

import NewVehicle from '../../../components/NewVehicle'
import SidebarSlidePopup from '../../../components/SidebarSlidePopup'
import {getName} from '../../../utils/Formatter'

import { generateVIN } from '../../../utils/Formatter';

import { maskString } from '../../../utils/Formatter';
// Components
import TablePaginationActions from '../../../components/PaginationActions';

import { useSelector, useDispatch } from 'react-redux';
import { getDefaults } from '../../../redux/actions/defaultActions';
import { addNewVehicle } from '../../../redux/actions/customerActions';

export default function CustomerVehicleTable(props) {
    const dispatch = useDispatch()
    const {defaults} = useSelector(state => state.defaults)

    const { profile, handleSelection} = props;
    const [ availableVehicles, setAvailableVehicles] = useState([])

    useEffect(() => {
        if(!defaults){
            dispatch(getDefaults())
        }
    },[defaults, dispatch])

    useEffect(() => {
        if (profile !== null) {
            setAvailableVehicles(profile.vehicles)
        }
    }, [profile])

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

    const [openNewVehiclePopup, setOpenNewVehiclePopup] = useState(false);
    const [newVehicle, setNewVehicle] = useState({})

    const onOpenNewVehicle = () =>{
        setNewVehicle({...blankVehicle, vin: generateVIN()})
        setOpenNewVehiclePopup(true)
    }
    const handleCloseNewVehiclePopup = () => {
        setOpenNewVehiclePopup(false)
        setNewVehicle({})
    }
    const onAddNewVehicle = () => {
        const {year, vin, make, miles} = newVehicle;
        if(vin && year && make && miles){
            
            dispatch(addNewVehicle(profile._id, newVehicle))
            handleCloseNewVehiclePopup();
        }
    }
    
    const handleNewVehicleChange = e =>{
        const {name, value} = e.target;
        setNewVehicle({...newVehicle, [name]: value})
    }

    const displayNewVehicle = () =>{
        return openNewVehiclePopup 
            ? <NewVehicle 
                vehicle={newVehicle}
                handleVehicleChange={handleNewVehicleChange}
                onClose={handleCloseNewVehiclePopup} 
                addNewVehicle={onAddNewVehicle}/>
            : null
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
                            <Button fullWidth={false} onClick={onOpenNewVehicle}>New Vehicle</Button>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? availableVehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : availableVehicles
                    ).map((vehicle, i) => (
                        <TableRow key={i} hover onClick={() => handleSelection(vehicle)}>
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
            
            <SidebarSlidePopup open={openNewVehiclePopup}>
                {displayNewVehicle()}
            </SidebarSlidePopup>
        </TableContainer>
    );
}

const blankVehicle = {
    year: '',
    make: '',
    model: '',
    miles: ''
}


