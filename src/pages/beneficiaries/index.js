import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_BENEFICIARY } from '@routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == PATH_BENEFICIARY.root) {
      router.push(PATH_BENEFICIARY.list);
    }
  });

  return null;
}
