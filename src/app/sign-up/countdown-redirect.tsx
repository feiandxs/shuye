/* eslint-disable consistent-return */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CountdownRedirectProps {
  seconds: number;
  target: string;
}

const CountdownRedirect = ({ seconds, target }: CountdownRedirectProps) => {
  const [countdown, setCountdown] = useState(seconds);
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    router.push(target);
  }, [countdown, router, target]);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='text-2xl mb-4'>Admin already exists</div>
      <div className='text-lg'>Redirecting in {countdown} seconds...</div>
    </div>
  );
};

export default CountdownRedirect;
