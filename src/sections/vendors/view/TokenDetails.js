import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, CardActions, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import truncateEthAddress from '@utils/truncateEthAddress';

TokenDetails.propTypes = {
  chainData: PropTypes.object,
};

export default function TokenDetails({ chainData }) {
  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="body1">Token Details</Typography>
        </Stack>

        {chainData?.cashAllowance > 0 && (
          <Alert sx={{ mt: 2 }}> This vendor have yet to accept ₹ {chainData?.cashAllowance}.</Alert>
        )}

        <Stack sx={{ pt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.tokenBalance || 0}</Typography>
            <Typography variant="body2">Token Balance</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.cashBalance || 0}</Typography>
            <Typography variant="body2">Cash Balance</Typography>
          </Grid>
        </Stack>
        <Stack sx={{ pt: 3 }} alignItems="center">
          <Typography variant="h4">{truncateEthAddress(chainData?.walletAddress) || '-'}</Typography>
          <Typography variant="body2">Contract Address</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
