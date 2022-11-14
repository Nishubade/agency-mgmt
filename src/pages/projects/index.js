import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_PROJECTS } from '@routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == PATH_PROJECTS.root) {
      router.push(PATH_PROJECTS.list);
    }
  });

  return null;
}
