import type { MenuItem } from './types';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    href: '/dashboard',
  },
  {
    id: 'llm',
    label: 'LLM Management',
    icon: 'ai',
    children: [
      {
        id: 'providers',
        label: 'Providers',
        href: '/llm/providers',
      },
      {
        id: 'models',
        label: 'Models',
        href: '/llm/models',
      },
    ],
  },
  {
    id: 'users',
    label: 'User Management',
    icon: 'users',
    href: '/users',
  },
  {
    id: 'settings',
    label: '系统设置',
    icon: 'settings',
    children: [
      {
        id: 'general',
        label: '通用设置',
        href: '/dashboard/settings/general',
      },
      {
        id: 'security',
        label: 'Security Settings',
        href: '/settings/security',
      },
    ],
  },
];
