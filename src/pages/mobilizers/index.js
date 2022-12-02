import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_MOBILIZERS } from '@routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == PATH_MOBILIZERS.root) {
      router.push(PATH_MOBILIZERS.list);
    }
  });

  return null;
}
