import React from 'react';
import { useRouter } from 'next/router';
import { Container, Grid, Stack } from '@mui/material';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';

import { ActionMenu, BeneficiaryViewComp } from '@sections/beneficiaries/view';
import { BeneficiaryProvider } from '@contexts/beneficiaries';

const PAGE_TITLE = 'Beneficairy: Details';

const BeneficiaryView = () => {
  const { themeStretch } = useSettingsContext();
  const {
    push: routerPush,
    query: { beneficiaryId },
  } = useRouter();

  return (
    <BeneficiaryProvider>
      <Page title={PAGE_TITLE} nocard action={<ActionMenu actionTitle={'Actions'} />}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <BeneficiaryViewComp />
        </Container>
      </Page>
    </BeneficiaryProvider>
  );
};

BeneficiaryView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

BeneficiaryView.propTypes = {};

export default BeneficiaryView;
