// next
import Head from 'next/head';
// auth
import GuestGuard from '@guards/GuestGuard';
// sections
import Login from '@sections/auth/Login';
import { LoginProvider } from './context';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <LoginProvider>
      <Head>
        <title> Login | Minimal UI</title>
      </Head>

      <GuestGuard>
        <Login />
      </GuestGuard>
    </LoginProvider>
  );
}
