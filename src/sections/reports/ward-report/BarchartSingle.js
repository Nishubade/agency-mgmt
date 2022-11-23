import PropTypes from 'prop-types';
// import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
// import { CustomSmallSelect } from '@components/custom-input';
import Chart, { useChart } from '@components/chart';

// ----------------------------------------------------------------------

BarchartSingle.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function BarchartSingle({ title, subheader, chart, ...other }) {
  const { colors, chartLabel, chartData, options } = chart;

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories: chartLabel,
    },

    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <Chart
          // onClick={(e) => console.log('e', e)}
          type={'bar'}
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
