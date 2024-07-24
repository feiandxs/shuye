import { adminLogin } from '@/service/admin/login';
import { LoginFormComponent } from './login-form';

const LoginPage = () => (
  <div className='w-screen h-screen flex flex-col justify-center items-center'>

    <LoginFormComponent
      adminLogin={adminLogin}
    />
  </div>
);

export default LoginPage;
