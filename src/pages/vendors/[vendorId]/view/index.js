import React from 'react';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { ActionMenu, VendorsViewComp } from '@sections/vendors/view';
import { useRouter } from 'next/router';
import { VendorProvider } from '@contexts/vendors';

const PAGE_TITLE = 'Vendors: Details';

const VendorsView = () => {
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
    <VendorProvider>
      <Page title={PAGE_TITLE} nocard action={<ActionMenu menuItems={actionMenuItems} actionTitle={'Actions'} />}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <VendorsViewComp />
        </Container>
      </Page>
    </VendorProvider>
  );
};

VendorsView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

VendorsView.propTypes = {};

export default VendorsView;
