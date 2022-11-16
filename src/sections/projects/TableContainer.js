import { Box, Button, Chip, TableCell, TableRow } from '@mui/material';
import React from 'react';
import ListTableToolbar from './ListTableToolbar';
import ListTable from './ListTable';
import { useRouter } from 'next/router';
import Iconify from '@components/iconify';

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
  {
    name: 'Jal',
    location: 'Location 1',
    projectManager: 'Project Manager 1',
    createdAt: '2021-01-05',
    status: 'Active',
    balance: '1000',
    id: '5',
  },
];

const TABLE_HEAD = {
  name: {
    id: 'name',
    // id: 'timestamp',
    label: 'Name',
    align: 'left',
  },
  location: {
    id: 'location',
    label: 'Location',
    align: 'left',
  },

  projectManager: {
    id: 'projectManager',
    label: 'Project Manager',
    align: 'left',
  },
  createdAt: {
    id: 'createdAt',
    label: 'Created Date',
    align: 'left',
  },
  status: {
    id: 'status',
    label: 'Status',
    align: 'left',
  },
  balance: {
    id: 'balance',
    label: 'Balance',
    align: 'left',
  },
  action: {
    id: 'action',
    label: 'Action',
    align: 'left',
  },
};

const TableContainer = () => {
  const router = useRouter();

  const handleView = (id) => () => {
    router.push(`/projects/${id}/view`);
  };
  return (
    <Box sx={{ p: 1 }}>
      <ListTableToolbar />
      <ListTable tableRowsList={rows} tableHeadersList={TABLE_HEAD}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>
              <TableCell align={tableHeadersList['location'].align}>{row.location}</TableCell>
              <TableCell align={tableHeadersList['projectManager'].align}>{row.projectManager}</TableCell>
              <TableCell align={tableHeadersList['createdAt'].align}>{row.createdAt}</TableCell>
              <TableCell align={tableHeadersList['status'].align}>
                <Chip label={row.status} />
              </TableCell>
              <TableCell align={tableHeadersList['balance'].align}>{row.balance}</TableCell>
              <TableCell align={tableHeadersList['action'].align}>
                <Button onClick={handleView(row.id)} variant="text">
                  <Iconify icon="ic:outline-remove-red-eye" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </ListTable>
    </Box>
  );
};

export default TableContainer;
