import ListTable from '@components/table/ListTable';
import { Chip, Stack, TableCell, TableRow } from '@mui/material';
import moment from 'moment';
import React from 'react';
import CommunicationsSummary from './CommunicationsSummary';

const CommunicationsTable = ({ tableHeadersList, tableRowsList }) => (
  <Stack>
    <CommunicationsSummary list={tableRowsList} />
    <ListTable tableHeadersList={tableHeadersList} tableRowsList={tableRowsList}>
      {(rows, tableHeadersList) =>
        rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell align={tableHeadersList['to'].align}>{row.to}</TableCell>
            <TableCell align={tableHeadersList['timestamp'].align}>
              {moment.unix(row.timestamp).format('DD MMM YYYY')}
            </TableCell>
            <TableCell align={tableHeadersList['type'].align}>{row.type}</TableCell>
            <TableCell align={tableHeadersList['duration'].align}>{row.duration}</TableCell>
            <TableCell align={tableHeadersList['status'].align}>
              <Chip label={row.status} color={row.status === 'success' ? 'success' : 'error'} />
            </TableCell>
          </TableRow>
        ))
      }
    </ListTable>
  </Stack>
);

export default CommunicationsTable;
