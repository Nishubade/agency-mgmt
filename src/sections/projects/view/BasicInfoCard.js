import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
import { SPACING } from '@config';

BasicInfoCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function BasicInfoCard({ rahatChainData, cashTrackerData, sx, ...other }) {
  console.log('cashTrackerData', cashTrackerData);
  return (
    <Grid container alignItems="flex-start" justifyContent="center" spacing={SPACING.GRID_SPACING} pt={2}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          color="warning"
          icon="ph:money"
          title="Budget"
          total={rahatChainData.totalBudget}
          subtitle={'tokens'}
          sx={sx}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          color="warning"
          icon="material-symbols:account-balance-wallet-outline-rounded"
          title="Balance"
          total={rahatChainData.tokenBalance}
          subtitle={'tokens'}
          sx={sx}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <SummaryCard
          icon="material-symbols:token"
          title="Token Issued"
          total={cashTrackerData?.beneficiaries?.claims}
          subtitle={'tokens'}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          color="info"
          icon="game-icons:token"
          title="Token Redeemed"
          total={cashTrackerData?.beneficiaries?.received}
          subtitle={'tokens'}
        />
      </Grid>

      {/* <Chip label="DEFAULT PROJECT" /> */}
    </Grid>
  );
}
