import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { RealTimeReportContextProvider, RealTimeReportsComp } from '@sections/reports/real-time';

// ----------------------------------------------------------------------

const PAGE_TITLE = 'Reports: Real Time ';

RealTimeReports.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function RealTimeReports() {
  const { themeStretch } = useSettingsContext();

  return (
    <RealTimeReportContextProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <RealTimeReportsComp />
        </Container>
      </Page>
    </RealTimeReportContextProvider>
  );
}
