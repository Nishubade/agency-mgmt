/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { TableContainer } from '@sections/vendors';

const PAGE_TITLE = 'Vendors';

export default function VendorsList() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title={PAGE_TITLE}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <TableContainer />
      </Container>
    </Page>
  );
}

VendorsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
