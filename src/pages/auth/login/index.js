// next
import Head from 'next/head';
// auth
import GuestGuard from '@guards/GuestGuard';
// sections
import { LoginComp, LoginProvider } from '@sections/auth';
import { APP_NAME } from '@config';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <LoginProvider>
      <Head>
        <title> Login | {APP_NAME}</title>
      </Head>

      <GuestGuard>
        <LoginComp />
      </GuestGuard>
    </LoginProvider>
  );
}
