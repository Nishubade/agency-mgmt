import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';

const DetailTable = ({ list }) => {
  const TABLE_HEADER = {
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
    method: {
      id: 'method',
      label: 'Method',
      align: 'left',
    },
    mode: {
      id: 'mode',
      label: 'Mode',
      align: 'left',
    },
  };

  return (
    <Stack
      sx={{
        height: '100%',
        p: 2,
      }}
    >
      <ListTable tableRowsList={list} tableHeadersList={TABLE_HEADER} />
    </Stack>
  );
};

DetailTable.propTypes = {
  selectedNode: PropTypes.object,
  list: PropTypes.array,
};

DetailTable.propTypes = {};

export default DetailTable;
