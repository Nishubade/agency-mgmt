import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import TokenDetails from './TokenDetails';
import MoreInfoCard from './MoreInfoCard';
import ProjectsInvolved from './ProjectsInvolved';
import { HistoryTable } from '@sections/transactionTable';
import { useVendorsContext } from '@contexts/vendors';
import { useRouter } from 'next/router';
import { SPACING } from '@config';

const VendorsView = () => {
  const { getVendorById } = useVendorsContext();
  const {
    query: { vendorId },
  } = useRouter();

  useEffect(() => {
    getVendorById(vendorId);
  }, [getVendorById, vendorId]);

  return (
    <>
      {' '}
      <Grid container spacing={SPACING.GRID_SPACING}>
        <Grid item xs={12} md={6}>
          <BasicInfoCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <TokenDetails />
        </Grid>
        <Grid item xs={12} md={6}>
          <MoreInfoCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={SPACING.GRID_SPACING} xs={12} md={12}>
            <Grid item xs={12}>
              <ProjectsInvolved />
            </Grid>
            <Grid item xs={12}>
              <HistoryTable />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={4}>
            <MoreInfoCard />
          </Grid> */}
      </Grid>
      {/* <Stack sx={{ mt: 1 }}>
        <ProjectsInvolved />
      </Stack>
      <Stack sx={{ mt: 1 }}>
        <HistoryTable />
      </Stack> */}
    </>
  );
};

VendorsView.propTypes = {};

export default VendorsView;
