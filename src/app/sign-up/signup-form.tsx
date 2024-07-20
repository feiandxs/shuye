'use client';

import { FormEvent } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { Admin } from '@prisma/client';
import { useCreateAdmin } from './sign-up.hooks';

interface SignUpFormProps {
  createNewAdmin: (username: string, password: string) => Promise<Admin>;
}

const SignUpFormComponent = ({ createNewAdmin }: SignUpFormProps) => {
  const {
    username,
    password,
    confirmPassword,
    loading,
    alertInfo,
    handleCreateAdmin,
    handleInputChange,
  } = useCreateAdmin({ createNewAdmin });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleCreateAdmin();
  };

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>创建管理员账户</CardTitle>
          <CardDescription>请填写以下信息创建新的管理员账户。</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='username'>用户名</Label>
                <Input
                  id='username'
                  placeholder='输入用户名'
                  value={username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='password'>密码</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='输入密码'
                  value={password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='confirmPassword'>确认密码</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='再次输入密码'
                  value={confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col items-stretch gap-4'>
            {alertInfo && (
              <Alert variant={alertInfo.type === 'error' ? 'destructive' : 'default'}>
                {alertInfo.type === 'error'
                  ? <ExclamationTriangleIcon className='h-4 w-4' />
                  : <CheckCircledIcon className='h-4 w-4' />}
                <AlertTitle>{alertInfo.title}</AlertTitle>
                <AlertDescription>
                  {alertInfo.description}
                </AlertDescription>
              </Alert>
            )}
            <Button
              type='submit'
              className='w-full py-6 text-lg'
              disabled={loading}
            >
              {loading ? '创建中...' : '创建管理员'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export { SignUpFormComponent };
