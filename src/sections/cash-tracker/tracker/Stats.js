import SummaryCard from '@components/SummaryCard';
import { SPACING } from '@config';
import { Grid } from '@mui/material';
import React from 'react';

const Stats = () => {
  return (
    <Grid p={2} container spacing={SPACING.GRID_SPACING}>
      <Grid item xs={12} md={6} lg={4}>
        <SummaryCard title={'Received Tokens'} total={200} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SummaryCard title={'Received Date'} total={'2023/11/12'} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SummaryCard title={'Remaining Beneficiaries'} total={200} />
      </Grid>
    </Grid>
  );
};

export default Stats;
