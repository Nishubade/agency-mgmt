import SummaryCard from '@components/SummaryCard';
import { SPACING } from '@config';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { numberWithCommas } from '@utils/formatNumber';
import moment from 'moment';

const Stats = ({ vendor, beneficiary }) => (
  <Grid p={2} container spacing={SPACING.GRID_SPACING}>
    <Grid item xs={12} md={6} lg={4}>
      <SummaryCard
        title={'Received Cash'}
        total={numberWithCommas(vendor?.cashReceived)}
        subtitle={`by ${vendor.name} on ${moment.unix(vendor?.cashReceivedDate).format('DD MMM YYYY')}`}
      />
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <SummaryCard title={'Cash Received by'} total={beneficiary?.data?.length} subtitle={'beneficiaries'} />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <SummaryCard
        title={'Beneficiaries Remaining'}
        total={beneficiary?.numOfBenefRemainingToClaim}
        subtitle="to receive cash"
      />
    </Grid>
  </Grid>
);

Stats.propTypes = {
  vendor: PropTypes.object,
};

export default Stats;
