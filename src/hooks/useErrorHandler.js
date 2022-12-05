import { Alert, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export const useErrorHandler = (error) => {
  const snackBar = useSnackbar();

  const errorMessage = error?.response?.data?.message || error?.message;

  useEffect(() => {
    if (errorMessage) {
      snackBar.enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    }
  }, [errorMessage, snackBar]);

  if (error) {
    return {
      error,
      errorMessage: errorMessage && (
        <Stack sx={{ p: 2 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Stack>
      ),
    };
  }
};
