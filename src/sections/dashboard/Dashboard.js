import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid, Stack } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
import { useModuleContext } from './context';
// @mui
import { useTheme } from '@mui/material/styles';
import BarchartSingle from './BarchartSingle';
import Piechart from './Piechart';
import { LiveTransactionTable } from '@sections/transactionTable';
import { useRouter } from 'next/router';
import { PATH_REPORTS } from '@routes/paths';
import Iconify from '@components/iconify';
import { getFlickrImages } from '@services/flickr';
import { useContractFunctions } from '@services/contract';
import ActivateResponse from './ActivateResponse';

const DashboardComponent = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { triggerResponse } = useContractFunctions();

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

  const [flickImages, setFlickImages] = useState([]);

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

  useEffect(() => {
    const getFlickPics = async () => {
      const res = await getFlickrImages();
      setFlickImages(res.photo);
    };
    getFlickPics();
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <SummaryCard
            title="Beneficiaries Claimed"
            total={beneficiaryCounts?.impacted?.totalClaimed}
            subtitle={'households'}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <SummaryCard
            title="Under 5 impacted"
            total={beneficiaryCounts?.impacted?.totalBelow5Count}
            subtitle={'children'}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <SummaryCard
            title="Total Impacted"
            total={beneficiaryCounts?.impacted?.totalFamilyCount}
            subtitle={'people'}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ActivateResponse />
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <PhotoGallery list={flickImages} />
        </Grid> */}
        {/* <Grid item xs={12} md={3}>
          <SummaryCard
            title="SMS of token assign"
            total={beneficiaryCounts?.impacted?.totalFamilyCount}
            subtitle={'total'}
          />
        </Grid> */}
        {/* <Grid item xs={12} md={2.4}>
          <SummaryCard
            title="QR Card distributed"
            total={beneficiaryCounts?.impacted?.totalFamilyCount}
            subtitle={'households'}
          />
        </Grid> */}

        <Grid item xs={12} md={12}>
          <BarchartSingle
            title="Ward Wise Claim"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              options: {
                chart: {
                  stacked: true,
                  selection: {
                    enabled: true,
                  },
                  // events: {
                  //   click: (event, chartContext, config) => {
                  //     setSelectedWard(
                  //       String(dashboardWardChartData.chartLabel[config.dataPointIndex]?.slice(5))
                  //       // String(dashboardWardChartData.chartLabel[config.dataPointIndex]?.replace('Ward', ''))
                  //     );
                  //   },
                  // },
                },
              },
              ...dashboardWardChartData,
            }}
          />
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <WardGenderInfoCard selectedWard={selectedWard} />
        </Grid> */}

        {/* <Grid item xs={24} lg={24}>
          <LiveTransactionTable />
        </Grid> */}

        <Grid item xs={12} md={4}>
          <Piechart
            title="Gender Distribution"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              series: countByGender,
            }}
            footer={
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ p: 2 }}>
                <Button
                  onClick={() => router.push(PATH_REPORTS.wardReport)}
                  endIcon={<Iconify icon={'material-symbols:chevron-right-rounded'} />}
                >
                  View Ward Wise Report
                </Button>
              </Stack>
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <BarchartSingle
            title="Claim with SMS vs QR Card"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              ...countByMethod,
            }}
          />
          {/* <Piechart
            title="Claim with SMS vs QR Card"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              series: countByMethod,
            }}
          /> */}
        </Grid>

        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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
      </Grid>
    </Box>
  );
};

DashboardComponent.propTypes = {};

export default DashboardComponent;
