"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";

interface PrivacyOption {
  value: string;
  label: string;
  description: string;
  icon: ReactNode;
}

const privacyOptions: PrivacyOption[] = [
  {
    value: "private",
    label: "Private",
    description: "Only owner can view",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" width="20" height="20">
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="currentColor"
          d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
        />
      </svg>
    ),
  },
  {
    value: "public",
    label: "Public",
    description: "Anyone can find or view list",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path
          clipRule="evenodd"
          d="M2.78 11.25h4.502a16.05 16.05 0 0 1 3.014-8.343A9.255 9.255 0 0 0 2.78 11.25ZM12 3.149a14.55 14.55 0 0 0-3.214 8.101h6.428A14.55 14.55 0 0 0 12 3.149Zm3.214 9.601A14.55 14.55 0 0 1 12 20.851a14.55 14.55 0 0 1-3.214-8.101h6.428Zm-7.932 0H2.78a9.255 9.255 0 0 0 7.516 8.343 16.051 16.051 0 0 1-3.014-8.343Zm6.422 8.343a16.051 16.051 0 0 0 3.014-8.343h4.502a9.255 9.255 0 0 1-7.516 8.343Zm7.516-9.843h-4.502a16.05 16.05 0 0 0-3.014-8.343 9.255 9.255 0 0 1 7.516 8.343ZM1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12Z"
          fillRule="evenodd"
        />
      </svg>
    ),
  },
  {
    value: "shareable",
    label: "Shareable",
    description: "Anyone with the link can view",
    icon: (
      <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20">
        <path d="M9.73423 5.4902L10.1013 5.06529C10.7403 4.43601 11.6014 4.08294 12.499 4.08301C13.4052 4.08307 14.2743 4.44313 14.915 5.08397C15.5558 5.72481 15.9157 6.59395 15.9157 7.50017C15.9156 8.39808 15.5621 9.25952 14.9323 9.89853L14.5081 10.2671C14.1954 10.5388 14.1622 11.0125 14.4339 11.3252C14.7055 11.6379 15.1792 11.6711 15.4919 11.3994L15.9369 11.0127C15.9501 11.0013 15.9629 10.9893 15.9753 10.977C16.8975 10.0549 17.4156 8.80433 17.4157 7.50028C17.4158 6.19623 16.8978 4.94555 15.9758 4.02339C15.0537 3.10122 13.8031 2.5831 12.4991 2.58301C11.195 2.58292 9.94437 3.10086 9.0222 4.0229C9.00929 4.0358 8.99686 4.04918 8.98492 4.06299L8.59909 4.50966C8.32832 4.82312 8.36293 5.29673 8.67639 5.5675C8.98985 5.83827 9.46346 5.80366 9.73423 5.4902Z" />
        <path d="M13.0303 8.03031C13.3232 7.73742 13.3232 7.26254 13.0303 6.96965C12.7374 6.67676 12.2626 6.67676 11.9697 6.96965L6.96966 11.9697C6.67677 12.2625 6.67677 12.7374 6.96966 13.0303C7.26256 13.3232 7.73743 13.3232 8.03032 13.0303L13.0303 8.03031Z" />
        <path d="M9.68144 15.0931L9.3144 15.518C8.67538 16.1472 7.81422 16.5003 6.91668 16.5002C6.01046 16.5002 5.14137 16.1401 4.50062 15.4993C3.85987 14.8584 3.49994 13.9893 3.5 13.0831C3.50006 12.1852 3.85354 11.3237 4.48339 10.6847L4.9076 10.3161C5.22026 10.0444 5.25349 9.57073 4.98181 9.25806C4.71013 8.9454 4.23642 8.91217 3.92375 9.18385L3.47875 9.57052C3.46554 9.58199 3.45275 9.59392 3.44038 9.60629C2.51821 10.5283 2.00009 11.7789 2 13.083C1.99991 14.387 2.51785 15.6377 3.43989 16.5599C4.36192 17.482 5.61252 18.0002 6.91657 18.0002C8.22062 18.0003 9.4713 17.4824 10.3935 16.5604C10.4064 16.5474 10.4188 16.5341 10.4307 16.5203L10.8166 16.0736C11.0873 15.7601 11.0527 15.2865 10.7393 15.0158C10.4258 14.745 9.9522 14.7796 9.68144 15.0931Z" />
      </svg>
    ),
  },
];

interface PrivacyDropdownProps {
  selectedPrivacy: string;
  onPrivacySelect: (privacy: string) => void;
}

const PrivacyDropdown: React.FC<PrivacyDropdownProps> = ({
  selectedPrivacy,
  onPrivacySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    onPrivacySelect(value);
    setIsOpen(false);
  };

  const selectedOption = privacyOptions.find(
    (option) => option.value === selectedPrivacy
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-11 px-4 border border-inputBorder rounded-[23px] bg-inputBg flex items-center justify-between text-sm text-neutral font-medium hover:border-inputBorderHover transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 text-neutralLight flex items-center justify-center">
            {selectedOption?.icon}
          </span>
          <span>{selectedOption?.label}</span>
        </div>
        <span
          className={`text-neutralLight transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg z-[120] py-2">
          {privacyOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-100 transition-all duration-200 ${
                selectedPrivacy === option.value ? "selected" : ""
              }`}
            >
              <span
                className={`w-5 h-5 flex items-center justify-center ${
                  selectedPrivacy === option.value
                    ? "text-primary"
                    : "text-neutralLight"
                }`}
              >
                {option.icon}
              </span>
              <div className="flex-grow text-left">
                <div className="text-sm font-medium text-neutralDark">
                  {option.label}
                </div>
                <div className="text-xs text-neutralLight">
                  {option.description}
                </div>
              </div>
              {selectedPrivacy === option.value && (
                <span className="text-primary w-5 h-5 ml-auto">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrivacyDropdown;
