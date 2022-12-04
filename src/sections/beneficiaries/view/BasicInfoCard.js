import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useBeneficiaryContext } from '@contexts/beneficiaries';

BasicInfoCard.propTypes = {
  chainData: PropTypes.object,
};

export default function BasicInfoCard({ chainData }) {
  const { singleBeneficiary } = useBeneficiaryContext();
  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Typography variant="body1">{singleBeneficiary?.name}</Typography>

          <div>
            {chainData?.totalTokenIssued ? (
              <>
                {chainData?.isBanked ? (
                  <Chip label="Banked" sx={{ mr: 1 }} variant="outlined" color="primary" />
                ) : (
                  <Chip label="Un-banked" sx={{ mr: 1 }} variant="outlined" color="secondary" />
                )}

                {chainData?.totalTokenIssued > 0 ? (
                  <Chip label="Active" color="success" />
                ) : (
                  <Chip label="Inactive" variant="outlined" color="error" />
                )}
              </>
            ) : (
              <Chip label="Inactive" variant="outlined" color="error" />
            )}
          </div>
        </Stack>

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h4">{singleBeneficiary?.phone}</Typography>
            <Typography variant="body2">Phone</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h4">{singleBeneficiary?.gender}</Typography>
            <Typography variant="body2">Gender</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
