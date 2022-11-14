import { Box } from '@mui/material';
import React from 'react';
import ListTableToolbar from './ListTableToolbar';
import ListTable from './TableRow';

const TableContainer = () => {
  return (
    <Box sx={{ p: 1 }}>
      <ListTableToolbar />
      <ListTable />
    </Box>
  );
};

export default TableContainer;
