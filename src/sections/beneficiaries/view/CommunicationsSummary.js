import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
import { SPACING } from '@config';

const CommunicationsSummary = ({ list }) => {
  const callCount = list?.filter((item) => item.type === 'call').length;
  const smsCount = list?.filter((item) => item.type === 'sms').length;
  const successCount = list?.filter((item) => item.status === 'success').length;
  const failCount = list?.filter((item) => item.status === 'fail').length;

  const totalDurationOfCalls = list.reduce((acc, item) => {
    if (item.type === 'call') {
      return acc + +item.duration;
    }
    return acc;
  }, 0);

  const totalDurationOfCallsInMinutes = Math.floor(totalDurationOfCalls / 60);

  return (
    <Grid p={2} container spacing={SPACING.GRID_SPACING}>
      <Grid item xs={4}>
        <SummaryCard
          title="Calls"
          total={callCount}
          icon="bx:bx-phone-call"
          color="primary"
          subtitle={
            callCount > 0
              ? `${callCount} call(s) made out of which ${successCount} were successful and ${failCount} failed `
              : ''
          }
          tooltipText="Calls made"
        />
      </Grid>
      <Grid item xs={4}>
        <SummaryCard
          title="Total Duration of Calls"
          total={totalDurationOfCalls}
          icon="bx:bx-time"
          color="primary"
          subtitle={
            totalDurationOfCalls > 0
              ? `${totalDurationOfCalls} seconds (~${totalDurationOfCallsInMinutes} minutes) of calls made to this beneficiary
          
          `
              : ''
          }
          tooltipText="Total Duration of Calls to this beneficiary"
        />
      </Grid>
      <Grid item xs={4}>
        <SummaryCard
          title="SMS"
          total={smsCount}
          icon="bx:bx-message"
          color="warning"
          subtitle={`${smsCount} SMS sent to this beneficiary`}
          tooltipText="SMS sent to this beneficiary"
        />
      </Grid>
    </Grid>
  );
};

CommunicationsSummary.propTypes = {};

export default CommunicationsSummary;
