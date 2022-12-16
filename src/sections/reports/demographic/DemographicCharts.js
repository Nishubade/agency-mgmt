import React, { useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';
import Barchart from './Barchart';
import { useReportsContext } from '@contexts/reports';
import { SPACING } from '@config';
import { useState } from 'react';

function DemographicCharts() {
  const theme = useTheme();
  const [loadingGraph, setLoadingGraph] = useState(true);
  const { demographicReportData, getDemographicDataByWard } = useReportsContext();

  useEffect(() => {
    getDemographicDataByWard({
      filterKey: 'noLand',
    });
    getDemographicDataByWard({
      filterKey: 'hasPhone',
    });
    getDemographicDataByWard({
      filterKey: 'hasBank',
    });
    getDemographicDataByWard({
      filterKey: 'dailyWage',
    });
    getDemographicDataByWard({
      filterKey: 'disability',
    });
    setLoadingGraph(false);
  }, [getDemographicDataByWard]);

  if (loadingGraph) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={SPACING.GRID_SPACING}>
      <Grid item xs={12} md={6} lg={6}>
        <Barchart
          title="Land Ownership"
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.warning.main,
            ],
            options: {
              chart: {
                stacked: true,
              },
            },
            ...demographicReportData?.noLand,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Barchart
          title="Phone Ownership"
          filterKey={'hasPhone'}
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.error.main,
            ],
            options: {
              chart: {
                stacked: true,
              },
            },
            ...demographicReportData?.hasPhone,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Barchart
          title="Bank Account"
          filterKey={'hasBank'}
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.warning.main,
            ],
            options: {
              chart: {
                stacked: true,
              },
            },
            ...demographicReportData?.hasBank,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Barchart
          title="Daily Wage"
          filterKey={'dailyWage'}
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.error.main,
            ],
            options: {
              chart: {
                stacked: true,
              },
            },
            ...demographicReportData?.dailyWage,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Barchart
          title="Disabled"
          filterKey={'disability'}
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.primary.main,
            ],
            options: {
              chart: {
                stacked: true,
              },
            },
            ...demographicReportData?.disability,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default DemographicCharts;
