import React from 'react';
import PropTypes from 'prop-types';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container, Grid, Stack } from '@mui/material';
import { ActionMenu, BasicInfoCard, MoreInfoCard, ProjectsInvolved, TokenDetails } from '@sections/vendors/view';
import { useRouter } from 'next/router';
import HistoryTable from '@sections/transactionTable';

const PAGE_TITLE = 'Vendors: Details';

const VendorsView = (props) => {
  const { themeStretch } = useSettingsContext();
  const {
    push: routerPush,
    query: { vendorId },
  } = useRouter();

  const actionMenuItems = [
    {
      name: 'Edit Vendor',
      href: `/vendors/${vendorId}/edit`,
      onClick: () => routerPush(`/vendors/${vendorId}/edit`),
    },

    {
      name: 'Add to Project',
      href: `/vendors/${vendorId}/add-to-project`,
      onClick: () => routerPush(`/vendors/${vendorId}/add-to-project`),
    },
    {
      name: 'Suspend Vendor',
      href: `/vendors/${vendorId}/add-budget`,
      onClick: () => routerPush(`/vendors/${vendorId}/add-budget`),
    },
  ];

  return (
    <Page title={PAGE_TITLE} nocard action={<ActionMenu menuItems={actionMenuItems} actionTitle={'Actions'} />}>
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
        <Stack sx={{ mt: 1 }}>
          <HistoryTable />
        </Stack>
      </Container>
    </Page>
  );
};

VendorsView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

VendorsView.propTypes = {};

export default VendorsView;
