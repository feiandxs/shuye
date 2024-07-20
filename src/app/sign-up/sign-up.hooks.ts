// sign-up.hooks.ts
import { useState } from 'react';
import { Admin } from '@prisma/client';

interface CreateAdminResult {
  success: boolean;
  admin?: Admin;
  error?: string;
  errorCode?: string;
}

interface UseCreateAdminProps {
  createNewAdmin: (username: string, password: string) => Promise<Admin>;
}

export const useCreateAdmin = ({ createNewAdmin }: UseCreateAdminProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: 'error' | 'success';
    title: string;
    description: string;
  } | null>(null);

  const handleCreateAdmin = async (): Promise<void> => {
    setLoading(true);
    setAlertInfo(null);

    try {
      // 检查密码是否匹配
      if (password !== confirmPassword) {
        setAlertInfo({
          type: 'error',
          title: '密码不匹配',
          description: '请确保两次输入的密码相同。',
        });
        setLoading(false);
        return;
      }

      // 创建新管理员
      const newAdmin = await createNewAdmin(username, password);

      setAlertInfo({
        type: 'success',
        title: '创建成功',
        description: `管理员 ${newAdmin.username} 已成功创建。`,
      });

      // 清空表单
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Create admin error:', error);
      setAlertInfo({
        type: 'error',
        title: '创建失败',
        description: error instanceof Error ? error.message : '创建管理员时发生未知错误。',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: 'username' | 'password' | 'confirmPassword', value: string) => {
    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        console.warn(`Unexpected field: ${field}`);
    }
    if (alertInfo) {
      setAlertInfo(null);
    }
  };

  return {
    username,
    password,
    confirmPassword,
    loading,
    alertInfo,
    handleCreateAdmin,
    handleInputChange,
  };
};
