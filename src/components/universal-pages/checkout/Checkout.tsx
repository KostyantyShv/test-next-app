'use client';

import React, { useState } from 'react';
import { CartItem as CartItemType, PaymentFormData } from './types';
import { initialCartItems } from './constants';
import { CartItemCard, PaymentForm, OrderSummary } from './components';

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);
  const [formData, setFormData] = useState<PaymentFormData>({
    email: 'user@example.com',
    cardNumber: '4532 1234 5678 0912',
    expiryDate: '12/28',
    cvc: '123',
    cardHolder: 'John Smith',
    address: '1234 Enterprise Way',
    cityState: 'San Francisco, CA',
    zip: '94105',
  });

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateFormField = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = 524.00;
  const vat = (subtotal - discount) * 0.2;
  const total = subtotal - discount + vat;

  const handlePayment = () => {
    if (formData.email && cartItems.length > 0) {
      alert('Processing payment...');
    } else if (!formData.email) {
      alert('Please enter your email address');
    } else {
      alert('Cart is empty');
    }
  };

  return (
    <div className="checkout-page min-h-screen py-4 md:py-10 pb-6 md:pb-10">
      <div className="checkout-grid max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 px-4 md:px-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="checkout-card md:bg-white md:rounded-2xl md:p-8 md:shadow-sm">
            <div className="checkout-header bg-white md:bg-transparent rounded-xl md:rounded-none p-5 md:p-0 shadow-sm md:shadow-none mb-4 md:mb-8">
              <h1 className="checkout-title text-2xl md:text-[28px] font-semibold text-[#1B1B1B]">Shopping Cart</h1>
              <div className="checkout-subtitle text-sm text-[#5F5F5F] mt-1 md:hidden">
                {cartItems.length} items in cart
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-3 md:space-y-6">
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} onRemove={removeItem} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-6 self-start mt-4 lg:mt-0">
          <div className="checkout-sidebar-card bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-sm">
            <div className="checkout-payment-header flex justify-between items-center mb-5 md:mb-6 px-4 mt-4 md:mt-0">
              <h2 className="checkout-payment-title text-lg md:text-xl font-semibold text-[#1B1B1B]">Payment Details</h2>
              <span className="checkout-payment-count text-xs md:text-sm text-[#5F5F5F] font-medium">
                {cartItems.length} ITEMS
              </span>
            </div>

            <PaymentForm formData={formData} onChange={updateFormField} />

            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              vat={vat}
              total={total}
              itemCount={cartItems.length}
              onPayment={handlePayment}
              disabled={cartItems.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
