import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Stack, Button } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import ActionMenu from './ActionMenu';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import useLoading from '@hooks/useLoading';
import { AgencyCash, DonorCash, PalikaCash } from '../cash-tracker';
import { useRahat } from '@services/contracts/useRahat';
import { useAuthContext } from 'src/auth/useAuthContext';
import { PATH_REPORTS } from '@routes/paths';

const TitleCard = () => {
  const { roles } = useAuthContext();

  const { rahatChainData, projectBalance, contract } = useRahat();
  const { refresh, refreshData } = useProjectContext();
  const {
    push,
    query: { projectId },
  } = useRouter();

  const handleBeneficiaryRouteAction = () => {
    push(`/beneficiaries`);
  };

  const menuItems = [
    {
      name: 'View Demographic Report',
      onClick: () => push(PATH_REPORTS.demographic),
    },
    {
      name: 'View Ward Wise Report',
      onClick: () => push(PATH_REPORTS.wardReport),
    },
  ];

  const init = useCallback(
    async (projectId) => {
      await projectBalance(projectId);
    },
    [contract]
  );

  useEffect(() => {
    init(projectId);
  }, [init]);

  console.log({ rahatChainData })
  return (
    <>
      <Grid item xs={12} md={12}>
        <Card variant="outlined">
          <Stack sx={{ p: 1 }} direction="row" justifyContent="space-between" alignItems="center">
            <Button variant="outlined" onClick={handleBeneficiaryRouteAction}>
              {' '}
              Beneficiary List
            </Button>
            <ActionMenu menuItems={menuItems} actionTitle="Actions" />
          </Stack>
          {roles.isPalika && (
            <PalikaCash
              projectId={projectId}
              rahatChainData={rahatChainData}
              refresh={refresh}
              refreshData={refreshData}
            />
          )}
          {roles.isAgency && <AgencyCash rahatChainData={rahatChainData} />}
          {roles.isDonor && <DonorCash rahatChainData={rahatChainData} />}
        </Card>
      </Grid>
    </>
  );
};

export default TitleCard;
