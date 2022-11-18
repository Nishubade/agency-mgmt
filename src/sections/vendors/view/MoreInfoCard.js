import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';

const MoreInfoCard = (props) => (
  <Card sx={{ width: '100%' }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
        <Typography variant="h5">More Information</Typography>
      </Stack>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography variant="body1">{'Jaleshwor, Janakpur'}</Typography>
              <Typography variant="body2">Address</Typography>
            </Grid>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Grid item xs={12} md={12}>
                <Typography variant="body1">{'10'}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Ward</Typography>
              </Grid>
            </Grid>
          </Stack>
          <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography variant="body1">{'98654231222'}</Typography>
              <Typography variant="body2">Phone</Typography>
            </Grid>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Grid item xs={12} md={12}>
                <Typography variant="body1">{'email@gmail.com'}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Email</Typography>
              </Grid>
            </Grid>
          </Stack>
          <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography variant="body1">{'33'}</Typography>
              <Typography variant="body2">Age</Typography>
            </Grid>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Grid item xs={12} md={12}>
                <Typography variant="body1">{'40+'}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Category</Typography>
              </Grid>
            </Grid>
          </Stack>
          <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography variant="body1">{'656524'}</Typography>
              <Typography variant="body2">Government Id Type</Typography>
            </Grid>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Grid item xs={12} md={12}>
                <Typography variant="body1">{'585'}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Government ID</Typography>
              </Grid>
            </Grid>
          </Stack>
          <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography variant="body1">{'+2'}</Typography>
              <Typography variant="body2">Education</Typography>
            </Grid>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Grid item xs={12} md={12}>
                <Typography variant="body1">{'Doctor'}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Profession</Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={6} alignContent="flex-end">
          <Box component="img" alt={'empty'} src={`/assets/illustrations/id-icon.png`} />
          <Grid container direction="column" justifyContent="flex-start" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body1">{'16th Nov, 2022, 4:10 PM'}</Typography>
            <Typography variant="body2">Registration Date</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5">Bank Details</Typography>
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{'Laxmi Bank'}</Typography>
                <Typography variant="body2">Bank</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{'Bank User'}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Bank Account Name</Typography>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{'LXM22'}</Typography>
                <Typography variant="body2">Swift Code</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{'456656163566565'}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Bank Account Number</Typography>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </Card>
);

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
