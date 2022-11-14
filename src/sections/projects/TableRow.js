import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Chip } from '@mui/material';
import { useRouter } from 'next/router';

const rows = [
  {
    name: 'Project 1',
    location: 'Location 1',
    projectManager: 'Project Manager 1',
    createdAt: '2021-01-01',
    status: 'Active',
    balance: '200',
    id: '1',
  },
];

export default function ListTable() {
  const router = useRouter();

  const handleView = (id) => () => {
    router.push(`/projects/${id}/view`);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SN.</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Project Manager</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.projectManager}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">
                <Chip label={row.status} />
              </TableCell>
              <TableCell align="right">{row.balance}</TableCell>
              <TableCell align="right">
                <Button onClick={handleView(row.id)} variant="text">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
