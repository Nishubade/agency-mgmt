import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Tracker } from '@sections/cash-tracker/tracker';
import AuthGuard from '@guards/AuthGuard';

// ----------------------------------------------------------------------

const PAGE_TITLE = 'Cash Tracker';

CashTracker.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function CashTracker() {
  const { themeStretch } = useSettingsContext();

  return (
    <AuthGuard>
      <Page title={PAGE_TITLE}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Tracker />
        </Container>
      </Page>
    </AuthGuard>
  );
}
