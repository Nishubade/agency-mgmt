import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { ActionMenu, ProjectViewComp } from '@sections/projects/view';
import { useRouter } from 'next/router';
import { ProjectProvider, useProjectContext } from '@contexts/projects';

const PAGE_TITLE = `Project: Detail`;
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
    <ProjectProvider>
      <Page title={PAGE_TITLE} nocard action={<ActionMenu menuItems={actionMenuItems} actionTitle={'Actions'} />}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <ProjectViewComp />
        </Container>
      </Page>
    </ProjectProvider>
  );
};

ProjectView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

ProjectView.propTypes = {};

export default ProjectView;
