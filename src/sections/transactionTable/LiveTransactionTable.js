import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, CardHeader, Grid, Stack, TablePagination, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';
import useWSTransaction from '@hooks/useWSTransaction';
import * as TXService from '@services/transactionTable';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import { PATH_REPORTS } from '@routes/paths';

const TABLE_HEAD = {
  createdAt: {
    id: 'timestamp',
    // id: 'timestamp',
    label: 'Timestamp',
    align: 'left',
  },
  txHash: {
    id: 'txHash',
    label: 'TxHash',
    align: 'left',
  },
  beneficiary: {
    id: 'beneficiary',
    label: 'Beneficiary',
    align: 'left',
  },

  amount: {
    id: 'amount',
    label: 'Amount',
    align: 'left',
  },

  ward: {
    id: 'ward',
    label: 'Ward',
    align: 'left',
  },
  isQR: {
    id: 'isQR',
    label: 'Method',
    align: 'left',
  },
  isOffline: {
    id: 'isOffline',
    label: 'Mode',
    align: 'left',
  },
};

const LiveTransactionTable = (props) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    start: 0,
    limit: 5,
  });

  const router = useRouter();

  const [wsTableData, websocket] = useWSTransaction() || [{ data: {} }, { current: null }];
  //   const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    if (!wsTableData?.data) return;
    setList((prev) => [wsTableData?.data, ...prev]);
  }, [wsTableData]);

  const fetchTransactionList = useCallback(async (query) => {
    try {
      const response = await TXService.transactionList(query);
      const formatted = response?.data?.data?.data?.map((item) => ({
        ...item,
        isQR: item?.isQR ? 'QR' : 'SMS',
        isOffline: item?.isOffline ? 'Offline' : 'Online',
      }));

      setList(formatted);
      setPagination((prev) => ({
        ...prev,
        count: response?.data?.data?.count,
        start: response?.data?.data?.start,
        limit: response?.data?.data?.limit,
      }));
    } catch (error) {
      console.error(error);
      setError(error?.message);
    }
  }, []);

  useEffect(() => {
    fetchTransactionList({
      start: pagination.start,
      limit: pagination.limit,
    });
  }, [pagination.start, pagination.limit, fetchTransactionList]);

  const paginationView = (
    <TablePagination
      component="div"
      count={pagination?.count}
      rowsPerPage={pagination.limit}
      page={+pagination.start}
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
      {paginationView}
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2 }} md={12}>
        <CardHeader
          title={
            <Grid container spacing={0.5}>
              <Typography variant="h6" sx={{ mt: -1.8 }}>
                Live Claimed Transactions ( {`${pagination.count}`} )
              </Typography>
            </Grid>
          }
        />
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}

      <ListTable footer={paginationView} tableHeadersList={TABLE_HEAD} tableRowsList={list} />
    </Card>
  );
};

export default LiveTransactionTable;
