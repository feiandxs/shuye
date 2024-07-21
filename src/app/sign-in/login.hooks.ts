// login.hooks.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginResult {
  success: boolean;
  user?: { username: string; id: string; role: string | null };
  error?: string;
  errorCode?: string;
  message?: string;
}

interface UseLoginProps {
  adminLogin: (username: string, password: string) => Promise<LoginResult>;
}

export const useLogin = ({ adminLogin }: UseLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ type: 'error' | 'success'; title: string; description: string; } | null>(null);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setAlertInfo(null);
    try {
      const result = await adminLogin(username, password);
      if (result.success) {
        setAlertInfo({
          type: 'success',
          title: '登录成功',
          description: `欢迎回来，${result.user?.username}！`,
        });
        // 添加重定向逻辑
        router.push('/dashboard');
      } else {
        setAlertInfo({
          type: 'error',
          title: '登录失败',
          description: result.error || '未知错误',
        });
      }
    } catch (error) {
      console.error('Login error', error);
      setAlertInfo({
        type: 'error',
        title: '登录错误',
        description: '发生了未知错误，请稍后再试。',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: 'username' | 'password', value: string) => {
    if (field === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
    if (alertInfo) {
      setAlertInfo(null);
    }
  };

  return {
    username,
    password,
    loading,
    alertInfo,
    handleLogin,
    handleInputChange,
  };
};
