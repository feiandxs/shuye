'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import type { MenuItem } from '@/app/dashboard/sidebar/types';
import { menuItems } from '@/app/dashboard/sidebar/menu-data';

const MenuItemComponent: React.FC<{ item: MenuItem; depth: number }> = ({ item, depth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = () => {
    if (item.children) {
      setIsOpen(!isOpen);
    }
  };

  const baseClasses = 'flex items-center w-full p-3 rounded-lg transition-all duration-200 ease-in-out';
  const linkClasses = `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md`;
  const buttonClasses = `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md ${isOpen ? 'bg-gray-700 text-white' : ''}`;

  return (
    <div className={`ml-${depth * 4} mb-2`}>
      {item.href ? (
        <Link
          href={item.href}
          className={linkClasses}
        >
          {item.icon && <span className={`mr-3 text-lg icon-${item.icon}`} />}
          <span className='font-medium'>{item.label}</span>
        </Link>
      ) : (
        <button
          type='button'
          onClick={toggleSubmenu}
          className={buttonClasses}
        >
          <span className='flex items-center flex-grow'>
            {item.icon && <span className={`mr-3 text-lg icon-${item.icon}`} />}
            <span className='font-medium'>{item.label}</span>
          </span>
          {item.children && (
            <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </span>
          )}
        </button>
      )}
      {item.children && isOpen && (
        <div className='mt-2 ml-4 space-y-2'>
          {item.children.map((child) => (
            <MenuItemComponent
              key={child.id}
              item={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const LeftSidebar: React.FC = () => (
  <nav className='h-full py-6 bg-gray-800'>
    <div className='px-6 mb-8'>
      <h1 className='text-2xl font-bold text-white'>Admin Dashboard</h1>
    </div>
    <div className='px-4 space-y-2'>
      {menuItems.map((item) => (
        <MenuItemComponent
          key={item.id}
          item={item}
          depth={0}
        />
      ))}
    </div>
  </nav>
);

export default LeftSidebar;
