import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_VENDORS } from '@routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == PATH_VENDORS.root) {
      router.push(PATH_VENDORS.list);
    }
  });

  return null;
}
