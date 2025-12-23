'use client';

import React, { useEffect, useRef, useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileProgress from './MobileProgress';
import MobileFooter from './MobileFooter';
import MobileDrawer from './MobileDrawer';

interface VerificationMobileProps {
  onClose?: () => void;
}

const stepsOrder = ['identity', 'payment', 'business', 'phone', 'address', 'ownership'] as const;
type StepKey = typeof stepsOrder[number];

const stepTitles: Record<StepKey, string> = {
  identity: 'Verify Your Identity',
  payment: 'Verify Payment Method',
  business: 'Verify Business Email',
  phone: 'Verify Phone Number',
  address: 'Proof of Address',
  ownership: 'Verify Website Ownership',
};

const VerificationMobile: React.FC<VerificationMobileProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Set<StepKey>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: 'Noah',
    lastName: 'Tremblay',
    address: '3255 Annalyn Crt, Mississauga, ON L5C 1Y6',
    dateOfBirth: '1993-07-11',
    gender: 'Male',
    documentType: 'ID Card',
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
    verificationMethod: 'HTML Tag',
  });

  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal'>('credit');
  const [showPhoneCode, setShowPhoneCode] = useState(false);
  const [dropdowns, setDropdowns] = useState<Record<string, boolean>>({});
  const [uploadedFront, setUploadedFront] = useState<{ name: string; size: number; progress: number } | null>(null);

  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verificationCode, setVerificationCode] = useState(['8', '9', '4', '5', '4']);

  useEffect(() => {
    if (formData.phoneNumber.length >= 10) {
      const t = setTimeout(() => setShowPhoneCode(true), 800);
      return () => clearTimeout(t);
    }
  }, [formData.phoneNumber]);

  const progressPct = ((currentStep + 1) / stepsOrder.length) * 100;

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const goToStep = (idx: number) => {
    setCurrentStep(idx);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const goToNextStep = () => {
    setCompletedSteps(prev => new Set(prev).add(stepsOrder[currentStep]));
    if (currentStep < stepsOrder.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const toggleDropdown = (name: string) => setDropdowns(prev => ({ ...prev, [name]: !prev[name] }));

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = e => {
      const target = e.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;
      const f = target.files[0];
      const upload = { name: f.name, size: f.size, progress: 0 };
      setUploadedFront(upload);
      // simulate upload
      let progress = 0;
      const iv = setInterval(() => {
        progress = Math.min(100, progress + Math.random() * 18);
        setUploadedFront(u => (u ? { ...u, progress } : u));
        if (progress >= 100) clearInterval(iv);
      }, 220);
    };
    input.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatCardNumber = (value: string) => value.replace(/\s/g, '').replace(/[^0-9]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    return v.length >= 2 ? `${v.slice(0, 2)}/${v.slice(2, 4)}` : v;
  };

  const handleCodeChange = (index: number, val: string) => {
    if (val.length > 1) return;
    const next = [...verificationCode];
    next[index] = val;
    setVerificationCode(next);
    if (val && index < next.length - 1) codeInputRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full h-[100vh] bg-[#E1E7EE] flex flex-col">
      <MobileHeader onOpenSteps={() => setDrawerOpen(true)} />
      <MobileProgress currentStep={currentStep} totalSteps={stepsOrder.length} completedSteps={new Set(Array.from(completedSteps).map(s => s))} stepsOrder={[...stepsOrder]} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#E1E7EE] pb-32">
        {/* STEP: Identity */}
        <div className={`${!showSuccess && currentStep === 0 ? 'block' : 'hidden'} px-4 py-5`}>
          <div className="text-center mb-6">
            <h2 className="text-[20px] font-semibold text-[#016853] mb-2">{stepTitles.identity}</h2>
            <p className="text-[14px] text-[#5F5F5F] leading-snug">Upload a government-issued ID to verify your identity</p>
          </div>

          <div className="form-group">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Personal Information</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input className="w-full h-[52px] rounded-xl border-2 border-[#D1D5DB] px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD] valid:[&]:border-[#089E68]" placeholder="First name" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#089E68] font-bold">✓</span>
              </div>
              <div className="relative">
                <input className="w-full h-[52px] rounded-xl border-2 border-[#D1D5DB] px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="Last name" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#089E68] font-bold">✓</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="relative">
              <input className="w-full h-[52px] rounded-xl border-2 border-[#D1D5DB] px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="Address" value={formData.address} onChange={e => handleInputChange('address', e.target.value)} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#089E68] font-bold">✓</span>
            </div>
          </div>

          <div className="form-group">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input type="date" className="w-full h-[52px] rounded-xl border-2 border-[#D1D5DB] px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" value={formData.dateOfBirth} onChange={e => handleInputChange('dateOfBirth', e.target.value)} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#089E68] font-bold">✓</span>
              </div>
              <div className="relative">
                <div className="relative">
                  <button type="button" className="w-full h-[52px] rounded-xl border-2 px-4 text-[16px] text-left bg-[#f8fff8] border-[#089E68]" aria-expanded={dropdowns.gender ? 'true' : 'false'} onClick={() => toggleDropdown('gender')}>
                    <span>{formData.gender}</span>
                    <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                  </button>
                  {dropdowns.gender && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-xl shadow z-10 mt-1">
                      {['Male', 'Female', 'Other'].map(opt => (
                        <button key={opt} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50" onClick={() => { handleInputChange('gender', opt); toggleDropdown('gender'); }}>{opt}</button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#089E68] font-bold">✓</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Verify my identity using</label>
            <div className="flex gap-2 mb-5">
              {['ID Card', 'License', 'Passport'].map(type => (
                <div key={type} className={`flex-1 text-center text-[13px] font-medium rounded-xl border-2 cursor-pointer px-2 py-3 ${formData.documentType === type ? 'border-[#089E68] bg-[#EBFCF4] text-[#016853]' : 'border-gray-300 text-[#5F5F5F] bg-white'}`} onClick={() => handleInputChange('documentType', type)}>{type}</div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Front side</label>
            {uploadedFront ? (
              <div className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EBFCF4] flex items-center justify-center text-[20px]">📄</div>
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-[#464646] mb-1">{uploadedFront.name}</div>
                  <div className="text-[12px] text-[#5F5F5F]">{formatFileSize(uploadedFront.size)} - {uploadedFront.progress < 100 ? `Uploading ${Math.round(uploadedFront.progress)}%...` : 'Upload complete'}</div>
                  <div className="w-full h-1 bg-gray-200 rounded mt-2 overflow-hidden"><div className="h-full bg-[#1D77BD] transition-all" style={{ width: `${uploadedFront.progress}%` }} /></div>
                </div>
                <div className="inline-block w-4 h-4 border-2 border-gray-300 border-t-[#1D77BD] rounded-full animate-spin" />
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Back side</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer bg-white hover:border-[#1D77BD] hover:bg-[#f8fbff] transition" onClick={handleUploadClick}>
              <div className="text-[32px] mb-2">📤</div>
              <div className="text-[14px] font-medium text-[#4A4A4A] mb-1">Click to upload or drag and drop</div>
              <div className="text-[12px] text-[#5F5F5F]">PDF, JPG, JPEG, PNG less than 10MB</div>
              <div className="text-[12px] text-[#5F5F5F]">Ensure documents are readable</div>
            </div>
          </div>
        </div>

        {/* STEP: Payment */}
        <div className={`${!showSuccess && currentStep === 1 ? 'block' : 'hidden'} px-4 py-5`}>
          <div className="text-center mb-6">
            <h2 className="text-[20px] font-semibold text-[#016853] mb-2">{stepTitles.payment}</h2>
            <p className="text-[14px] text-[#5F5F5F] leading-snug">Add a payment method to secure your account</p>
          </div>
          <div className="form-group">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Payment Method</label>
            <div className="flex gap-3 mb-5">
              <div className={`flex-1 p-4 rounded-xl border-2 text-center cursor-pointer ${paymentMethod === 'credit' ? 'border-[#1D77BD] bg-[#f8fbff]' : 'border-gray-300 bg-white'}`} onClick={() => setPaymentMethod('credit')}>
                <div className="text-[24px] mb-2">💳</div>
                <div className="text-[12px] font-medium text-[#4A4A4A]">Credit Card</div>
              </div>
              <div className={`flex-1 p-4 rounded-xl border-2 text-center cursor-pointer ${paymentMethod === 'paypal' ? 'border-[#1D77BD] bg-[#f8fbff]' : 'border-gray-300 bg-white'}`} onClick={() => setPaymentMethod('paypal')}>
                <div className="text-[24px] mb-2">🟦</div>
                <div className="text-[12px] font-medium text-[#4A4A4A]">PayPal</div>
              </div>
            </div>
          </div>

          {paymentMethod === 'credit' ? (
            <div id="credit-card-form">
              <div className="mb-4">
                <label className="block text-[14px] font-medium text-[#464646] mb-2">Card Number</label>
                <input className="w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="1234 5678 9012 3456" maxLength={19} value={formData.cardNumber} onChange={e => handleInputChange('cardNumber', formatCardNumber(e.target.value))} />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#464646] mb-2">Expiry Date</label>
                  <input className="w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="MM/YY" maxLength={5} value={formData.expiryDate} onChange={e => handleInputChange('expiryDate', formatExpiryDate(e.target.value))} />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#464646] mb-2">CVV</label>
                  <input className="w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="123" maxLength={4} value={formData.cvv} onChange={e => handleInputChange('cvv', e.target.value)} />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[14px] font-medium text-[#464646] mb-2">Cardholder Name</label>
                <input className="w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="John Doe" value={formData.cardholderName} onChange={e => handleInputChange('cardholderName', e.target.value)} />
              </div>
            </div>
          ) : (
            <div id="paypal-form" className="text-center py-10 px-5">
              <div className="text-5xl mb-4">🟦</div>
              <p className="text-[#4A4A4A]">You&apos;ll be redirected to PayPal to complete verification</p>
              <button className="mt-5 w-[200px] inline-flex items-center justify-center rounded-xl border-2 border-[#1D77BD] bg-[#1D77BD] text-white px-4 py-2 text-[15px] font-semibold hover:bg-[#1565c0]">Connect PayPal</button>
            </div>
          )}
        </div>

        {/* STEP: Business */}
        <div className={`${!showSuccess && currentStep === 2 ? 'block' : 'hidden'} px-4 py-5`}>
          <div className="text-center mb-6">
            <h2 className="text-[20px] font-semibold text-[#016853] mb-2">{stepTitles.business}</h2>
            <p className="text-[14px] text-[#5F5F5F] leading-snug">Verify your business listing ownership using your company email</p>
          </div>
          <div className="mb-4">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Business Email</label>
            <input className="w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="admin@yourcompany.com" value={formData.businessEmail} onChange={e => handleInputChange('businessEmail', e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Business Name</label>
            <input className="w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="Your Company Name" value={formData.businessName} onChange={e => handleInputChange('businessName', e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Business Website</label>
            <input className="w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="https://yourcompany.com" value={formData.businessWebsite} onChange={e => handleInputChange('businessWebsite', e.target.value)} />
          </div>
          <div className="rounded-xl border border-[#089E68] bg-[#EBFCF4] text-[#016853] p-4">
            <div className="text-[14px] font-semibold mb-2 flex items-center gap-2">📧 Verification Process</div>
            <div className="text-[13px] leading-snug">We&apos;ll send a verification email to your business email address. Click the link in the email to confirm your business ownership.</div>
          </div>
        </div>

        {/* STEP: Phone */}
        <div className={`${!showSuccess && currentStep === 3 ? 'block' : 'hidden'} px-4 py-5`}>
          <div className="text-center mb-6">
            <h2 className="text-[20px] font-semibold text-[#016853] mb-2">{stepTitles.phone}</h2>
            <p className="text-[14px] text-[#5F5F5F] leading-snug">We&apos;ll send you a verification code via SMS</p>
          </div>
          <div className="mb-4">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Phone Number</label>
            <div className="grid grid-cols-4 gap-3">
              <div className="relative col-span-1">
                <button type="button" className="w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] text-left bg-white" aria-expanded={dropdowns.country ? 'true' : 'false'} onClick={() => toggleDropdown('country')}>
                  <span>{formData.phoneCountry}</span>
                  <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                </button>
                {dropdowns.country && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-xl shadow z-10 mt-1">
                    {['🇺🇸 +1', '🇨🇦 +1', '🇬🇧 +44'].map(opt => (
                      <button key={opt} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50" onClick={() => { handleInputChange('phoneCountry', opt); toggleDropdown('country'); }}>{opt}</button>
                    ))}
                  </div>
                )}
              </div>
              <input className="col-span-3 w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="(555) 123-4567" value={formData.phoneNumber} onChange={e => handleInputChange('phoneNumber', e.target.value)} />
            </div>
          </div>
          {showPhoneCode && (
            <div className="text-center my-8">
              <h4 className="text-[16px] font-semibold text-[#016853] mb-2">Enter verification code</h4>
              <p className="text-[14px] text-[#5F5F5F] mb-6">We sent a code to +1 (555) 123-4567</p>
              <div className="flex gap-2 justify-center mb-4">
                {verificationCode.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => { codeInputRefs.current[idx] = el; }}
                    className={`w-12 h-13 border-2 rounded-xl text-center text-[20px] font-semibold ${digit ? 'border-[#089E68] bg-[#f8fff8]' : 'border-gray-300 bg-white'}`}
                    maxLength={1}
                    value={digit}
                    onChange={e => handleCodeChange(idx, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(idx, e)}
                  />
                ))}
              </div>
              <button className="mt-4 w-[200px] inline-flex items-center justify-center rounded-xl border-2 border-[#1D77BD] bg-[#1D77BD] text-white px-4 py-2 text-[15px] font-semibold hover:bg-[#1565c0]">Verify Number</button>
              <p className="text-[13px] text-[#5F5F5F] mt-4">Didn&apos;t receive the code? <a href="#" className="text-[#1D77BD]">Resend</a></p>
            </div>
          )}
        </div>

        {/* STEP: Address */}
        <div className={`${!showSuccess && currentStep === 4 ? 'block' : 'hidden'} px-4 py-5`}>
          <div className="text-center mb-6">
            <h2 className="text-[20px] font-semibold text-[#016853] mb-2">{stepTitles.address}</h2>
            <p className="text-[14px] text-[#5F5F5F] leading-snug">Upload a recent utility bill or bank statement to verify your address</p>
          </div>
          <div className="mb-4">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Document Type</label>
            <div className="relative">
              <button type="button" className="w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] text-left bg-white" aria-expanded={dropdowns.addressDoc ? 'true' : 'false'} onClick={() => toggleDropdown('addressDoc')}>
                <span>Select document type</span>
                <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
              </button>
              {dropdowns.addressDoc && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-xl shadow z-10 mt-1">
                  {['Utility Bill', 'Bank Statement', 'Insurance Statement', 'Government Letter'].map(opt => (
                    <button key={opt} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50" onClick={() => toggleDropdown('addressDoc')}>{opt}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Upload Document</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer bg-white hover:border-[#1D77BD] hover:bg-[#f8fbff] transition" onClick={handleUploadClick}>
              <div className="text-[32px] mb-2">📤</div>
              <div className="text-[14px] font-medium text-[#4A4A4A] mb-1">Click to upload or drag and drop</div>
              <div className="text-[12px] text-[#5F5F5F]">PDF, JPG, JPEG, PNG less than 10MB</div>
              <div className="text-[12px] text-[#5F5F5F]">Document must be dated within the last 3 months</div>
            </div>
          </div>
          <div className="rounded-xl border border-[#ffeaa7] bg-[#fff3cd] p-4">
            <div className="text-[14px] font-semibold text-[#b7791f] mb-2">⚠️ Document Requirements</div>
            <div className="text-[13px] text-[#b7791f]">
              <ul className="ml-4 list-disc">
                <li>Document must show your full name and address</li>
                <li>Document must be dated within the last 3 months</li>
                <li>Document must be clearly readable</li>
              </ul>
            </div>
          </div>
        </div>

        {/* STEP: Ownership */}
        <div className={`${!showSuccess && currentStep === 5 ? 'block' : 'hidden'} px-4 py-5`}>
          <div className="text-center mb-6">
            <h2 className="text-[20px] font-semibold text-[#016853] mb-2">{stepTitles.ownership}</h2>
            <p className="text-[14px] text-[#5F5F5F] leading-snug">Add the verification code to your website to prove ownership</p>
          </div>
          <div className="mb-4">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Website URL</label>
            <input className="w-full h-[52px] rounded-xl border-2 border-gray-300 px-4 text-[16px] !bg-white focus:outline-none focus:border-[#1D77BD]" placeholder="https://yourwebsite.com" value={formData.websiteUrl} onChange={e => handleInputChange('websiteUrl', e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-[14px] font-medium text-[#464646] mb-2">Verification Method</label>
            <div className="flex gap-2 mb-3">
              {['HTML Tag', 'DNS Record', 'File Upload'].map(m => (
                <div key={m} className={`flex-1 text-center text-[13px] font-medium rounded-xl border-2 cursor-pointer px-2 py-3 ${formData.verificationMethod === m ? 'border-[#089E68] bg-[#EBFCF4] text-[#016853]' : 'border-gray-300 text-[#5F5F5F] bg-white'}`} onClick={() => handleInputChange('verificationMethod', m)}>{m}</div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#089E68] bg-[#EBFCF4] text-[#016853] p-4 mb-4">
            <div className="text-[14px] font-semibold mb-2">Add this meta tag to your website&apos;s <span>&lt;head&gt;</span> section:</div>
            <div className="bg-[#2d3748] text-[#e2e8f0] p-3 rounded font-mono text-[13px] overflow-x-auto">&lt;meta name=&quot;verification-code&quot; content=&quot;abc123def456ghi789&quot;&gt;</div>
            <button className="mt-2 inline-flex items-center justify-center rounded border border-gray-300 bg-white text-[#4A4A4A] px-3 py-2 text-[12px] hover:bg-gray-50" onClick={() => navigator.clipboard.writeText('<meta name="verification-code" content="abc123def456ghi789">')}>Copy Code</button>
          </div>
          <div className="rounded-xl border border-[#c8e6c9] bg-[#e8f5e9] p-4 text-[#2e7d32]">
            <div className="text-[14px] font-semibold mb-2">✅ Next Steps</div>
            <ol className="text-[13px] leading-snug ml-4 list-decimal">
              <li>Copy the verification code above</li>
              <li>Add it to your website&apos;s HTML &lt;head&gt; section</li>
              <li>Click &quot;Verify Website&quot; below to complete verification</li>
            </ol>
          </div>
        </div>

        {/* Success */}
        <div className={`${showSuccess ? 'block' : 'hidden'} px-4 py-5`}>
          {showSuccess && (
            <div className="text-center py-8">
              <div className="bg-[#089E68] text-white px-4 py-5 rounded-t-2xl -mx-4 mb-6 text-[18px] font-semibold">USER VERIFIED</div>
              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="bg-[#089E68] border-[4px] border-[#089E68] rounded-2xl p-6 text-white min-w-[120px]">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">👤</div>
                  <div className="text-[16px] font-semibold">PASS</div>
                </div>
                <ul className="text-left">
                  {['Identity verification completed','Payment method verified','Business ownership confirmed','Phone number validated'].map((t,i)=>(
                    <li key={i} className="flex items-center gap-3 text-[14px] text-[#464646] py-1"><span className="w-5 h-5 rounded-full bg-[#089E68] text-white text-xs flex items-center justify-center">✓</span>{t}</li>
                  ))}
                </ul>
                <div className="inline-block p-4 bg-[#EBFCF4] border-2 border-[#089E68] rounded-xl">
                  <div className="text-[10px] text-[#5F5F5F] mb-1 tracking-wide">TOTAL SCORE</div>
                  <div className="text-[24px] font-bold text-[#089E68]">92.0</div>
                  <div className="text-[10px] text-[#1D77BD] mt-1">🛡️ Rule</div>
                </div>
              </div>
              <div className="flex justify-around gap-4">
                {[
                  {v:'91.0',l:'Identity'},
                  {v:'91.0',l:'Payment'},
                  {v:'99.8',l:'Business'},
                  {v:'99.6',l:'Security'},
                ].map((s,i)=>(
                  <div key={i} className="text-center">
                    <div className="text-[20px] font-bold text-[#089E68]">{s.v}</div>
                    <div className="text-[11px] text-[#5F5F5F]">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer navigation */}
      <MobileFooter canGoBack={!showSuccess && currentStep > 0} isFinal={currentStep === stepsOrder.length - 1} showSuccess={showSuccess} onBack={goToPreviousStep} onPrimary={showSuccess ? (onClose || (() => {})) : goToNextStep} />

      {/* Overlay */}
      <MobileDrawer open={drawerOpen} stepsOrder={[...stepsOrder]} stepTitles={{ identity: stepTitles.identity, payment: stepTitles.payment, business: stepTitles.business, phone: stepTitles.phone, address: stepTitles.address, ownership: stepTitles.ownership }} currentStep={currentStep} completedSteps={new Set(Array.from(completedSteps).map(s => s as string))} onClose={() => setDrawerOpen(false)} onSelectStep={(i) => setCurrentStep(i)} />
    </div>
  );
};

export default VerificationMobile;


