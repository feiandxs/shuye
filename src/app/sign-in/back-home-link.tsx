import Link from 'next/link';

export const BackToHomeLink = () => (
  <Link
    href='/'
    className='absolute top-4 left-8 text-primary hover:text-primary-dark transition-colors duration-200'
  >
    ← 返回首页
  </Link>
);
