import React from 'react';

export type LogoSize = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

export interface LogoProps {
  size: LogoSize;
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  const sizeClasses = {
    'extra-small': 'text-sm',
    small: 'text-normal',
    medium: 'text-4xl',
    large: 'text-6xl',
    'extra-large': 'text-8xl',
  };

  return (
    <div className={`font-black ${sizeClasses[size]} p-4`}>
      Shuye
    </div>
  );
};

export { Logo };
