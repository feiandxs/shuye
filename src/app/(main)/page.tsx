import { SLoganComponent } from '@/app/(main)/components/slogan';

export default function Home() {
  return (
    <main
      id='home-page'
      className='flex min-h-screen flex-col justify-start items-center'
    >
      homepage
      <SLoganComponent />
    </main>
  );
}
