import React, { useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import BasicInfoCard from './BasicInfoCard';
import MoreInfoCard from './MoreInfoCard';
import ChartCard from './ChartCard';
import ViewTabs from './ViewTabs';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';

const ProjectView = (props) => {
  const { getProjectById } = useProjectContext();

  const {
    push: routerPush,
    query: { projectId },
  } = useRouter();

  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId);
  }, [projectId, getProjectById]);

  return (
    <>
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
    </>
  );
};

ProjectView.propTypes = {};

export default ProjectView;
