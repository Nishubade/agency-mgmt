import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
import { SPACING } from '@config';

BasicInfoCard.propTypes = {
  rahatChainData: PropTypes.object,
  cashTrackerData: PropTypes.object,
  sx: PropTypes.object,
  distributionSummary: PropTypes.object,
};

export default function BasicInfoCard({ rahatChainData, cashTrackerData, sx, distributionSummary }) {
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
          tooltipText="Total budget of the project"
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
          tooltipText="Tokens remaining in the project wallet"
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <SummaryCard
          icon="material-symbols:token"
          title="Token Issued"
          total={cashTrackerData?.beneficiaries?.claims}
          subtitle={'tokens'}
          tooltipText="Tokens issued to beneficiaries"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          color="info"
          icon="game-icons:token"
          title="Token Redeemed"
          total={cashTrackerData?.beneficiaries?.received}
          subtitle={'tokens'}
          tooltipText="Tokens redeemed by beneficiaries"
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <SummaryCard
          color="info"
          icon="game-icons:token"
          title="Token Issued"
          total={distributionSummary?.issuedToBanked}
          subtitle={'Banked Beneficiaries'}
          tooltipText="Tokens issued to banked beneficiaries"
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <SummaryCard
          color="warning"
          icon="game-icons:token"
          title="Cash Distributed"
          total={distributionSummary?.cashToBanked}
          subtitle={'Banked Beneficiaries'}
          tooltipText="Cash distributed to banked beneficiaries"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          color="info"
          icon="game-icons:token"
          title="Token Issued"
          total={distributionSummary?.issuedToUnbanked}
          subtitle={'Unbanked Beneficiaries'}
          tooltipText="Tokens issued to unbanked beneficiaries"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          color="warning"
          icon="game-icons:token"
          title="Cash Distributed"
          total={distributionSummary?.cashToUnbanked}
          subtitle={'Unbanked Beneficiaries'}
          tooltipText="Cash distributed to unbanked beneficiaries"
        />
      </Grid>

      {/* <Chip label="DEFAULT PROJECT" /> */}
    </Grid>
  );
}
