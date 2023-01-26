import { Grid, Stack } from '@mui/material';
import { LiveTransactionTable } from '@sections/transactionTable';
import SummaryCard from '@components/SummaryCard';
import { SPACING } from '@config';
import { useCallback, useEffect, useState } from 'react';
import { getDistributionSummary } from '@services/reporting';

const TransactionView = (props) => {
  const [summaryData, setSummaryData] = useState({
    issuedToBanked: 0,
    issuedToUnbanked: 0,
    cashToBanked: 0,
    cashToUnbanked: 0,
  });

  const getSummaryData = useCallback(async () => {
    const { data } = await getDistributionSummary();
    setSummaryData(data.data);
  }, []);

  useEffect(() => {
    getSummaryData();
  }, [getSummaryData]);

  return (
    <div>
      <Stack>
        <Grid container alignItems="flex-start" justifyContent="center" spacing={SPACING.GRID_SPACING} pt={2}>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color="success"
              icon="ph:money"
              title="Cash Distributed"
              total={summaryData.cashToUnbanked}
              subtitle={'Unbanked Beneficiaries'}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color="success"
              icon="ps:token"
              title="Token Issued"
              total={summaryData.issuedToUnbanked}
              subtitle={'Unbanked Beneficiaries'}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color="warning"
              icon="ph:money"
              title="Cash Distributed"
              total={summaryData.cashToBanked}
              subtitle={'Banked Beneficiaries'}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color="warning"
              icon="ps:token"
              title="Token Issued"
              total={summaryData.issuedToBanked}
              subtitle={'Banked Beneficiaries'}
            />
          </Grid>
        </Grid>
        <LiveTransactionTable />
      </Stack>
    </div>
  );
};

TransactionView.propTypes = {};

export default TransactionView;
