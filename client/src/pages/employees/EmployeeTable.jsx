import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableRow, TablePagination,
    TableContainer, TableHead, Paper, TableFooter
} from '@mui/material';
import {useDefault} from '../../hooks/customHooks';

import { getName } from '../../utils/Formatter';

// Components
import TablePaginationActions from '../../components/PaginationActions';

export default function EmployeeTable(props) {
    const {defaults, getAll} = useDefault();

    const { employees, handleSelection, } = props;
    const [ availableEmployees, setAvailableEmployees] = useState([])

    useEffect(() => {
        if (employees) {
            setAvailableEmployees(employees)
        }

        if(defaults === null){
            getAll()
        }
    }, [employees, defaults, getAll])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, availableEmployees.length - page * rowsPerPage);

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
                        <TableCell align='center'>First Name</TableCell>
                        <TableCell align='center'>Last Name</TableCell>
                        <TableCell align='center'>Emp #</TableCell>
                        <TableCell align='center'>Position</TableCell>
                    </TableRow>
                    </TableHead>
                <TableBody>
                    {((availableEmployees && defaults) && rowsPerPage > 0
                        ? availableEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : availableEmployees
                    ).map((employee, i) =>(
                        <TableRow key={employee._id} hover onClick={() => handleSelection(employee)}>
                            <TableCell align='center'>{i + 1}</TableCell>
                            <TableCell align='center'>{employee.firstName}</TableCell>
                            <TableCell align='center'>{employee.lastName}</TableCell>
                            <TableCell align='center'>{employee.employmentInfo.employeeNumber}</TableCell>
                            {/* <TableCell align='center'>{getName(defaults.positions, employee.employmentInfo.position)}</TableCell> */}
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
                            count={availableEmployees.length}
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
        </TableContainer>
    );
}
