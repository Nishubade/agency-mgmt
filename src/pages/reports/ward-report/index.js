import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { useRouter } from 'next/router';
// import { RealTimeReportContextProvider, RealTimeReportsComp } from '@sections/reports/real-time';

// ----------------------------------------------------------------------

const PAGE_TITLE = 'Reports: Ward Report ';

WardReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function WardReport() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  console.log('router', router);
  return (
    <Page title={PAGE_TITLE} nocard>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <h1>Ward Report</h1>
        {JSON.stringify(router.query)}
      </Container>
    </Page>
  );
}
