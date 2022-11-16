import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';

const BasicInfoCard = (props) => (
  <Card sx={{ width: '100%', mb: 1 }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
        <Typography variant="body1">Beneficiary Name</Typography>

        <Chip label="Active" />
      </Stack>

      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h4">98656564313</Typography>
          <Typography variant="body2">Phone</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h4">F</Typography>
          <Typography variant="body2">Gender</Typography>
        </Grid>
      </Stack>
    </CardContent>
  </Card>
);

BasicInfoCard.propTypes = {};

export default BasicInfoCard;
