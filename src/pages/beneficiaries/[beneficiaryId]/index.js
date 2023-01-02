import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { ActionMenu, BeneficiaryViewComp } from '@sections/beneficiaries/view';
import { BeneficiaryProvider } from '@contexts/beneficiaries';
import { useAuthContext } from 'src/auth/useAuthContext';
import Iconify from '@components/iconify';

const PAGE_TITLE = 'Beneficiary: Details';

const BeneficiaryView = () => {
  const { themeStretch } = useSettingsContext();
  const { roles } = useAuthContext();

  const [beneficiaryCallModalOpen, setBeneficiaryCallModalOpen] = useState(false);

  const CallModal = {
    handleModal: () => {
      setBeneficiaryCallModalOpen((prev) => !prev);
    },
  };

  return (
    <BeneficiaryProvider>
      <Page
        title={PAGE_TITLE}
        nocard
        action={
          roles.isPalika && [
            <ActionMenu key="action" actionTitle={'Actions'} />,
            '  ',
            <Button
              key="call-button"
              startIcon={<Iconify icon="material-symbols:call-outline-sharp" />}
              variant="outlined"
              color="primary"
              onClick={CallModal.handleModal}
            >
              Call Beneficiary
            </Button>,
          ]
        }
      >
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <BeneficiaryViewComp
            handleBeneficiaryModal={CallModal.handleModal}
            beneficiaryCallModalOpen={beneficiaryCallModalOpen}
          />
        </Container>
      </Page>
    </BeneficiaryProvider>
  );
};

BeneficiaryView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

BeneficiaryView.propTypes = {};

export default BeneficiaryView;
