import { createNewAdmin, ifAdminEmpty } from '@/service/admin/create';
import dynamic from 'next/dynamic';
import { SignUpFormComponent } from './signup-form';

const CountdownRedirect = dynamic(() => import('./countdown-redirect'), { ssr: false });

const SignUpPage = async () => {
  const isAdminEmpty = await ifAdminEmpty();
  console.log('isAdminEmpty:', isAdminEmpty);

  if (isAdminEmpty) {
    // 如果没有管理员，显示注册表单
    return (
      <div>
        <SignUpFormComponent
          createNewAdmin={createNewAdmin}
        />
      </div>
    );
  }

  // 如果已经有管理员，重定向到登录页面
  return (
    <CountdownRedirect
      seconds={3}
      target='/sign-in'
    />
  );
};

export default SignUpPage;
