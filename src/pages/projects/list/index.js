/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { PATH_BENEFICIARY } from '@routes/paths';
import { TableContainer } from '@sections/projects';

const PAGE_TITLE = 'Projects';

export default function ProjectsList() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title={PAGE_TITLE} breadcrumbLinks={[{ name: 'List', href: PATH_BENEFICIARY.root }]}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <TableContainer />
      </Container>
    </Page>
  );
}

ProjectsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
