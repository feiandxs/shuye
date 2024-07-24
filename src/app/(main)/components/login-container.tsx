import Link from 'next/link';

export const LoginContainer = () => (
  <Link
    href='/sign-in'
    className='group relative inline-block mt-12'
  >
    <div
      className='absolute inset-0 translate-x-1 translate-y-1 transform rounded-lg bg-primary opacity-0 transition-all duration-200 group-hover:opacity-20'
    />
    <div
      className='relative rounded-lg bg-primary px-12 py-3 text-center text-white transition-all duration-200 hover:bg-opacity-80'
    >
      <span className='inline-block'>立刻开始</span>

    </div>
  </Link>
);
