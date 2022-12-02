import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useVendorsContext } from '@contexts/vendors';

const MoreInfoCard = (props) => {
  const { singleVendor } = useVendorsContext();

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="h5">Profile Information</Typography>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={6}>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleVendor?.shopName}</Typography>
                <Typography variant="body2">Shop Name</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleVendor?.gender}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Gender</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleVendor?.phone}</Typography>
                <Typography variant="body2">Phone</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleVendor?.email}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Email</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleVendor?.pan}</Typography>
                <Typography variant="body2">PAN</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleVendor?.address}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Address</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleVendor?.registrationDate}</Typography>
                <Typography variant="body2">Registration Date</Typography>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
