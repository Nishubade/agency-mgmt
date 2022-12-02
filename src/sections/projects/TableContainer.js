import { Box, Button, Chip, TableCell, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import ListTableToolbar from './ListTableToolbar';
import { useRouter } from 'next/router';
import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';
import { useProjectContext } from '@contexts/projects';
import moment from 'moment';

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

  const { projects, getProjectsList } = useProjectContext();

  useEffect(() => {
    getProjectsList();
  }, []);

  const handleView = (id) => () => {
    router.push(`/projects/${id}/view`);
  };
  return (
    <Box sx={{ p: 1 }}>
      {/* <ListTableToolbar /> */}
      <ListTable tableRowsList={projects} tableHeadersList={TABLE_HEAD}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>
              <TableCell align={tableHeadersList['location'].align}>{row.location}</TableCell>
              <TableCell align={tableHeadersList['projectManager'].align}>{row.projectManager}</TableCell>
              <TableCell align={tableHeadersList['createdAt'].align}>
                {moment(row.registrationDate).format('MMMM Do, YYYY')}
              </TableCell>
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
