import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { ChildrenProps } from '@/types/common';

export default function ProtectedRoutes({ children }: ChildrenProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof localStorage === undefined) return;
    if (router.pathname === '/signin') return;

    const lsAdvisorEmail = localStorage.getItem('adve');
    if (!lsAdvisorEmail) {
      router.push('/signin');
      return;
    }
  }, [router]);

  return <>{children}</>;
}
