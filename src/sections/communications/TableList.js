import ListTable from '@components/table/ListTable';
import { useCommunicationsContext } from '@contexts/communications';
import { Button, Card, Chip, TableCell, TablePagination, TableRow } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import moment from 'moment';
import ListTableToolbar from './ListTableToolbar';
import copyToClipboard from '@utils/copyToClipboard';
import CommunicationsSummary from './CommunicationsSummary';
import PropTypes from 'prop-types';

const TABLE_HEADERS = {
  to: {
    id: 'to',
    label: 'To',
    align: 'left',
  },

  ward: {
    id: 'ward',
    label: 'Ward',
    align: 'left',
  },

  timestamp: {
    id: 'timestamp',
    label: 'Date',
    align: 'left',
  },

  duration: {
    id: 'duration',
    label: 'Duration',
    align: 'left',
  },

  status: {
    id: 'status',
    label: 'Status',
    align: 'left',
  },
  numberOfAttempts: {
    id: 'numberOfAttempts',
    label: 'Attempts',
    align: 'left',
  },
};

const TableList = ({ communicationType = 'call' }) => {
  const { getJaleshworCommunicationsList, communicationsList, getWards, pagination, setPagination, filter } =
    useCommunicationsContext();
  const router = useRouter();

  useEffect(() => {
    getJaleshworCommunicationsList({
      type: communicationType,
    });
  }, [filter, pagination, communicationType]);

  useEffect(() => {
    getWards();
  }, []);

  const handleBeneficiaryView = (id) => () => {
    if (!id) return;
    router.push(`/beneficiaries/${id}`);
  };

  const paginationView = (
    <TablePagination
      component="div"
      count={communicationsList?.count}
      rowsPerPage={pagination?.limit}
      page={+pagination?.start}
      onPageChange={(e, page) => {
        setPagination({ start: page, limit: pagination.limit });
      }}
      variant="head"
      size="large"
      onRowsPerPageChange={(e) => {
        setPagination({ start: pagination.start, limit: +e.target.value });
      }}
    />
  );

  return (
    <Card>
      <ListTableToolbar />
      <CommunicationsSummary list={communicationsList?.data} filter={filter} />
      <ListTable tableHeadersList={TABLE_HEADERS} tableRowsList={communicationsList?.data} footer={paginationView}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['to'].align}>
                <Button variant="text" disabled={!row.beneficiaryId} onClick={handleBeneficiaryView(row.beneficiaryId)}>
                  {row.to}
                </Button>

                <Button
                  size="small"
                  variant="text"
                  disabled={!row.beneficiaryId}
                  onClick={() => copyToClipboard(row.to)}
                  startIcon={<Iconify icon="bx:bx-copy" />}
                />
              </TableCell>
              <TableCell align={tableHeadersList['ward'].align}>{row.ward}</TableCell>

              <TableCell align={tableHeadersList['timestamp'].align}>
                {moment.unix(row.timestamp).format('DD/MM/YY, h:mm a')}
              </TableCell>
              <TableCell align={tableHeadersList['duration'].align}>{row.duration} seconds</TableCell>
              <TableCell align={tableHeadersList['status'].align}>
                <Chip label={row.status} color={row.status === 'success' ? 'success' : 'error'} />
              </TableCell>
              <TableCell align={tableHeadersList['numberOfAttempts'].align}>{row?.numberOfAttempts}</TableCell>
            </TableRow>
          ))
        }
      </ListTable>
    </Card>
  );
};

TableList.propTypes = {
  communicationType: PropTypes.string,
};

export default TableList;
