import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
import { SPACING } from '@config';

BasicInfoCard.propTypes = {
  rahatChainData: PropTypes.object,
  cashTrackerData: PropTypes.object,
  sx: PropTypes.object,
  projectSummary: PropTypes.object,
};

export default function BasicInfoCard({ rahatChainData, cashTrackerData, sx, projectSummary }) {
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
          title="Total Claimed"
          total={projectSummary?.totalClaimed}
          subtitle={'beneficiaries'}
          tooltipText="Beneficiaries who have claimed their tokens"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          color="info"
          icon="game-icons:token"
          title="Impacted Claims"
          total={projectSummary?.claimedFamilySizeTotal}
          subtitle={'beneficiaries'}
          tooltipText="Beneficiaries who have claimed tokens and have a family size greater than 1"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          color="warning"
          icon="game-icons:token"
          title="Remaining Claims"
          total={projectSummary?.unclaimedBeneficiariesTotal}
          subtitle={'beneficiaries'}
          tooltipText="Beneficiaries who have not claimed their tokens yet"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          color="warning"
          icon="game-icons:token"
          title="Impacted Children"
          total={projectSummary?.claimedBelow5CountTotal}
          subtitle={'claimed'}
          tooltipText="Beneficiaries who have claimed tokens and have children below 5 years old"
        />
      </Grid>

      {/* <Chip label="DEFAULT PROJECT" /> */}
    </Grid>
  );
}
