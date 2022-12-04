import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';

const TokenDetails = (props) => (
  <Card>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
        <Typography variant="body1">Token Details</Typography>
      </Stack>

      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h4">1000</Typography>
          <Typography variant="body2">Current Balance</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h4">1000</Typography>
          <Typography variant="body2">Total Issued</Typography>
        </Grid>
      </Stack>
    </CardContent>
  </Card>
);

TokenDetails.propTypes = {};

export default TokenDetails;
