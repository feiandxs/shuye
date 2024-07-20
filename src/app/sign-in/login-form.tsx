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
import { useLogin } from './login.hooks';

interface LoginFormProps {
  adminLogin: (username: string, password: string) => Promise<{
    success: boolean;
    user?: { username: string; id: string; role: string | null };
    error?: string;
    errorCode?: string;
    message?: string;
  } | {
    success: boolean;
    error: string;
    errorCode: string;
  }>;
}

const LoginFormComponent = ({ adminLogin }: LoginFormProps) => {
  const {
    username,
    password,
    loading,
    alertInfo,
    handleLogin,
    handleInputChange,
  } = useLogin({ adminLogin });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>管理员登录</CardTitle>
          <CardDescription>请输入您的凭据以登录。</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='username'>用户名</Label>
                <Input
                  id='username'
                  placeholder='输入您的用户名'
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
                  placeholder='输入您的密码'
                  value={password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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
              {loading ? '登录中...' : '登录'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export { LoginFormComponent };
