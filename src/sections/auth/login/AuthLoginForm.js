import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
// components
import FormProvider, { RHFTextField } from '@components/hook-form';
import { useLoginContext } from '../../../contexts/auth';
import { createRandomIdentity } from '@utils/web3Utils';
import { useRouter } from 'next/router';
import { PATH_AFTER_LOGIN } from '@config';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {
  const { handleOtpRequest, otpSent, handleOtpVerification } = useLoginContext();

  const router = useRouter();

  const [tempIdentity, setTempIdentity] = useState(null);
  const [otpSentMessage, setOTPSentMessage] = useState(null);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const OTPSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const otpMethods = useForm({
    resolver: yupResolver(OTPSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async ({ email }) => {
    try {
      const otpSent = await handleOtpRequest({ address: email, encryptionKey: tempIdentity.publicKey });
      setOTPSentMessage(otpSent?.msg);
      reset();
    } catch (error) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  const onEmailSubmitError = (error) => {
    console.error(error);
  };

  const onOtpSubmit = async ({ otp }) => {
    try {
      await handleOtpVerification({ otp, encryptionKey: tempIdentity.publicKey });

      router.reload();

      // window?.location?.reload();
      // router.replace();
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  useEffect(() => {
    const identity = createRandomIdentity();
    setTempIdentity(identity);
  }, []);

  if (otpSent) {
    return (
      <FormProvider methods={otpMethods} onSubmit={otpMethods.handleSubmit(onOtpSubmit)}>
        <Stack spacing={3} sx={{ mb: 3 }}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          {!!otpSentMessage && <Alert severity="info">{otpSentMessage} </Alert>}

          <RHFTextField name="otp" label="OTP Code" />
        </Stack>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={otpMethods.formState.isSubmitSuccessful || otpMethods.formState.isSubmitting}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Login
        </LoadingButton>
      </FormProvider>
    );
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onEmailSubmitError)}>
      <Stack spacing={3} sx={{ mb: 3 }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Send OTP
      </LoadingButton>
    </FormProvider>
  );
}
