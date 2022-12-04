/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { useRahatCash } from '@services/contracts/useRahatCash';
import AmountForm from './AmountForm';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import { useRahatAdmin } from '@services/contracts/useRahatAdmin';
import { useRahat } from '@services/contracts/useRahat';
import useDialog from '@hooks/useDialog';
import LoadingOverlay from '@components/LoadingOverlay';
import useLoading from '@hooks/useLoading';

Palika.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function Palika({ rahatChainData }) {
  //#region States, Contexts, Hooks
  const { refresh, refreshData } = useProjectContext();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { loading, showLoading, hideLoading } = useLoading();

  const { claimTokenForProject } = useRahat();

  const [data, setData] = useState({
    totalSupply: 0,
    donorBalance: 0,
    agencyAllowance: 0,
  });
  const {
    query: { projectId },
  } = useRouter();

  //#endregion

  const CashActions = {
    async acceptCash() {
      showLoading('cashTrack');
      await claimTokenForProject(projectId, rahatChainData.cashAllowance);
      refreshData();
      hideLoading('cashTrack');
    },
  };

  //#region UseEffects

  //#endregion

  return (
    <>
      <LoadingOverlay open={loading.cashTrack}>
        <Card sx={{ width: '100%', mb: 1 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Cash Fund Tracker (Palika)
              </Typography>
            </Stack>

            {rahatChainData?.cashAllowance > 0 && (
              <Alert
                sx={{ mt: 2 }}
                action={
                  <Button color="inherit" size="small" onClick={CashActions.acceptCash}>
                    Accept
                  </Button>
                }
              >
                {' '}
                You have received ₹ {rahatChainData?.cashAllowance}.
              </Alert>
            )}

            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  <small>₹</small> {rahatChainData?.cashBalance || '0'}
                </Typography>
                <small>Your cash balance</small>
                <Button sx={{ mt: 2 }} size="small" variant="outlined" onClick={showDialog}>
                  Send cash to Wards
                </Button>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </LoadingOverlay>
    </>
  );
}
