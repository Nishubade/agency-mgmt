import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
import { useModuleContext } from './context';
import { useSettingsContext } from '@components/settings';
// @mui
import { useTheme } from '@mui/material/styles';
import BarchartSingle from './BarchartSingle';
import Piechart from './Piechart';
import { LiveTransactionTable } from '@sections/transactionTable';

const DashboardComponent = (props) => {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();
  const {
    getBeneficiaryCountByGender,
    countByGender,
    countByMethod,
    countByMode,
    getTransactionsCountByWard,
    dashboardWardChartData,
    getTransactionsCountByMethod,
    getTransactionsCountByMode,
    beneficiaryCounts,
    getBeneficiariesCounts,
  } = useModuleContext();

  useEffect(() => {
    getBeneficiaryCountByGender();
  }, [getBeneficiaryCountByGender]);

  useEffect(() => {
    getTransactionsCountByWard();
  }, [getTransactionsCountByWard]);

  useEffect(() => {
    getTransactionsCountByMethod();
  }, [getTransactionsCountByMethod]);

  useEffect(() => {
    getTransactionsCountByMode();
  }, [getTransactionsCountByMode]);

  useEffect(() => {
    getBeneficiariesCounts();
  }, [getBeneficiariesCounts]);

  console.log('first', countByMode);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SummaryCard title="Total Beneficiaries Impacted" total={beneficiaryCounts?.impacted?.totalFamilyCount} />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard title="Total Beneficiaries Claimed" total={4876} />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard title="Children Below 5" total={beneficiaryCounts?.impacted?.totalBelow5Count} />
        </Grid>

        <Grid item xs={12} md={6}>
          {/* <Barchart graphType="bar" title="Ward Wise Claim" chartDataObj={dashboardWardChartData} /> */}
          <BarchartSingle
            title="Ward Wise Claim"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              ...dashboardWardChartData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Claimed Vs Budget"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              series: [
                { label: 'Available', value: 12244 },
                { label: 'Issued', value: 12244 },
              ],
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Offline Vs Online"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              series: countByMode,
            }}
          />
        </Grid>
        {/* 2nd  Charts */}
        <Grid item xs={12} md={3}>
          <Piechart
            title="Claimed By Gender"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              series: countByGender,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Claim SMS vs QR"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              series: countByMethod,
            }}
            // chartColors={[
            //   theme.palette.primary.lighter,
            //   theme.palette.primary.light,
            //   theme.palette.primary.main,
            //   theme.palette.primary.dark,
            // ]}
            // chartData={countByMethod}
          />
        </Grid>

        <Grid item xs={24} lg={24}>
          <LiveTransactionTable />
        </Grid>
      </Grid>
    </Box>
  );
};

DashboardComponent.propTypes = {};

export default DashboardComponent;
