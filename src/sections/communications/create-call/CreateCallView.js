import { useCommunicationsContext } from '@contexts/communications';
import { Stack } from '@mui/material';
import React, { useEffect } from 'react';
import CallCreateForm from './CallCreateForm';

const CreateCallView = () => {
  const { getBeneficiariesList } = useCommunicationsContext();

  useEffect(() => {
    getBeneficiariesList();
  }, []);

  return (
    <Stack>
      <CallCreateForm />
    </Stack>
  );
};

export default CreateCallView;
