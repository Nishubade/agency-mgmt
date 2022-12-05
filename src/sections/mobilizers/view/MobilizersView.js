import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import TokenDetails from './TokenDetails';
import MoreInfoCard from './MoreInfoCard';
import ProjectsInvolved from './ProjectsInvolved';
import { HistoryTable } from '@sections/transactionTable';
import { useMobilizerContext } from '@contexts/mobilizers';
import { useRouter } from 'next/router';

const MobilizerView = () => {
  const { getByMobilizerId } = useMobilizerContext();
  const {
    query: { mobilizerId },
  } = useRouter();

  useEffect(() => {
    getByMobilizerId(mobilizerId);
  }, [getByMobilizerId, mobilizerId]);

  return (
    <>
      {' '}
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

MobilizerView.propTypes = {};

export default MobilizerView;
