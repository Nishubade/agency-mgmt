import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import TokenDetails from './TokenDetails';
import MoreInfoCard from './MoreInfoCard';
import ProjectsInvolved from './ProjectsInvolved';
import { HistoryTable } from '@sections/transactionTable';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { useRouter } from 'next/router';

const BeneficiaryView = () => {
  const { getBeneficiaryById } = useBeneficiaryContext();

  const {
    query: { beneficiaryId },
  } = useRouter();

  useEffect(() => {
    getBeneficiaryById(beneficiaryId);
  }, [getBeneficiaryById, beneficiaryId]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BasicInfoCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <TokenDetails />
        </Grid>
        {/* <Grid item xs={12} md={4}>
            <MoreInfoCard />
          </Grid> */}
      </Grid>
      <Stack>
        <MoreInfoCard />
      </Stack>
      <Stack sx={{ mt: 1 }}>
        <ProjectsInvolved />
      </Stack>
      <Stack sx={{ mt: 1 }}>
        <HistoryTable />
      </Stack>
    </>
  );
};

BeneficiaryView.propTypes = {};

export default BeneficiaryView;
