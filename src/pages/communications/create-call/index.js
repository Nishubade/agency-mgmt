/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Button, Container, Stack } from '@mui/material';
import { CommunicationsProvider } from '@contexts/communications';
import Iconify from '@components/iconify';
import { CreateCallView } from '@sections/communications/create-call';

const PAGE_TITLE = 'Communications: Calls';

export default function CommunicationsList() {
  const { themeStretch } = useSettingsContext();

  const ActionItems = (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
      <Button startIcon={<Iconify icon="bx:bx-upload" />} variant="outlined" color="primary">
        Upload Audio
      </Button>
    </Stack>
  );

  return (
    <CommunicationsProvider>
      <Page title={PAGE_TITLE} nocard breadcrumbAction={ActionItems}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CreateCallView />
        </Container>
      </Page>
    </CommunicationsProvider>
  );
}

CommunicationsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
