/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Button, Container } from '@mui/material';
import { CommunicationsProvider } from '@contexts/communications';
import { CommunicationsTable } from '@sections/communications';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import { PATH_COMMUNICATIONS } from '@routes/paths';

const PAGE_TITLE = 'Communications: SMS Logs';

export default function CallLogs() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();

  const breadcrumAction = (
    <Button
      variant="outlined"
      startIcon={<Iconify icon="material-symbols:settings" />}
      onClick={() => router.push(PATH_COMMUNICATIONS.settings)}
    >
      Communication Settings
    </Button>
  );
  return (
    <CommunicationsProvider>
      <Page title={PAGE_TITLE} nocard breadcrumbAction={breadcrumAction}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CommunicationsTable communicationType="sms" />
        </Container>
      </Page>
    </CommunicationsProvider>
  );
}

CallLogs.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
