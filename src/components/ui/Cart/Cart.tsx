'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, image: 'https://i.ibb.co/8DRBhzTm/product5.jpg', title: 'Master Microservices with Spring Boot and Spring Cloud', price: 149.99 },
    { id: 2, image: 'https://i.ibb.co/23PtGQWJ/product55.jpg', title: 'Java Tutorial for Complete Beginners', price: 19.99 },
    { id: 3, image: 'https://i.ibb.co/8DRBhzTm/product5.jpg', title: 'Rest API Automation With Rest Assured - Novice To Expert', price: 59.99 }
  ]);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    if (modalRef.current && !modalRef.current.contains(target)) {
      // Додаткова перевірка: переконаємося, що клік не на backdrop
      const backdrop = document.querySelector('[data-backdrop="cart"]');
      if (backdrop && backdrop.contains(target)) {
        onClose();
      }
    }
  }, [onClose]);

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
        className="absolute inset-0 bg-black bg-opacity-25 cursor-pointer" 
        onClick={onClose}
        data-backdrop="cart"
      />
      
      {/* Cart Modal */}
      <div 
        ref={modalRef}
        className={cn(
          "absolute top-[72px] right-0 w-[380px] bg-white rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.15)] border border-[#eaeaea]",
          "opacity-0 visibility-hidden transform -translate-y-2.5 transition-all duration-300 ease-out",
          "z-[1000]",
          isOpen && "opacity-100 visibility-visible transform translate-y-0",
          className
        )}
        style={{
          backgroundColor: 'white !important',
          position: 'fixed',
          top: '72px',
          right: '24px',
        }}
      >
        {/* Arrow pointer */}
        <div className="absolute -top-2 right-6 w-4 h-4 bg-white border border-[#eaeaea] border-b-0 border-r-0 transform rotate-45" />
        
        {/* Modal Header */}
        <div className="p-5 pb-4 border-b border-[#eaeaea]">
          <div className="flex items-center gap-2 text-base font-semibold text-[#016853]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.5 16.14L23.92 6l-18.8-.81L4.92 4A4.43 4.43 0 002.51.8L.58 0 0 1.39l1.88.78a2.88 2.88 0 011.56 2.11l2.5 14.86a2.54 2.54 0 103.57 3h5.93a2.54 2.54 0 100-1.5H9.52a2.53 2.53 0 00-2.1-1.79l-.31-1.83 15.39-.88zm-4.65 4.21a1 1 0 11-.1 1.997 1 1 0 01.1-1.997zm4.36-12.92l-1 7.29-14.33.84-1.51-8.85 16.84.72zM8.14 21.4a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            Cart Items
          </div>
        </div>
        
        {/* Cart Items List */}
        <div className="max-h-[320px] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="p-10 text-center text-[#5F5F5F]">
              <svg className="w-12 h-12 mx-auto mb-3 text-[#5F5F5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L3 3m4 10v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 13v-2a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
              <div className="text-sm text-[#5F5F5F]">Your cart is empty</div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-4 border-b border-[#eaeaea] transition-colors hover:bg-[#f9fafb] relative group">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-[#eaeaea]"
                />
                <div className="flex-1 min-w-0 pr-10">
                  <div className="text-sm font-semibold text-[#464646] mb-2 overflow-hidden text-ellipsis whitespace-nowrap text-left">
                    {item.title}
                  </div>
                  <div className="text-base font-bold text-[#089E68] text-left">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 cursor-pointer p-1 rounded-full transition-all text-[#9CA3AF] opacity-0 group-hover:opacity-100 hover:bg-[#f3f4f6] flex items-center justify-center"
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
          <div className="p-5 bg-[#f8f9fa] border-t border-[#eaeaea] rounded-b-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-semibold text-[#464646]">Total:</span>
              <span className="text-xl font-bold text-[#464646]">${totalAmount.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
            <button 
              onClick={goToCart}
              className="w-full py-3 px-6 bg-[#1D77BD] text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-colors hover:bg-[#1a6ba8]"
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
