import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';

const MoreInfoCard = (props) => (
  <Card sx={{ width: '100%' }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
        <Typography variant="body1">More Information</Typography>
      </Stack>

      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            Rumsan
          </Typography>
          <Typography variant="body2">Project Manager</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Grid item xs={12} md={12}>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              Sept 15, 2022
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Created At</Typography>
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            Nagarjun - 10
          </Typography>
          <Typography variant="body2">Location</Typography>
        </Grid>
      </Stack>

      <Stack sx={{ p: 2 }}>
        <Typography variant="body1">Cash distribution to five more single women</Typography>
      </Stack>
    </CardContent>
  </Card>
);

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
