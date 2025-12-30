'use client';

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CartMobile } from './CartMobile';
import Link from 'next/link';

interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  className,
  buttonRef,
}) => {
  const router = useRouter();
  const [arrowPosition, setArrowPosition] = useState<number>(24); // default right-6 = 24px
  const [panelRight, setPanelRight] = useState<number>(24); // default right position
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, image: 'https://i.ibb.co/8DRBhzTm/product5.jpg', title: 'Master Microservices with Spring Boot and Spring Cloud', price: 149.99 },
    { id: 2, image: 'https://i.ibb.co/23PtGQWJ/product55.jpg', title: 'Java Tutorial for Complete Beginners', price: 19.99 },
    { id: 3, image: 'https://i.ibb.co/8DRBhzTm/product5.jpg', title: 'Rest API Automation With Rest Assured - Novice To Expert', price: 59.99 }
  ]);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    // Перевіряємо, чи клік не на модалці
    if (modalRef.current && !modalRef.current.contains(target as Node)) {
      // Перевіряємо, чи клік на backdrop або поза модалкою
      const backdrop = document.querySelector('[data-backdrop="cart"]');
      if (backdrop && backdrop.contains(target)) {
        onClose();
      } else if (!target.closest('header')) {
        // Якщо клік не на header, закриваємо модалку
        onClose();
      }
    }
  }, [onClose]);

  // Calculate arrow position and panel position based on button position
  useLayoutEffect(() => {
    if (isOpen && buttonRef?.current) {
      const updateArrowPosition = () => {
        const button = buttonRef.current;
        if (button) {
          const buttonRect = button.getBoundingClientRect();
          const buttonCenterX = buttonRect.left + buttonRect.width / 2;
          const windowWidth = window.innerWidth;
          const panelWidth = 380; // w-[380px]
          
          // Calculate panel position: align arrow (at arrowPosition from right) with button center
          // We want: windowWidth - panelRight - arrowPosition = buttonCenterX
          // So: panelRight = windowWidth - buttonCenterX - arrowPosition
          // But we need to determine arrowPosition first
          // Let's use a target arrow position (e.g., 24px from right) and calculate panel position
          const targetArrowPosition = 24; // Default arrow position from right
          const calculatedRight = windowWidth - buttonCenterX - targetArrowPosition;
          
          // Ensure panel doesn't go off screen (min 24px from right, max to keep panel on screen)
          const minRight = 24;
          const maxRight = windowWidth - panelWidth - 24;
          const finalRight = Math.max(minRight, Math.min(maxRight, calculatedRight));
          setPanelRight(finalRight);
          
          // Calculate arrow position based on final panel position
          // Panel right edge is at: windowWidth - finalRight
          // Arrow is at: windowWidth - finalRight - arrowPosition
          // We want arrow center to align with button center: windowWidth - finalRight - arrowPosition = buttonCenterX
          // So: arrowPosition = windowWidth - finalRight - buttonCenterX
          const modalRight = windowWidth - finalRight;
          const distanceFromRight = modalRight - buttonCenterX;
          // Arrow is 16px wide (w-4), so center it
          setArrowPosition(distanceFromRight - 8); // 8px = half of 16px
        }
      };
      updateArrowPosition();
      window.addEventListener('resize', updateArrowPosition);
      window.addEventListener('scroll', updateArrowPosition, true);
      return () => {
        window.removeEventListener('resize', updateArrowPosition);
        window.removeEventListener('scroll', updateArrowPosition, true);
      };
    }
  }, [isOpen, buttonRef]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      try {
        if (document) {
          document.removeEventListener('mousedown', handleClickOutside);
        }
      } catch (error) {
        console.warn('Error removing event listener:', error);
      }
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const goToCart = () => {
    onClose();
    router.push('/checkout');
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Version */}
      <CartMobile isOpen={isOpen} onClose={onClose} className={className} />
      
      {/* Desktop Version */}
      <div className="fixed inset-0 z-[1001] hidden md:block">
      {/* Backdrop */}
      <div 
        className="absolute top-[75px] left-0 right-0 bottom-0 cursor-pointer" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
        onClick={onClose}
        data-backdrop="cart"
      />
      
      {/* Cart Modal */}
      <div 
        ref={modalRef}
        className={cn(
          "absolute top-[72px] right-0 w-[380px] bg-[var(--surface-color)] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.15)] border border-[var(--border-color)]",
          "opacity-0 visibility-hidden transform -translate-y-2.5 transition-all duration-300 ease-out",
          "z-[1000]",
          isOpen && "opacity-100 visibility-visible transform translate-y-0",
          className
        )}
        style={{
          backgroundColor: 'var(--surface-color) !important',
          position: 'fixed',
          top: '72px',
          right: `${panelRight}px`,
        }}
      >
        {/* Arrow pointer */}
        <div 
          className="absolute -top-2 w-4 h-4 bg-[var(--surface-color)] border border-[var(--border-color)] border-b-0 border-r-0 transform rotate-45" 
          style={{ right: `${arrowPosition}px` }}
        />
        
        {/* Modal Header */}
        <div className="p-5 pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2 text-base font-semibold text-[var(--header-green)] font-inter">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.5 16.14L23.92 6l-18.8-.81L4.92 4A4.43 4.43 0 002.51.8L.58 0 0 1.39l1.88.78a2.88 2.88 0 011.56 2.11l2.5 14.86a2.54 2.54 0 103.57 3h5.93a2.54 2.54 0 100-1.5H9.52a2.53 2.53 0 00-2.1-1.79l-.31-1.83 15.39-.88zm-4.65 4.21a1 1 0 11-.1 1.997 1 1 0 01.1-1.997zm4.36-12.92l-1 7.29-14.33.84-1.51-8.85 16.84.72zM8.14 21.4a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            Cart Items
          </div>
        </div>
        
        {/* Cart Items List */}
        <div className="max-h-[320px] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="p-10 text-center text-[var(--subtle-text)]">
              <svg className="w-12 h-12 mx-auto mb-3 text-[var(--subtle-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L3 3m4 10v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 13v-2a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
              <div className="text-sm text-[var(--subtle-text)] font-inter">Your cart is empty</div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-4 border-b border-[var(--border-color)] transition-colors hover:bg-[var(--hover-bg)] relative group">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-[var(--border-color)]"
                />
                <div className="flex-1 min-w-0 pr-10">
                  <div className="text-sm font-semibold text-[var(--bold-text)] mb-2 overflow-hidden text-ellipsis whitespace-nowrap text-left font-inter">
                    {item.title}
                  </div>
                  <div className="text-base font-bold text-[var(--success-green)] text-left font-inter">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 cursor-pointer p-1 rounded-full transition-all text-[var(--subtle-text)] opacity-0 group-hover:opacity-100 hover:bg-[var(--hover-bg)] flex items-center justify-center"
                  title="Remove item"
                >
                  <svg className="w-4 h-4" viewBox="0 0 15 15" fill="none">
                    <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
        
        {/* Modal Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[var(--surface-secondary)] border-t border-[var(--border-color)] rounded-b-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-semibold text-[var(--bold-text)] font-inter">Total:</span>
              <span className="text-xl font-bold text-[var(--bold-text)] font-inter">${totalAmount.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
            <button 
              onClick={goToCart}
              className="w-full py-3 px-6 bg-[var(--verification-blue)] text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-colors hover:opacity-90 font-inter"
            >
              Go to cart
            </button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </>
  );
};
