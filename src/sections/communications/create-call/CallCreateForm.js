import { Button, Chip, Stack } from '@mui/material';
import React from 'react';
import Iconify from '@components/iconify';

import CallSelectNumber from './CallSelectNumber';
import InputForm from './InputForm';
import { useCommunicationsContext } from '@contexts/communications';

const CallCreateForm = () => {
  const { beneficiaryOptions } = useCommunicationsContext();
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 0 }} justifyContent={'flex-end'}>
      <CallSelectNumber options={beneficiaryOptions} label={'Select Beneficiaries'} />

      <Chip
        label="OR"
        variant="outlined"
        sx={{
          p: 2,
          mt: 1,
        }}
      />
      <InputForm label="Enter Beneficiary Number" />
      <CallSelectNumber label={'Select Audio'} />
      <Button variant="contained" color="primary">
        Call
      </Button>
    </Stack>
  );
};

export default CallCreateForm;
