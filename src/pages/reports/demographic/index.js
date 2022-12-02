import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';

// ----------------------------------------------------------------------

const PAGE_TITLE = 'Reports: Demographic ';

DemographicReports.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function DemographicReports() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title={PAGE_TITLE} nocard>
      <Container maxWidth={themeStretch ? false : 'xl'}>RealTime Reports</Container>
    </Page>
  );
}
