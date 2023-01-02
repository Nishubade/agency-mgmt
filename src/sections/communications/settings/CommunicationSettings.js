import { SPACING } from '@config';
import { Grid } from '@mui/material';
import React from 'react';
import AudioList from './AudioList';

const CommunicationSettings = () => {
  return (
    <Grid container spacing={SPACING.GRID_SPACING}>
      <Grid item xs={12} md={4}>
        <AudioList />
      </Grid>
    </Grid>
  );
};

export default CommunicationSettings;
