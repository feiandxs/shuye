import { adminLogin } from '@/service/admin/login';
import { LoginFormComponent } from './login-form';
import { BackToHomeLink } from './back-home-link';

const LoginPage = () => (
  <div className='relative w-screen h-screen flex flex-col justify-center items-center'>
    <BackToHomeLink />
    <LoginFormComponent
      adminLogin={adminLogin}
    />
  </div>
);

export default LoginPage;
