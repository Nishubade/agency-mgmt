import React from 'react';
import PropTypes from 'prop-types';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container, Grid } from '@mui/material';
import { ActionMenu, BasicInfoCard, ChartCard, MoreInfoCard } from '@sections/projects/view';

const PAGE_TITLE = 'Project: View';

const ProjectView = (props) => {
  const { themeStretch } = useSettingsContext();

  const actionMenuItems = [
    {
      name: 'Edit Project',
      href: '/projects/[projectId]/edit',
    },
    {
      name: 'Add Budget',
      href: '/projects/[projectId]/edit',
    },
  ];

  return (
    <Page title={PAGE_TITLE} noCard action={<ActionMenu menuItems={actionMenuItems} actionTitle={'Actions'} />}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <BasicInfoCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <MoreInfoCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <ChartCard />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

ProjectView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

ProjectView.propTypes = {};

export default ProjectView;
