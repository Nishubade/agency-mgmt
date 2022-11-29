import React from 'react';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { ActionMenu, MobilizerViewComp } from '@sections/mobilizers/view';
import { useRouter } from 'next/router';
import { MobilizerProvider } from '@contexts/mobilizers';

const PAGE_TITLE = 'Mobilizers: Details';

const MobilizerView = () => {
  const { themeStretch } = useSettingsContext();
  const {
    push: routerPush,
    query: { mobilizerId },
  } = useRouter();

  const actionMenuItems = [
    {
      name: 'Edit Vendor',
      href: `/mobilizers/${mobilizerId}/edit`,
      onClick: () => routerPush(`/mobilizers/${mobilizerId}/edit`),
    },

    {
      name: 'Add to Project',
      href: `/mobilizers/${mobilizerId}/add-to-project`,
      onClick: () => routerPush(`/mobilizers/${mobilizerId}/add-to-project`),
    },
    {
      name: 'Suspend Vendor',
      href: `/mobilizers/${mobilizerId}/add-budget`,
      onClick: () => routerPush(`/mobilizers/${mobilizerId}/add-budget`),
    },
  ];

  return (
    <MobilizerProvider>
      <Page title={PAGE_TITLE} nocard action={<ActionMenu menuItems={actionMenuItems} actionTitle={'Actions'} />}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MobilizerViewComp />
        </Container>
      </Page>
    </MobilizerProvider>
  );
};

MobilizerView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

MobilizerView.propTypes = {};

export default MobilizerView;
