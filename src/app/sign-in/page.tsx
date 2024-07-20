import { adminLogin } from '@/service/admin/login';
import { LoginFormComponent } from './login-form';

const LoginPage = () => (
  <div>
    login page
    <LoginFormComponent
      adminLogin={adminLogin}
    />
  </div>
);

export default LoginPage;
