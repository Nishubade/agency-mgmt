import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import { useRahatAdmin } from '@services/contracts/useRahatAdmin';
import AmountForm from './AmountForm';
import { useRouter } from 'next/router';

CashTracker.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function CashTracker({ ...other }) {
  //#region States, Contexts, Hooks
  const { refresh, refreshData } = useProjectContext();
  const { getCashBalances, agencyChainData, sendToPalika, claimCash, contract } = useRahatAdmin();
  const [amountFormState, setAmountFormState] = useState(false);

  const {
    query: { projectId },
  } = useRouter();

  //#endregion

  const AmountFormActions = {
    open() {
      setAmountFormState(true);
    },
    close() {
      setAmountFormState(false);
    },
  };

  const CashActions = {
    async acceptCash() {
      await claimCash(agencyChainData.cashAllowance);
      refreshData();
    },

    async sendCashToPalika() {
      await sendToPalika(projectId, agencyChainData.cashBalance);
      refreshData();
    },
  };

  //#region UseEffects

  const init = useCallback(async () => {
    await getCashBalances();
  }, [contract, refresh]);

  useEffect(() => {
    init();
  }, [init]);

  //#endregion

  return (
    <>
      <AmountForm
        sendCash={CashActions.sendCashToPalika}
        handleClose={AmountFormActions.close}
        open={amountFormState}
      />
      <Card sx={{ width: '100%', mb: 1 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
            <Typography variant="body1">Cash Fund Tracker</Typography>
          </Stack>

          {agencyChainData?.cashAllowance > 0 && (
            <Alert
              sx={{ mt: 2 }}
              action={
                <Button color="inherit" size="small" onClick={CashActions.acceptCash}>
                  Accept
                </Button>
              }
            >
              {' '}
              You have received Rs. {agencyChainData?.cashAllowance}.
            </Alert>
          )}

          <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography variant="h4" sx={{ fontWeight: 400 }}>
                {agencyChainData?.cashBalance || '-'}
              </Typography>
              <Typography variant="body2">Your cash balance</Typography>
              <Button sx={{ mt: 2 }} variant="outlined" onClick={AmountFormActions.open}>
                Send cash to Palika
              </Button>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
