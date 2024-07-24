export type LogoSize = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

export interface LogoProps {
  size: LogoSize;
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  const sizeClasses = {
    'extra-small': 'text-xs',
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    'extra-large': 'text-xl',
  };

  return (
    <div className={`font-black ${sizeClasses[size]}`}>
      Shuye
    </div>
  );
};

export { Logo };
