import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, useTheme } from '@mui/material';
import BarchartSingle from './BarchartSingle';
import { useRouter } from 'next/router';
import { useModuleContext } from './context';
import WardGenderInfoCard from './WardGenderInfoCard';
import WardClaimInfoCard from './WardClaimInfoCard';
import WardLandOwnershipInfoCard from './WardLandOwnershipInfoCard';
import WardDisabilityInfoCard from './WardDisabilityInfoCard';

function WardWiseReport() {
  const theme = useTheme();

  const { getTransactionsCountByWard, wardChartData } = useModuleContext();
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    getTransactionsCountByWard();
  }, [getTransactionsCountByWard]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
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
                events: {
                  click: (event, chartContext, config) => {
                    let wardKey = String(wardChartData.chartLabel[config.dataPointIndex]?.slice(5));

                    setSelectedWard(wardKey);
                  },
                },
              },
            },
            ...wardChartData,
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <WardGenderInfoCard selectedWard={selectedWard} />
      </Grid>
      <Grid item xs={12} md={4}>
        <WardClaimInfoCard selectedWard={selectedWard} />
      </Grid>
      <Grid item xs={12} md={4}>
        <WardLandOwnershipInfoCard selectedWard={selectedWard} />
      </Grid>
      <Grid item xs={12} md={4}>
        <WardDisabilityInfoCard selectedWard={selectedWard} />
      </Grid>
    </Grid>
  );
}

WardWiseReport.propTypes = {};

export default WardWiseReport;
