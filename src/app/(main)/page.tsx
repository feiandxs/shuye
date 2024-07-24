import { Logo } from '@/components/common/logo';
import { SLoganComponent } from '@/app/(main)/components/slogan';
import { LoginContainer } from '@/app/(main)/components/login-container';

export default function Home() {
  return (
    <main
      id='home-page'
      className='flex flex-col justify-start items-center min-h-screen'
    >
      <div className='mt-24'><Logo size='extra-large' />
      </div>
      <SLoganComponent />
      <LoginContainer />
    </main>
  );
}
