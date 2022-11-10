// next
import Head from 'next/head';
// auth
import GuestGuard from '../guards/GuestGuard';
// sections
import Login from '../sections/auth/Login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Head>
        <title> Login | Minimal UI</title>
      </Head>

      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
}
