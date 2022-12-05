import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { DashboardComponent } from '@sections/dashboard';
import { ContextProvider } from '@sections/dashboard/context';
import AuthGuard from '@guards/AuthGuard';
import { DashboardProvider } from '@contexts/dashboard';

// ----------------------------------------------------------------------

const PAGE_TITLE = 'Dashboard';

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Dashboard() {
  const { themeStretch } = useSettingsContext();

  return (
    <AuthGuard>
      <DashboardProvider>
        <ContextProvider>
          <Page title={PAGE_TITLE} nocard>
            <Container maxWidth={themeStretch ? false : 'xl'}>
              <DashboardComponent />
            </Container>
          </Page>
        </ContextProvider>
      </DashboardProvider>
    </AuthGuard>
  );
}
