import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Stack } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
// @mui
import { useTheme } from '@mui/material/styles';
import BarchartSingle from './BarchartSingle';
import Piechart from '@components/chart/Piechart';
import { useRouter } from 'next/router';
import { PATH_CASH_TRACKER, PATH_REPORTS } from '@routes/paths';
import Iconify from '@components/iconify';
import { getFlickrImages } from '@services/flickr';
import PhotoGallery from './PhotoGallery';
import { SPACING } from '@config';
import { MapView } from './maps';
import { useDashboardContext } from '@contexts/dashboard';
import SummaryTracker from '@sections/cash-tracker/tracker/SummaryTracker';
import { getFileContent } from '@services/github';

const DashboardComponent = () => {
  const theme = useTheme();
  const router = useRouter();

  const {
    summary,
    getSummary,
    getGeoMapData,
    getGenderDistribution,
    genderDistribution,
    bankedUnbanked,
    phoneOwnership,
    genderWardChart,
    getBankedUnbanked,
    getPhoneOwnership,
    getWardGenderChart,
    // getBeneficiariesByWard,
    getCashTrackerSummary,
    // cashTrackerSummary,
  } = useDashboardContext();

  const [flickImages, setFlickImages] = useState([]);
  const [cashSummaryData, setCashSummaryData] = useState({});

  const [otherSummaries, setOtherSummaries] = useState({
    totalCollected: 0,
    totalValidated: 0,
    totalDailyWagers: 0,
    totalLandless: 0,
    totalDisabilities: 0
  });

  const fetchSummaryGithub = useCallback(async () => {
    const fetched = await getFileContent('data', 'beneficiary-summary.json');
    setOtherSummaries(fetched);
  }, []);

  useEffect(() => {
    getSummary();
    fetchSummaryGithub();
  }, [getSummary]);

  useEffect(() => {
    getCashTrackerSummary();
  }, [getCashTrackerSummary]);

  useEffect(() => {
    getGenderDistribution();
  }, [getGenderDistribution]);

  useEffect(() => {
    getBankedUnbanked();
  }, [getBankedUnbanked]);

  useEffect(() => {
    getPhoneOwnership();
  }, [getPhoneOwnership]);

  useEffect(() => {
    getWardGenderChart();
  }, [getWardGenderChart]);

  useEffect(() => {
    getGeoMapData();
  }, [getGeoMapData]);

  useEffect(() => {
    const getFlickPics = async () => {
      const params = {};
      const res = await getFlickrImages(params);
      setFlickImages(res.photo);
    };
    getFlickPics();

    return () => {
      setFlickImages([]);
    };
  }, []);

  return (
    <Box>
      <Grid container spacing={theme.spacing(SPACING.GRID_SPACING)}>
        <Grid
          container
          lg={7}
          md={12}
          sm={12}
          spacing={theme.spacing(SPACING.GRID_SPACING)}
          sx={{
            px: theme.spacing(SPACING.GRID_SPACING),
          }}
        >
          <Grid item xs={12} md={4} lg={4} sm={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:person-4"
              title="Beneficiaries"
              total={summary?.total_beneficiaries}
              subtitle={'households'}
              tooltipText="Total number of beneficiaries"
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4} sm={4}>
            <SummaryCard
              color="error"
              icon={'fa6-solid:children'}
              title="Under 5"
              total={summary?.total_children}
              // total={beneficiaryCounts?.impacted}
              subtitle={'children'}
              tooltipText="Total number of children under 5 years"
            />
          </Grid>

          {/* <Grid item xs={12} md={4} lg={4} sm={4}>
          <ActivateResponse />
        </Grid> */}

          <Grid item xs={12} md={4} lg={4} sm={4}>
            <SummaryCard
              color="success"
              icon={'fa6-solid:users'}
              title="Total Impact"
              total={summary?.total_persons}
              // total={beneficiaryCounts?.impacted?.totalFamilyCount}
              subtitle={'people'}
              tooltipText="Total number of people impacted"
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4} sm={4}>
            <SummaryCard
              color="info"
              icon="ph:currency-circle-dollar-light"
              title="Daily Wagers"
              total={otherSummaries?.totalDailyWagers}
              subtitle={'people'}
              tooltipText="Total number of daily wagers"
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4} sm={4}>
            <SummaryCard
              color="info"
              icon="ph:currency-circle-dollar-light"
              title="Total Landless"
              total={otherSummaries?.totalLandless}
              subtitle={'people'}
              tooltipText="Total number of landless people"
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4} sm={4}>
            <SummaryCard
              color="info"
              icon="ph:currency-circle-dollar-light"
              title="Total Disabled"
              total={otherSummaries?.totalDisabilities}
              subtitle={'people'}
              tooltipText="Total number of disabled people"
            />
          </Grid>
        </Grid>
        <Grid container xs={12} md={12} lg={5} sm={12} spacing={SPACING.GRID_SPACING}>
          <Grid item xs={12} md={12}>
            <PhotoGallery list={flickImages} />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Cash Tracker" />
            <CardContent>
              <SummaryTracker setCashSummaryData={setCashSummaryData} />
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={SPACING.GRID_SPACING}
                sx={{ pr: 2 }}
              >
                <Button
                  onClick={() => router.push(PATH_CASH_TRACKER.tracker)}
                  endIcon={<Iconify sx={{ ml: -1 }} icon={'material-symbols:chevron-right-rounded'} />}
                >
                  View Details
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Piechart
            title="Gender Distribution"
            chart={{
              colors: [
                theme.palette.primary.light,
                theme.palette.success.light,
                theme.palette.warning.light,
                theme.palette.error.light,
              ],

              series: genderDistribution,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Piechart
            title="Banked vs Unbanked"
            chart={{
              colors: [
                theme.palette.error.light,
                theme.palette.success.light,
                theme.palette.warning.light,
                theme.palette.primary.light,
              ],
              series: bankedUnbanked,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Piechart
            title="Phone Ownership Distribution"
            chart={{
              colors: [
                theme.palette.primary.light,
                theme.palette.success.light,
                theme.palette.error.light,
                theme.palette.warning.light,
              ],
              series: phoneOwnership,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarchartSingle
            title="Beneficiaries by Ward"
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
                },
              },
              ...genderWardChart,
            }}
            footer={
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={SPACING.GRID_SPACING}
                sx={{ pr: 2 }}
              >
                <Button
                  onClick={() => router.push(PATH_REPORTS.wardReport)}
                  endIcon={<Iconify sx={{ ml: -1 }} icon={'material-symbols:chevron-right-rounded'} />}
                >
                  More Details
                </Button>
              </Stack>
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MapView />
        </Grid>
      </Grid>
    </Box>
  );
};

DashboardComponent.propTypes = {};

export default DashboardComponent;
