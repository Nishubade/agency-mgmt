import { Chip, Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { DashboardComponent } from '@sections/dashboard';
import { ContextProvider } from '@sections/dashboard/context';
import AuthGuard from '@guards/AuthGuard';
import { DashboardProvider } from '@contexts/dashboard';
import { useRahatTrigger } from '@services/contracts/useRahatTrigger';

// ----------------------------------------------------------------------

const PAGE_TITLE = 'Dashboard';

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Dashboard() {
  const { themeStretch } = useSettingsContext();
  const { isLive } = useRahatTrigger();

  const breadCrumbAction = (
    <Chip
      label={isLive ? 'Multi-Sig Trigger Live' : 'Multi-Sig Trigger Not Live'}
      color={isLive ? 'success' : 'error'}
    />
  );

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
