'use client';

import React, { useState, useRef, useEffect } from 'react';
import DesktopTabs from './components/DesktopTabs';
import DesktopFooter from './components/DesktopFooter';

interface VerificationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Verification: React.FC<VerificationProps> = ({ isOpen = true, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState({
    firstName: 'Noah',
    lastName: 'Tremblay',
    address: '3255 Annalyn Crt, Mississauga, ON L5C 1Y6',
    dateOfBirth: '1993-07-11',
    gender: 'Male',
    documentType: 'Identity Card',
    businessEmail: '',
    businessName: '',
    businessWebsite: '',
    phoneNumber: '',
    phoneCountry: '🇺🇸 +1',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    websiteUrl: '',
    verificationMethod: 'HTML Tag'
  });
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File}>({});
  const [verificationCode, setVerificationCode] = useState(['8', '9', '4', '5', '4']);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [showPhoneCode, setShowPhoneCode] = useState(false);
  const [dropdowns, setDropdowns] = useState<{[key: string]: boolean}>({});

  const fileInputRefs = useRef<{[key: string]: HTMLInputElement | null}>({});
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const verificationSteps = [
    'identity', 'payment', 'business', 'phone', 'address', 'ownership'
  ];

  const stepTitles = [
    'Identity', 'Payment', 'Business', 'Phone', 'Address', 'Ownership'
  ];

  useEffect(() => {
    if (formData.phoneNumber.length >= 10) {
      setTimeout(() => setShowPhoneCode(true), 1000);
    }
  }, [formData.phoneNumber]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (step: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploadedFiles(prev => ({ ...prev, [step]: file }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const goToNextStep = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < verificationSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleDropdown = (dropdown: string) => {
    setDropdowns(prev => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      if (value && index < verificationCode.length - 1) {
        codeInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-[modalSlideIn_0.3s_ease-out] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 pb-0 relative flex-shrink-0">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Account Verification</h2>
          <p className="text-sm text-gray-500 mb-6">Complete the verification steps to secure your account</p>
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-500 hover:bg-gray-100 p-1 rounded w-8 h-8 flex items-center justify-center text-2xl leading-none transition-colors"
          >
            ×
          </button>
          
          {/* Verification Tabs */}
          <DesktopTabs titles={[...stepTitles]} currentStep={currentStep} completedSteps={new Set(completedSteps)} onSelect={(i) => goToStep(i)} />
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6">
          {/* Step 1: Identity Verification */}
          {currentStep === 0 && (
            <div className="animate-[stepFadeIn_0.3s_ease-out]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verify your identity</h3>
              <p className="text-sm text-gray-500 mb-5">Upload a government-issued ID to verify your identity</p>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-2">Personal Information</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-600 bg-green-50 border-green-500 pr-10"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-base">✓</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-600 bg-green-50 border-green-500 pr-10"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-base">✓</span>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-600 bg-green-50 border-green-500 pr-10"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-base">✓</span>
                </div>
              </div>

              <div className="mb-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-600 bg-green-50 border-green-500 pr-20"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                    <button
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
                      onClick={() => (document.querySelector('input[type="date"]') as HTMLInputElement)?.showPicker()}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 21 20">
                        <rect strokeWidth="1.8" stroke="currentColor" rx="1.1" height="12.9483" width="12.9483" y="4.11997" x="4.02549"></rect>
                        <path strokeLinecap="round" strokeWidth="1.8" stroke="currentColor" d="M6.61084 2.03052L6.61084 3.85142"></path>
                        <path strokeLinecap="round" strokeWidth="1.8" stroke="currentColor" d="M14.3892 2.03052L14.3892 3.85142"></path>
                        <path strokeLinecap="round" strokeWidth="1.8" stroke="currentColor" d="M4.32861 8.24927L16.6704 8.24927"></path>
                        <circle fill="currentColor" r="1.20025" cy="12.5726" cx="8.43072"></circle>
                        <circle fill="currentColor" r="1.20025" cy="12.5726" cx="12.5684"></circle>
                      </svg>
                    </button>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-base">✓</span>
                  </div>
                  <div className="relative">
                    <div className="relative">
                      <button
                        type="button"
                        className="w-full px-4 py-3 border border-green-500 rounded-lg text-sm text-gray-600 bg-green-50 pr-10 text-left"
                        onClick={() => toggleDropdown('gender')}
                      >
                        <span>{formData.gender}</span>
                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                        </svg>
                      </button>
                      {dropdowns.gender && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
                          <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50" onClick={() => {handleInputChange('gender', 'Male'); toggleDropdown('gender');}}>Male</button>
                          <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50" onClick={() => {handleInputChange('gender', 'Female'); toggleDropdown('gender');}}>Female</button>
                        </div>
                      )}
                    </div>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-base">✓</span>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-2">Verify my identity using</label>
                <div className="flex gap-2">
                  {['Identity Card', 'Driver License', 'Passport'].map((type) => (
                    <button
                      key={type}
                      className={`flex-1 px-4 py-3 border rounded-lg text-sm transition-all ${
                        formData.documentType === type
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 bg-white text-gray-500'
                      }`}
                      onClick={() => handleInputChange('documentType', type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-2">Front side</label>
                {uploadedFiles.identityFront ? (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-500">📄</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-600">{uploadedFiles.identityFront.name}</div>
                      <div className="text-xs text-gray-500">{formatFileSize(uploadedFiles.identityFront.size)} - Upload complete</div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                    onClick={() => fileInputRefs.current.identityFront?.click()}
                  >
                    <div className="text-4xl mb-3">📤</div>
                    <div className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</div>
                    <div className="text-xs text-gray-500">PDF, JPG, JPEG, PNG less than 10MB</div>
                    <div className="text-xs text-gray-500">Ensure your document are in good condition and readable</div>
                    <input
                      ref={el => { fileInputRefs.current.identityFront = el; }}
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('identityFront', e.target.files)}
                    />
                  </div>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-2">Back side</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  onClick={() => fileInputRefs.current.identityBack?.click()}
                >
                  <div className="text-4xl mb-3">📤</div>
                  <div className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</div>
                  <div className="text-xs text-gray-500">PDF, JPG, JPEG, PNG less than 10MB</div>
                  <div className="text-xs text-gray-500">Ensure your document are in good condition and readable</div>
                  <input
                    ref={el => { fileInputRefs.current.identityBack = el; }}
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('identityBack', e.target.files)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Verification */}
          {currentStep === 1 && (
            <div className="animate-[stepFadeIn_0.3s_ease-out]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verify Payment Method</h3>
              <p className="text-sm text-gray-500 mb-5">Add a payment method to secure your account</p>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-2">Payment Method</label>
                <div className="flex gap-3">
                  <button
                    className={`flex-1 p-4 border rounded-lg text-center transition-all ${
                      paymentMethod === 'credit'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    onClick={() => setPaymentMethod('credit')}
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">💳</div>
                    <div>Credit Card</div>
                  </button>
                  <button
                    className={`flex-1 p-4 border rounded-lg text-center transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">🟦</div>
                    <div>PayPal</div>
                  </button>
                </div>
              </div>

              {paymentMethod === 'credit' ? (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Card Number</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">CVV</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                        placeholder="123"
                        maxLength={4}
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                      placeholder="John Doe"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">🟦</div>
                  <p className="mb-5">You'll be redirected to PayPal to complete verification</p>
                  <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Connect PayPal
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Business Email Verification */}
          {currentStep === 2 && (
            <div className="animate-[stepFadeIn_0.3s_ease-out]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verify Business Email</h3>
              <p className="text-sm text-gray-500 mb-5">Verify your business listing ownership using your company email</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Business Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                  placeholder="admin@yourcompany.com"
                  value={formData.businessEmail}
                  onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Business Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                  placeholder="Your Company Name"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Business Website</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                  placeholder="https://yourcompany.com"
                  value={formData.businessWebsite}
                  onChange={(e) => handleInputChange('businessWebsite', e.target.value)}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-600 mb-2">📧 Verification Process</div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  We'll send a verification email to your business email address. Click the link in the email to confirm your business ownership.
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Phone Verification */}
          {currentStep === 3 && (
            <div className="animate-[stepFadeIn_0.3s_ease-out]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verify Phone Number</h3>
              <p className="text-sm text-gray-500 mb-5">We'll send you a verification code via SMS</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                <div className="grid grid-cols-4 gap-4">
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-left"
                      onClick={() => toggleDropdown('country')}
                    >
                      <span>{formData.phoneCountry}</span>
                      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                      </svg>
                    </button>
                    {dropdowns.country && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
                        <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50" onClick={() => {handleInputChange('phoneCountry', '🇺🇸 +1'); toggleDropdown('country');}}>🇺🇸 +1</button>
                        <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50" onClick={() => {handleInputChange('phoneCountry', '🇨🇦 +1'); toggleDropdown('country');}}>🇨🇦 +1</button>
                      </div>
                    )}
                  </div>
                  <div className="col-span-3">
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                      placeholder="(555) 123-4567"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {showPhoneCode && (
                <div className="text-center my-8">
                  <h4 className="text-base font-semibold text-gray-900 mb-2">Enter verification code</h4>
                  <p className="text-sm text-gray-500 mb-6">We sent a code to +1 (555) 123-4567</p>
                  
                  <div className="flex gap-2 justify-center mb-4">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        ref={el => { codeInputRefs.current[index] = el; }}
                        type="text"
                        className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-semibold"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      />
                    ))}
                  </div>
                  
                  <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Verify Number
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-4">
                    Didn't receive the code? <a href="#" className="text-blue-500">Resend</a>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Address Verification */}
          {currentStep === 4 && (
            <div className="animate-[stepFadeIn_0.3s_ease-out]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Proof of Address</h3>
              <p className="text-sm text-gray-500 mb-5">Upload a recent utility bill or bank statement to verify your address</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Document Type</label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-left pr-10"
                    onClick={() => toggleDropdown('documentType')}
                  >
                    <span>Select document type</span>
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                    </svg>
                  </button>
                  {dropdowns.documentType && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
                      <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50" onClick={() => toggleDropdown('documentType')}>Utility Bill</button>
                      <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50" onClick={() => toggleDropdown('documentType')}>Bank Statement</button>
                      <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50" onClick={() => toggleDropdown('documentType')}>Insurance Statement</button>
                      <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50" onClick={() => toggleDropdown('documentType')}>Government Letter</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Upload Document</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  onClick={() => fileInputRefs.current.addressDoc?.click()}
                >
                  <div className="text-4xl mb-3">📤</div>
                  <div className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</div>
                  <div className="text-xs text-gray-500">PDF, JPG, JPEG, PNG less than 10MB</div>
                  <div className="text-xs text-gray-500">Document must be dated within the last 3 months</div>
                    <input
                      ref={el => { fileInputRefs.current.addressDoc = el; }}
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('addressDoc', e.target.files)}
                    />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="text-sm font-medium text-yellow-700 mb-2">⚠️ Document Requirements</div>
                <ul className="text-xs text-yellow-700 leading-relaxed ml-4">
                  <li>Document must show your full name and address</li>
                  <li>Document must be dated within the last 3 months</li>
                  <li>Document must be clearly readable</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 6: Website Ownership Verification */}
          {currentStep === 5 && (
            <div className="animate-[stepFadeIn_0.3s_ease-out]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verify Website Ownership</h3>
              <p className="text-sm text-gray-500 mb-5">Add the verification code to your website to prove ownership</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Website URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                  placeholder="https://yourwebsite.com"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Verification Method</label>
                <div className="flex gap-2">
                  {['HTML Tag', 'DNS Record', 'File Upload'].map((method) => (
                    <button
                      key={method}
                      className={`flex-1 px-4 py-3 border rounded-lg text-sm transition-all ${
                        formData.verificationMethod === method
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 bg-white text-gray-500'
                      }`}
                      onClick={() => handleInputChange('verificationMethod', method)}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="text-sm font-medium text-gray-600 mb-3">Add this meta tag to your website's &lt;head&gt; section:</div>
                <div className="bg-gray-800 text-gray-200 p-3 rounded font-mono text-xs overflow-x-auto mb-2">
                  &lt;meta name="verification-code" content="abc123def456ghi789"&gt;
                </div>
                <button className="bg-white border border-gray-300 px-3 py-2 rounded text-xs hover:bg-gray-50 transition-colors">
                  Copy Code
                </button>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="text-sm font-medium text-green-700 mb-2">✅ Next Steps</div>
                <ol className="text-xs text-green-700 leading-relaxed ml-4">
                  <li>Copy the verification code above</li>
                  <li>Add it to your website's HTML &lt;head&gt; section</li>
                  <li>Click "Verify Website" below to complete verification</li>
                </ol>
              </div>
            </div>
          )}

          {/* Success Screen */}
          {showSuccess && (
            <div className="animate-[stepFadeIn_0.3s_ease-out]">
              <div className="text-center py-10">
                <div className="bg-green-500 text-white py-5 rounded-t-xl -mx-6 -mt-6 mb-8">
                  <div className="text-lg font-semibold">USER VERIFIED</div>
                </div>
                
                <div className="flex gap-6 items-center mb-8">
                  <div className="bg-green-500 border-4 border-green-500 rounded-xl p-8 text-white">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-3xl">👤</div>
                    </div>
                    <div className="text-lg font-semibold">PASS</div>
                  </div>
                  
                  <div className="flex-1">
                    <ul className="space-y-2">
                      {['Identity verification completed', 'Payment method verified', 'Business ownership confirmed', 'Phone number validated'].map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="inline-block p-3 bg-green-50 border-2 border-green-500 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">TOTAL SCORE</div>
                    <div className="text-3xl font-bold text-green-500">92.0</div>
                    <div className="text-xs text-blue-500 mt-1">🛡️ Rule</div>
                  </div>
                </div>
                
                <div className="flex gap-10 justify-center">
                  {[
                    { score: '91.0', label: 'Identity' },
                    { score: '91.0', label: 'Payment' },
                    { score: '99.8', label: 'Business' },
                    { score: '99.6', label: 'Security' }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-green-500">{item.score}</div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <DesktopFooter
          showSuccess={showSuccess}
          isFinal={currentStep === verificationSteps.length - 1}
          canGoBack={currentStep > 0}
          onCancel={onClose || (() => {})}
          onBack={goToPreviousStep}
          onPrimary={showSuccess ? (onClose || (() => {})) : goToNextStep}
        />
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes stepFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Verification;
