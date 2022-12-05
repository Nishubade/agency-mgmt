import { useSnackbar } from 'notistack';

export const useErrorHandler = () => {
  const snackBar = useSnackbar();
  function showError(message) {
    snackBar.enqueueSnackbar(message, {
      variant: 'error',
      sx: {
        '& .SnackbarContent-root': {
          backgroundColor: '#e6ebf1 !important',
        },
      },
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  }

  function handleContractError(error) {
    try {
      let message = error.error.error.error.toString();
      message = message.replace('Error: VM Exception while processing transaction: revert ', '');
      showError(message);
    } catch (e) {
      showError('Error occured calling contract. Please check logs for details.');
      console.log(error);
    }
  }

  return {
    handleError: (e) => showError(e.message),
    apiError: showError,
    handleContractError,
  };
};
