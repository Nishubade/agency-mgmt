import React from 'react';
import PropTypes from 'prop-types';
import Piechart from './Piechart';
import { useTheme } from '@mui/material';

const ChartCard = (props) => {
  const theme = useTheme();
  return (
    <div>
      <Piechart
        title="Balance"
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
    </div>
  );
};

ChartCard.propTypes = {};

export default ChartCard;
