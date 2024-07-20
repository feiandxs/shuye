import { createNewAdmin } from '@/service/admin/create';
import { SignUpFormComponent } from './signup-form';

const SignUpPage = () => (
  <div>
    sign up page
    <SignUpFormComponent
      createNewAdmin={createNewAdmin}
    />
  </div>
);

export default SignUpPage;
