import React from 'react';
import PropTypes from 'prop-types';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Box, Container, Grid, Stack } from '@mui/material';
import { ActionMenu, BasicInfoCard, ChartCard, MoreInfoCard, ViewTabs } from '@sections/projects/view';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Project: View';

const ProjectView = (props) => {
  const { themeStretch } = useSettingsContext();
  const {
    push: routerPush,
    query: { projectId },
  } = useRouter();

  const actionMenuItems = [
    {
      name: 'Edit Project',
      href: `/projects/${projectId}/edit`,
      onClick: () => routerPush(`/projects/${projectId}/edit`),
    },
    {
      name: 'Add Budget',
      href: `/projects/${projectId}/add-budget`,
      onClick: () => routerPush(`/projects/${projectId}/add-budget`),
    },
  ];

  return (
    <Page title={PAGE_TITLE} nocard action={<ActionMenu menuItems={actionMenuItems} actionTitle={'Actions'} />}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
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
      </Container>
    </Page>
  );
};

ProjectView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

ProjectView.propTypes = {};

export default ProjectView;
