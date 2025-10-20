"use client";

import Verification from '@/components/universal-pages/verification/Verification';
import VerificationMobile from '@/components/universal-pages/verification/components/VerificationMobile';
import useWindowWidth from '@/hooks/useWindowWidth';

export default function VerificationPage() {
  const isMobile = useWindowWidth();
  return (
    <div className="min-h-screen bg-gray-100">
      {isMobile ? (
        <VerificationMobile />
      ) : (
        <div className="pt-16 pb-24">
          <Verification />
        </div>
      )}
    </div>
  );
}
