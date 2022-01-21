import {useState, useEffect} from 'react';

import {
    Box, Table, TableBody, TableCell,
    TableHead, TableContainer, TableFooter, 
    TableRow, Paper, TablePagination
} from '@mui/material';


import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import employeeReducer from '../../context/employee_context/employeeReducer';

import PaginationActions from '../../components/PaginationActions'






export default function TeamTable({team, handleSelection}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentTeam, setCurrentTeam] = useState([])
    useEffect(() => {
        if(team){
            setCurrentTeam(team)
        }
    })

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - team.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>#</TableCell>
                        <TableCell align='left'>First Name</TableCell>
                        <TableCell align='left'>Last Name</TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>
                    {currentTeam && (rowsPerPage > 0
                        ? currentTeam.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : currentTeam
                    ).map((employee, i) => (
                        <TableRow key={employee._id} onClick={() => handleSelection(employee)}>
                            <TableCell component="th" scope="row">
                                {i + 1}
                            </TableCell>
                            <TableCell align='left'>
                                {employee.firstName}
                            </TableCell>
                            <TableCell align="left">
                                {employee.lastName}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={3} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={currentTeam.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                            'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={PaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
