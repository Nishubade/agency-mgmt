// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// hooks
import { useAuthContext } from '../../../auth/useAuthContext';
// layouts
import LoginLayout from '@layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithWallet from './AuthWithWallet';
import { APP_NAME } from '@config';
import Image from '@components/image';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <LoginLayout>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ p: 2 }}>
        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={'/assets/images/unicef-logo-white.png'}
          sx={{ width: 150 }}
        />
      </Stack>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in to {APP_NAME}</Typography>
      </Stack>

      <AuthLoginForm />

      <AuthWithWallet />
    </LoginLayout>
  );
}
