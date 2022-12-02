import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import { useRahat } from '@services/contracts/useRahat';

CashTracker.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function CashTracker({ projectId, rahatChainData, refreshData, ...other }) {
  const { singleProject } = useProjectContext();
  const { claimTokenForProject } = useRahat();

  const acceptCash = async () => {
    console.log(projectId);
    await claimTokenForProject(projectId, rahatChainData.cashAllowance);
    refreshData();
  };

  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="body1">Cash Fund Tracker</Typography>
        </Stack>

        {rahatChainData?.cashAllowance > 0 && (
          <Alert
            sx={{ mt: 2 }}
            action={
              <Button color="inherit" size="small" onClick={acceptCash}>
                Accept
              </Button>
            }
          >
            {' '}
            You have received Rs. {rahatChainData?.cashAllowance}.
          </Alert>
        )}

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              {rahatChainData?.cashBalance || '-'}
            </Typography>
            <Typography variant="body2">Your cash balance</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
