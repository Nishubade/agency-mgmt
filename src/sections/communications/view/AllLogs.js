import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader } from '@mui/material';
import ListTable from '@components/table/ListTable';

const OlderLogs = ({ logs = [] }) => {
  const tileHeader = {
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
    type: {
      id: 'type',
      label: 'Type',
      align: 'left',
    },
    status: {
      id: 'status',
      label: 'Status',
      align: 'left',
    },
  };

  return (
    <Card>
      <CardHeader title="All Logs" />
      <CardContent>
        <ListTable tableHeadersList={tileHeader} tableRowsList={logs} />
      </CardContent>
    </Card>
  );
};

OlderLogs.propTypes = {
  logs: PropTypes.array,
};

export default OlderLogs;
