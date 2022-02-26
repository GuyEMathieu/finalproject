import {
    Paper, TableContainer,
    Table, TableHead, TableRow,
    TableCell, TableBody
} from '@mui/material'

export default function TeamPerformanceTable({members, setSelectedMember}) {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Team Member</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {members.map((row) => (
                        <TableRow
                            onClick={() => setSelectedMember(row)}
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': {cursor: 'pointer', backgroundColor: 'silver'} }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}