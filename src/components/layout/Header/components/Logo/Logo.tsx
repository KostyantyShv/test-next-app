import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'compact';
  className?: string;
}

export const Logo: FC<LogoProps> = ({ variant = 'compact', className }) => {
  if (variant === 'full') {
    return (
      <Link href="/" className={cn('flex items-center', className)}>
        <Image
          src="/images/logo-full.jpg"
          alt="TaskX Logo"
          width={240}
          height={80}
          className="h-20 w-auto"
          priority
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={cn('flex items-center gap-4', className)}>
      <Image
        src="/images/logo-semi.png"
        alt="TaskX Icon"
        width={80}
        height={80}
        className="h-20 w-auto"
        priority
      />
      <div className="inline-flex items-start gap-3">
        <span className="font-inter font-bold text-[48px] leading-none tracking-[-0.02em] text-primary">
          TASK
        </span>
        <div className="relative inline-flex flex-col">
          <span className="font-montserrat font-semibold text-[48px] leading-none tracking-[0.01em] text-secondary mb-[3px]">
            X
          </span>
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-accent origin-left transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
};
