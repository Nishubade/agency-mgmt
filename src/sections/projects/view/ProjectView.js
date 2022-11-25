import React from 'react'
import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import BasicInfoCard from './BasicInfoCard';
import MoreInfoCard from './MoreInfoCard';
import ChartCard from './ChartCard';
import ViewTabs from './ViewTabs';

const ProjectView = props => {
  return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <BasicInfoCard />
            <MoreInfoCard />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartCard />
        </Grid>
      </Grid>
      <Stack sx={{ mt: 2 }}>
        <ViewTabs />
      </Stack>
  );
}

ProjectView.propTypes = {}

export default ProjectView