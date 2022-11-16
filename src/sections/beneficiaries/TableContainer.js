import { Box, Button, Chip, TableCell, TableRow } from '@mui/material';
import React from 'react';
import ListTableToolbar from './ListTableToolbar';
import { useRouter } from 'next/router';
import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';

const rows = [
  {
    name: 'Project 1',
    address: 'address 1',
    registeredBy: 'Project Manager 1',
    registrationDate: '2021-01-01',
    status: 'Active',
    balance: '200',
    id: '1',
  },
  {
    name: 'Jal',
    address: 'address 1',
    registeredBy: 'Project Manager 1',
    registrationDate: '2021-01-05',
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
  address: {
    id: 'address',
    label: 'Address',
    align: 'left',
  },

  registrationDate: {
    id: 'registrationDate',
    label: 'Registration Date',
    align: 'left',
  },
  registeredBy: {
    id: 'registeredBy',
    label: 'Registered By',
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
    router.push(`/beneficiaries/${id}/view`);
  };
  return (
    <Box sx={{ p: 1 }}>
      <ListTableToolbar />
      <ListTable tableRowsList={rows} tableHeadersList={TABLE_HEAD}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>
              <TableCell align={tableHeadersList['address'].align}>{row.address}</TableCell>
              <TableCell align={tableHeadersList['registrationDate'].align}>{row.registrationDate}</TableCell>
              <TableCell align={tableHeadersList['registeredBy'].align}>{row.registeredBy}</TableCell>

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
