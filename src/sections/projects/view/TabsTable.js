import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@mui/material';
import ListTable from '../ListTable';

const TabsTable = ({
  rows,
  tableHead,
  // tableTitle,
  tab,
}) => {
  if (tab === 'beneficiaries') {
    return (
      <ListTable tableRowsList={rows} tableHeadersList={tableHead}>
        {(rows, tableHeadersList) =>
          rows?.map((row) => (
            <TableRow key={row?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name']?.align}>{row?.name}</TableCell>

              <TableCell align={tableHeadersList['address']?.align}>{row?.address}</TableCell>
              <TableCell align={tableHeadersList['phone']?.align}>{row?.phone}</TableCell>

              <TableCell align={tableHeadersList['token']?.align}>{row?.token}</TableCell>
            </TableRow>
          ))
        }
      </ListTable>
    );
  }

  if (tab === 'vendors') {
    return (
      <ListTable tableRowsList={rows} tableHeadersList={tableHead}>
        {(rows, tableHeadersList) =>
          rows?.map((row) => (
            <TableRow key={row?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name']?.align}>{row?.name}</TableCell>

              <TableCell align={tableHeadersList['address']?.align}>{row?.address}</TableCell>
              <TableCell align={tableHeadersList['phone']?.align}>{row?.phone}</TableCell>

              <TableCell align={tableHeadersList['email']?.align}>{row?.email}</TableCell>

              <TableCell align={tableHeadersList['shop']?.align}>{row?.shop}</TableCell>
            </TableRow>
          ))
        }
      </ListTable>
    );
  }

  if (tab === 'mobilizers') {
    return (
      <ListTable tableRowsList={rows} tableHeadersList={tableHead}>
        {(rows, tableHeadersList) =>
          rows?.map((row) => (
            <TableRow key={row?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name']?.align}>{row?.name}</TableCell>

              <TableCell align={tableHeadersList['address']?.align}>{row?.address}</TableCell>
              <TableCell align={tableHeadersList['phone']?.align}>{row?.phone}</TableCell>

              <TableCell align={tableHeadersList['email']?.align}>{row?.email}</TableCell>
            </TableRow>
          ))
        }
      </ListTable>
    );
  }

  return 'No tab selected';
};

TabsTable.propTypes = {
  rows: PropTypes.array.isRequired,
  tableHead: PropTypes.object.isRequired,
  // tableTitle: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
};

export default TabsTable;
