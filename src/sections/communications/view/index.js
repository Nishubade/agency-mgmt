import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCommunicationsContext } from '@contexts/communications';
import { Box, Card, CardContent, CardHeader, Chip, Grid, Stack, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';
import moment from 'moment';
import LatestCommunication from './LatestCommunication';
import AllLogs from './AllLogs';

const tableHeader = [
  {
    timestamp: {
      id: 'timestamp',
      label: 'Date',
      align: 'left',
    },
  },
];

const CommunicationView = () => {
  const {
    query: { phone },
  } = useRouter();

  const { jaleshworCommunicationByPhone, getJaleshworCommunicationByPhone } = useCommunicationsContext();

  useEffect(() => {
    if (!phone) return;
    getJaleshworCommunicationByPhone(phone);
  }, [phone]);

  const [latestCommunication, ...rest] = jaleshworCommunicationByPhone;

  return (
    <Stack spacing={2}>
      <LatestCommunication totalAttempts={rest?.length + 1} log={latestCommunication} />

      <AllLogs logs={rest} />
    </Stack>
  );
};

export default CommunicationView;
