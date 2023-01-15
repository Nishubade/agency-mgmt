import SummaryCard from '@components/SummaryCard';
import { SPACING } from '@config';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { numberWithCommas } from '@utils/formatNumber';
import moment from 'moment';

const Stats = ({ vendor, beneficiary }) => (
  <Grid p={2} container spacing={SPACING.GRID_SPACING}>
    <Grid item xs={12} md={6} lg={3}>
      <SummaryCard title={'Received Tokens'} total={numberWithCommas(vendor?.cashReceived)} />
    </Grid>
    <Grid item xs={12} md={6} lg={3}>
      <SummaryCard
        title={'Token Received Date'}
        total={moment.unix(vendor?.cashReceivedDate).format('MMM DD, YYYY') || 'N/A'}
      />
    </Grid>
    <Grid item xs={12} md={6} lg={3}>
      <SummaryCard title={'Total Claimed Beneficiaries'} total={beneficiary?.data?.length} />
    </Grid>
    <Grid item xs={12} md={6} lg={3}>
      <SummaryCard title={'Remaining Beneficiaries'} total={beneficiary?.numOfBenefRemainingToClaim} />
    </Grid>
  </Grid>
);

Stats.propTypes = {
  vendor: PropTypes.object,
};

export default Stats;
