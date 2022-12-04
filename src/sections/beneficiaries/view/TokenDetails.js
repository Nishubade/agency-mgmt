/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { useRahat } from '@services/contracts/useRahat';
import truncateEthAddress from '@utils/truncateEthAddress';

TokenDetails.propTypes = {};
export default function TokenDetails() {
  const { chainData } = useBeneficiaryContext();
  //const { beneficiaryBalance, beneficiaryData, contract } = useRahat();

  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="body1">Benefits Details</Typography>
        </Stack>

        <Stack sx={{ pt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.tokenBalance || 0}</Typography>
            <Typography variant="body2">Remaining Claim</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.cashBalance || 0}</Typography>
            <Typography variant="body2">Cash Received</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.totalTokenIssued || 0}</Typography>
            <Typography variant="body2">Total Claim</Typography>
          </Grid>
        </Stack>
        <Stack sx={{ pt: 3 }} alignItems="center">
          <Typography variant="h4">{truncateEthAddress(chainData?.walletAddress) || '-'}</Typography>
          <Typography variant="body2">Wallet Address</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
