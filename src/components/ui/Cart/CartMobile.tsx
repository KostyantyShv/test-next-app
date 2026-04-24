'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Drawer } from 'vaul';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
}

interface CartMobileProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const CartMobile: React.FC<CartMobileProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const router = useRouter();
  const [isDesktopViewport, setIsDesktopViewport] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktopViewport(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, image: 'https://i.ibb.co/8DRBhzTm/product5.jpg', title: 'Master Microservices with Spring Boot and Spring Cloud', price: 149.99 },
    { id: 2, image: 'https://i.ibb.co/23PtGQWJ/product55.jpg', title: 'Java Tutorial for Complete Beginners', price: 19.99 },
    { id: 3, image: 'https://i.ibb.co/8DRBhzTm/product5.jpg', title: 'Rest API Automation With Rest Assured - Novice To Expert', price: 59.99 }
  ]);

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const goToCart = () => {
    onClose();
    router.push('/checkout');
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (isDesktopViewport) return null;

  return (
    <>
      {/* Scroll-lock so the page behind the drawer can't scroll/interact */}
      <ScrollLock isOpen={isOpen} />

      <Drawer.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-[4200] md:hidden bg-black/40"
            style={{ backgroundColor: "var(--cart-mobile-overlay-bg, rgba(0,0,0,0.35))" }}
            onClick={onClose}
          />

          <Drawer.Content
            className={cn(
              "fixed left-0 right-0 z-[4300] flex flex-col overflow-hidden outline-none md:hidden",
              "shadow-[0_-4px_12px_var(--shadow-color)]",
              className
            )}
            style={{
              top: "64px",
              height: "calc(100vh - 64px)",
              borderRadius: "20px 20px 0 0",
              backgroundColor: "var(--surface-color)",
            }}
          >
            <VisuallyHidden.Root asChild>
              <Drawer.Title>Cart</Drawer.Title>
            </VisuallyHidden.Root>

            {/* Drawer Handle */}
            <div
              className="relative flex justify-center items-center cursor-pointer py-2.5 flex-shrink-0"
              onClick={onClose}
            >
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: "var(--gray-300)" }} />
            </div>

            {/* Cart Content */}
            <div
              className="flex-1 overflow-y-auto flex flex-col"
              style={{
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-[var(--border-color)] sticky top-0 z-10 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-base font-semibold text-[var(--header-green)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.5 16.14L23.92 6l-18.8-.81L4.92 4A4.43 4.43 0 002.51.8L.58 0 0 1.39l1.88.78a2.88 2.88 0 011.56 2.11l2.5 14.86a2.54 2.54 0 103.57 3h5.93a2.54 2.54 0 100-1.5H9.52a2.53 2.53 0 00-2.1-1.79l-.31-1.83 15.39-.88zm-4.65 4.21a1 1 0 11-.1 1.997 1 1 0 01.1-1.997zm4.36-12.92l-1 7.29-14.33.84-1.51-8.85 16.84.72zM8.14 21.4a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                    Cart Items ({cartItems.length})
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 bg-[var(--surface-color)] border-none rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" style={{ color: "var(--text-default)" }}>
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="p-8 text-center text-[var(--subtle-text)]">
                    <svg className="w-16 h-16 mx-auto mb-4 text-[var(--subtle-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L3 3m4 10v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 13v-2a1 1 0 011-1h4a1 1 0 011 1v2"
                      />
                    </svg>
                    <div className="text-base text-[var(--subtle-text)] mb-2">Your cart is empty</div>
                    <div className="text-sm text-[var(--subtle-text)]">Add some items to get started</div>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-color)] relative group" style={{ backgroundColor: "var(--surface-secondary)" }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-[var(--border-color)]"
                        />
                        <div className="flex-1 min-w-0 pr-12">
                          <div className="text-sm font-semibold text-[var(--bold-text)] mb-1 line-clamp-2">
                            {item.title}
                          </div>
                          <div className="text-lg font-bold text-[var(--success-green)]">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeItem(item.id);
                          }}
                          onPointerDown={(e) => e.stopPropagation()}
                          className="absolute top-3 right-3 cursor-pointer p-2 rounded-full transition-all text-[var(--subtle-text)] hover:bg-[var(--hover-bg)] flex items-center justify-center"
                          title="Remove item"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 15 15" fill="none" style={{ color: "var(--subtle-text)" }}>
                            <path
                              clipRule="evenodd"
                              fillRule="evenodd"
                              fill="currentColor"
                              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-[var(--border-color)] flex-shrink-0" style={{ backgroundColor: "var(--surface-secondary)" }}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-[var(--bold-text)]">Total:</span>
                    <span className="text-2xl font-bold text-[var(--bold-text)]">${totalAmount.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={goToCart}
                    className="w-full py-4 px-6 bg-[var(--verification-blue)] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-colors"
                    style={{ backgroundColor: "var(--verification-blue)" }}
                  >
                    Go to cart
                  </button>
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

function ScrollLock({ isOpen }: { isOpen: boolean }) {
  useEffect(() => {
    if (!isOpen) return;

    const MOBILE_DRAWER_VISIBILITY_EVENT = 'mobile-drawer-visibility-change';

    const body = document.body;
    const root = document.documentElement;

    const currentCount = Number(body.dataset.mobileDrawerOpenCount || '0');
    const nextCount = currentCount + 1;
    body.dataset.mobileDrawerOpenCount = String(nextCount);
    body.dataset.mobileDrawerOpen = 'true';
    window.dispatchEvent(new Event(MOBILE_DRAWER_VISIBILITY_EVENT));

    let scrollY = 0;
    if (currentCount === 0) {
      scrollY = window.scrollY ?? window.pageYOffset ?? 0;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.dataset.mobileDrawerScrollY = String(scrollY);
    }

    return () => {
      const latestCount = Number(body.dataset.mobileDrawerOpenCount || '1');
      const decremented = Math.max(0, latestCount - 1);

      if (decremented === 0) {
        delete body.dataset.mobileDrawerOpenCount;
        delete body.dataset.mobileDrawerOpen;

        const savedScrollY = body.dataset.mobileDrawerScrollY;
        body.style.removeProperty('position');
        body.style.removeProperty('top');
        body.style.removeProperty('left');
        body.style.removeProperty('right');
        body.style.removeProperty('width');

        if (savedScrollY !== undefined) {
          delete body.dataset.mobileDrawerScrollY;
          const previousScrollBehavior = root.style.scrollBehavior;
          root.style.scrollBehavior = 'auto';
          window.scrollTo(0, Number(savedScrollY));
          requestAnimationFrame(() => {
            if (previousScrollBehavior) root.style.scrollBehavior = previousScrollBehavior;
            else root.style.removeProperty('scroll-behavior');
          });
        }
      } else {
        body.dataset.mobileDrawerOpenCount = String(decremented);
      }

      window.dispatchEvent(new Event(MOBILE_DRAWER_VISIBILITY_EVENT));
    };
  }, [isOpen]);

  return null;
}
