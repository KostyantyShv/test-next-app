"use client";

import React, { useState, useRef } from "react";
import SocialAccountCard from "./SocialAccountCard";
import PasswordPopup from "./PasswordPopup";
import ConfirmationPopup from "./ConfirmationPopup";

const SignInAndSecurity: React.FC = () => {
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<string | null>(null);

  const passwordPopupRef = useRef<HTMLDivElement>(null);
  const confirmationPopupRef = useRef<HTMLDivElement>(null);

  const openPopup = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true);
  };

  const closePopup = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(false);
  };

  const handleDisconnect = (provider: string) => {
    setCurrentProvider(provider);
    openPopup(setIsConfirmationPopupOpen);
  };

  return (
    <div className="max-w-[1055px] mx-auto p-0 max-md:p-5 max-md:mb-10 md:my-10 z-[200]">
      <h1 className="text-[28px] font-semibold mb-10 text-[#464646]">
        Sign In & Security
      </h1>

      {/* Password Section */}
      <div className="flex flex-col md:flex-row mb-10 gap-[30px]">
        <div className="w-full md:w-[250px] flex-shrink-0">
          <h2 className="text-lg font-semibold mb-2.5 text-[#464646]">
            Password
          </h2>
          <p className="text-sm text-[#5F5F5F] leading-relaxed">
            Keep your security secure by changing your password at least every
            120 days
          </p>
        </div>
        <div className="flex-grow bg-white rounded-lg shadow-[0px_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="flex items-center p-5 relative">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F0F2F5] mr-[15px] flex-shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z"
                  fill="#5F5F5F"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 8H17V6C17 3.23858 14.7614 1 12 1C9.23858 1 7 3.23858 7 6V8H6C4.89543 8 4 8.89543 4 10V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V10C20 8.89543 19.1046 8 18 8ZM9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8H9V6ZM18 20H6V10H18V20Z"
                  fill="#5F5F5F"
                />
              </svg>
            </div>
            <div className="flex-grow mr-[15px]">
              <h3 className="text-base font-semibold mb-[3px] text-[#464646]">
                Password
              </h3>
              <p className="text-sm text-[#5F5F5F]">
                Last changed October 22nd, 2023 03:10
              </p>
            </div>
            <div className="flex items-center flex-shrink-0">
              <button
                className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer border border-[#1B1B1B] bg-[#1B1B1B] text-white hover:bg-black transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap"
                onClick={() => openPopup(setIsPasswordPopupOpen)}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Accounts Section */}
      <div className="flex flex-col md:flex-row mb-10 gap-[30px]">
        <div className="w-full md:w-[250px] flex-shrink-0">
          <h2 className="text-lg font-semibold mb-2.5 text-[#464646]">
            Social Accounts
          </h2>
          <p className="text-sm text-[#5F5F5F] leading-relaxed">
            Connect your social media accounts to make sign in easier.
          </p>
        </div>
        <div className="flex-grow bg-white rounded-lg shadow-[0px_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
          <SocialAccountCard
            provider="google"
            initialConnected={true}
            username="abcxy@gmail.com"
            initialLetter="A"
            onDisconnect={handleDisconnect}
          />
          <SocialAccountCard
            provider="facebook"
            initialConnected={false}
            username="facebook.user"
            initialLetter="F"
            onDisconnect={handleDisconnect}
          />
          <SocialAccountCard
            provider="twitter"
            initialConnected={false}
            username="twitter.user"
            initialLetter="T"
            onDisconnect={handleDisconnect}
          />
        </div>
      </div>

      {/* Popups */}
      <PasswordPopup
        isOpen={isPasswordPopupOpen}
        onClose={() => closePopup(setIsPasswordPopupOpen)}
        popupRef={passwordPopupRef}
      />
      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={() => {
          closePopup(setIsConfirmationPopupOpen);
          setCurrentProvider(null);
        }}
        provider={currentProvider}
        popupRef={confirmationPopupRef}
      />
    </div>
  );
};

export default SignInAndSecurity;
