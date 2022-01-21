import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableRow, TablePagination,
    TableContainer, TableHead, Paper, TableFooter
} from '@mui/material';

// Components
import TablePaginationActions from '../../components/PaginationActions';

export default function EmployeeTable(props) {

    const { employees, handleSelection, } = props;
    const [ availableEmployees, setAvailableEmployees] = useState([])

    useEffect(() => {
        if (employees) {
            setAvailableEmployees(employees)
        }
    }, [employees])

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
                        <TableCell align='left'>First Name</TableCell>
                        <TableCell align='left'>Last Name</TableCell>
                        <TableCell align='left'>Emp #</TableCell>
                        {/* <TableCell align='right'>Actions</TableCell> */}
                    </TableRow>
                    </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? availableEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : availableEmployees
                    ).map((employee, i) =>(
                        <TableRow key={employee._id} hover onClick={() => handleSelection(employee)}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{employee.firstName}</TableCell>
                            <TableCell>{employee.lastName}</TableCell>
                            <TableCell>{employee.employmentInfo.employeeNumber}</TableCell>
                            {/* <TableCell align='right'>
                                <ForwardIcon
                                    style={{cursor: 'pointer'}}
                                    onClick={e => navigateToEmployee(employee._id)} />
                            </TableCell> */}
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
