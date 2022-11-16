import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';

const BasicInfoCard = (props) => (
  <Card sx={{ width: '100%', mb: 1 }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
        <Typography variant="body1" sx={{ fontSize: 21, fontWeight: 600 }}>
          Mini Project_2 - 15,20 Sep 2022
        </Typography>

        <Chip label="DEFAULT PROJECT" />
      </Stack>

      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            Nagarjun
          </Typography>
          <Typography variant="body2">Location</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            11,000
          </Typography>
          <Typography variant="body2">Allocated Budget</Typography>
        </Grid>
      </Stack>
    </CardContent>
  </Card>
);

BasicInfoCard.propTypes = {};

export default BasicInfoCard;
