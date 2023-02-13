import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
import { SPACING } from '@config';

const CommunicationsSummary = ({ list, filter }) => {
  const callCount = list?.filter((item) => item.type === 'call').length;
  const smsCount = list?.filter((item) => item.type === 'sms').length;
  const successCount = list?.filter((item) => item.status === 'success').length;
  const failCount = list?.filter((item) => item.status === 'fail').length;
  if (filter?.to || filter?.status) {
    return (
      <Grid p={2} container spacing={SPACING.GRID_SPACING}>
        <Grid item xs={6}>
          <SummaryCard
            title="Calls"
            total={callCount}
            icon="bx:bx-phone-call"
            color="primary"
            subtitle={
              callCount > 0
                ? `${callCount} call(s) made out of which ${successCount} were successful and ${failCount} failed
                    `
                : ''
            }
            tooltipText="Calls made"
          />
        </Grid>
        <Grid item xs={6}>
          <SummaryCard
            title="SMS"
            total={smsCount}
            icon="bx:bx-message"
            color="warning"
            subtitle={`${smsCount} SMS sent`}
            tooltipText="SMS sent"
          />
        </Grid>
      </Grid>
    );
  }
  return '';
};

CommunicationsSummary.propTypes = {};

export default CommunicationsSummary;
