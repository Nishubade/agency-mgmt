import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import TokenDetails from './TokenDetails';
import MoreInfoCard from './MoreInfoCard';
import ProjectsInvolved from './ProjectsInvolved';
import { HistoryTable } from '@sections/transactionTable';
import { useVendorsContext } from '@contexts/vendors';
import { useRouter } from 'next/router';
import { useRahat } from '@services/contracts/useRahat';
import { useRahatCash } from '@services/contracts/useRahatCash';

VendorView.propTypes = {};

export default function VendorView() {
  const { getVendorById, setChainData, chainData, refreshData, refresh } = useVendorsContext();
  const { vendorBalance, contract } = useRahat();
  const { contract: RahatCash } = useRahatCash();
  const {
    query: { vendorId },
  } = useRouter();

  const init = useCallback(async () => {
    if (!vendorId) return;
    const _vendorData = await getVendorById(vendorId);
    if (!_vendorData?.wallet_address) return;
    const _chainData = await vendorBalance(_vendorData?.wallet_address);
    setChainData(_chainData);
    RahatCash?.on('Approval', refreshData);
    RahatCash?.on('Transfer', refreshData);
  }, [vendorId, contract, RahatCash, refresh]);

  useEffect(() => {
    init();
    return () => RahatCash?.removeAllListeners();
  }, [init]);

  return (
    <>
      {' '}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BasicInfoCard chainData={chainData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TokenDetails chainData={chainData} />
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
}
