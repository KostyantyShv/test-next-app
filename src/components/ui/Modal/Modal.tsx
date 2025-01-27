import { FC, useEffect, useState } from 'react';
import { Portal } from '../Portal';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  className 
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className={cn(
              "relative bg-white rounded-lg shadow-xl",
              "w-full max-w-md p-6",
              "transform transition-all",
              className
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}; 