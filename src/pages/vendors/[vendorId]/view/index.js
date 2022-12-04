import React from 'react';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { ActionMenu, VendorView } from '@sections/vendors/view';
import { VendorProvider } from '@contexts/vendors';

const PAGE_TITLE = 'Vendors: Details';

const VendorsView = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <VendorProvider>
      <Page title={PAGE_TITLE} nocard action={<ActionMenu actionTitle={'Actions'} />}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <VendorView />
        </Container>
      </Page>
    </VendorProvider>
  );
};

VendorsView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

VendorsView.propTypes = {};

export default VendorsView;
