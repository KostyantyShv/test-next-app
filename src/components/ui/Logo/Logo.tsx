import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'compact';
  className?: string;
  collapsed?: boolean;
}

export const Logo: FC<LogoProps> = ({ variant = 'compact', className, collapsed }) => {
  if (variant === 'full') {
    return (
      <Link href="/" className={cn('flex items-center', className)}>
        <Image
          src="/images/logo-full.jpg"
          alt="TaskX Logo"
          width={120}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <Image
        src="/images/logo-semi.png"
        alt="TaskX Icon"
        width={32}
        height={32}
        className="h-8 w-8"
        priority
      />
      {!collapsed && (
        <div className="inline-flex items-start gap-2">
          <span className="font-inter font-bold text-xl leading-none tracking-[-0.02em] text-primary">
            TASK
          </span>
          <div className="relative inline-flex flex-col">
            <span className="font-montserrat font-semibold text-xl leading-none tracking-[0.01em] text-secondary mb-[2px]">
              X
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-left transition-all duration-300" />
          </div>
        </div>
      )}
    </Link>
  );
}; 