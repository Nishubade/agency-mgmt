import React from 'react';
import PropTypes from 'prop-types';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Box, Container, Grid, Stack } from '@mui/material';
import { ActionMenu, BasicInfoCard, MoreInfoCard, ProjectsInvolved, TokenDetails } from '@sections/beneficiaries/view';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Beneficairy: Details';

const BeneficiaryView = (props) => {
  const { themeStretch } = useSettingsContext();
  const {
    push: routerPush,
    query: { projectId },
  } = useRouter();

  const actionMenuItems = [
    {
      name: 'Edit Beneficairy',
      href: `/beneficiaries/${projectId}/edit`,
      onClick: () => routerPush(`/beneficiaries/${projectId}/edit`),
    },
    {
      name: 'Issue Token',
      href: `/beneficiaries/${projectId}/add-budget`,
      onClick: () => routerPush(`/beneficiaries/${projectId}/add-budget`),
    },
    {
      name: 'Switch Project',
      href: `/beneficiaries/${projectId}/add-budget`,
      onClick: () => routerPush(`/beneficiaries/${projectId}/add-budget`),
    },
    {
      name: 'Suspend Beneficiary',
      href: `/beneficiaries/${projectId}/add-budget`,
      onClick: () => routerPush(`/beneficiaries/${projectId}/add-budget`),
    },
  ];

  return (
    <Page title={PAGE_TITLE} noCard action={<ActionMenu menuItems={actionMenuItems} actionTitle={'Actions'} />}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <BasicInfoCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <TokenDetails />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <MoreInfoCard />
          </Grid> */}
        </Grid>
        <Stack>
          <MoreInfoCard />
        </Stack>
        <Stack sx={{ mt: 1 }}>
          <ProjectsInvolved />
        </Stack>
      </Container>
    </Page>
  );
};

BeneficiaryView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

BeneficiaryView.propTypes = {};

export default BeneficiaryView;
