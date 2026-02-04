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
  const [arrowPosition, setArrowPosition] = useState<number>(24); // kept for backward compatibility
  const [arrowLeft, setArrowLeft] = useState<number>(24);
  const [panelRight, setPanelRight] = useState<number>(24); // default right position
  const [panelTop, setPanelTop] = useState<number>(72); // default top position
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
          const panelWidth = modalRef.current?.offsetWidth ?? 400;
          
          // Calculate panel position: align arrow (at arrowPosition from right) with button center
          // We want: windowWidth - panelRight - arrowPosition = buttonCenterX
          // So: panelRight = windowWidth - buttonCenterX - arrowPosition
          // But we need to determine arrowPosition first
          // Let's use a target arrow position (e.g., 24px from right) and calculate panel position
          const targetArrowPosition = 20; // Match replica
          const calculatedRight = windowWidth - buttonCenterX - targetArrowPosition;
          
          // Ensure panel doesn't go off screen (min 24px from right, max to keep panel on screen)
          const minRight = 24;
          const maxRight = windowWidth - panelWidth - 24;
          const finalRight = Math.max(minRight, Math.min(maxRight, calculatedRight));
          setPanelRight(finalRight);

          // Set top position based on button position
          const calculatedTop = buttonRect.bottom + 16;
          setPanelTop(calculatedTop);
          
          // Calculate arrow position based on final panel position (use left for precise centering)
          const arrowSize = 16;
          const modalLeft = windowWidth - finalRight - panelWidth;
          const rawArrowLeft = buttonCenterX - modalLeft - arrowSize / 2;
          const clampedArrowLeft = Math.max(8, Math.min(panelWidth - arrowSize - 8, rawArrowLeft));
          setArrowLeft(clampedArrowLeft);
          setArrowPosition(windowWidth - finalRight - buttonCenterX - 8);

          requestAnimationFrame(() => {
            const modalRect = modalRef.current?.getBoundingClientRect();
            if (!modalRect) return;
            const updatedPanelWidth = modalRect.width || panelWidth;
            const rawLeft = buttonCenterX - modalRect.left - arrowSize / 2;
            const nextLeft = Math.max(8, Math.min(updatedPanelWidth - arrowSize - 8, rawLeft));
            setArrowLeft(nextLeft);
          });
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
      <div className="fixed inset-0 z-[1001] hidden md:block pointer-events-none">
      {/* Cart Modal */}
      <div 
        ref={modalRef}
        className={cn(
          "cart-modal absolute right-0 w-[400px] bg-[var(--surface-color)] rounded-[20px] shadow-[0_20px_60px_var(--shadow-strong)] border border-[var(--border-color)] pointer-events-auto overflow-hidden",
          className
        )}
        style={{
          backgroundColor: 'var(--surface-color) !important',
          position: 'fixed',
          top: `${panelTop}px`,
          right: `${panelRight}px`,
        }}
      >
        {/* Arrow pointer */}
        <div 
          className="cart-modal-arrow absolute -top-2 w-4 h-4 bg-[var(--surface-color)] border border-[var(--modal-arrow-border)] border-b-0 border-r-0 transform rotate-45" 
          style={{ left: `${arrowLeft}px` }}
        />
        
        {/* Modal Header */}
        <div className="modal-header px-6 pt-5 pb-4 border-b border-[var(--border-color)] bg-[var(--surface-secondary)]">
          <div className="modal-title flex items-center gap-2 text-[15px] font-bold text-[var(--header-green)] font-inter uppercase tracking-[0.5px]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.5 16.14L23.92 6l-18.8-.81L4.92 4A4.43 4.43 0 002.51.8L.58 0 0 1.39l1.88.78a2.88 2.88 0 011.56 2.11l2.5 14.86a2.54 2.54 0 103.57 3h5.93a2.54 2.54 0 100-1.5H9.52a2.53 2.53 0 00-2.1-1.79l-.31-1.83 15.39-.88zm-4.65 4.21a1 1 0 11-.1 1.997 1 1 0 01.1-1.997zm4.36-12.92l-1 7.29-14.33.84-1.51-8.85 16.84.72zM8.14 21.4a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            Your Cart
          </div>
        </div>
        
        {/* Cart Items List */}
        <div className="cart-items-list max-h-[340px] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="empty-cart p-10 text-center text-[var(--subtle-text)]">
              <svg className="w-14 h-14 mx-auto mb-4 text-[var(--gray-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L3 3m4 10v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 13v-2a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
              <div className="empty-cart-text text-sm font-medium text-[var(--subtle-text)] font-inter">Your cart is empty</div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item flex items-center gap-[14px] px-6 py-[18px] border-b border-[var(--border-color)] transition-colors hover:bg-[var(--hover-bg)] relative group">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="item-image w-14 h-14 rounded-[12px] object-cover flex-shrink-0 border-2 border-[var(--border-color)]"
                />
                <div className="item-content flex-1 min-w-0 pr-9">
                  <div className="item-title text-[14px] font-semibold text-[var(--bold-text)] mb-2 overflow-hidden text-ellipsis whitespace-nowrap text-left font-inter leading-[1.3]">
                    {item.title}
                  </div>
                  <div className="item-price text-[17px] font-bold text-[var(--success-green)] text-left font-inter">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-item absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer p-2 rounded-[10px] transition-all text-[var(--subtle-text)] opacity-0 group-hover:opacity-100 hover:bg-[var(--remove-hover-bg)] hover:text-[var(--active-green)] flex items-center justify-center"
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
          <div className="modal-footer px-6 py-5 bg-[var(--surface-secondary)] border-t border-[var(--border-color)]">
            <div className="cart-total flex justify-between items-center mb-4">
              <span className="total-label text-[14px] font-semibold text-[var(--subtle-text)] font-inter uppercase tracking-[0.5px]">Total</span>
              <span className="total-amount text-[24px] font-bold text-[var(--bold-text)] font-inter">${totalAmount.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
            <button 
              onClick={goToCart}
              className="go-to-cart-btn w-full py-[14px] px-6 bg-[var(--btn-primary-bg)] text-white border-none rounded-[12px] text-[15px] font-bold cursor-pointer transition-all hover:bg-[var(--btn-primary-hover)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_var(--shadow-color)] font-inter tracking-[0.5px]"
            >
              Go to Cart
            </button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </>
  );
};
