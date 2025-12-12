"use client";

import React, { useState, useEffect, useRef } from "react";

interface SocialAccountCardProps {
  provider: string;
  initialConnected: boolean;
  username: string;
  initialLetter: string;
  onDisconnect: (provider: string) => void;
  onConnect?: (provider: string) => void;
  isExpanded?: boolean;
  onToggleExpand?: (provider: string) => void;
}

const SocialAccountCard: React.FC<SocialAccountCardProps> = ({
  provider,
  initialConnected,
  username,
  initialLetter,
  onDisconnect,
  onConnect,
  isExpanded = false,
  onToggleExpand,
}) => {
  const [isConnected, setIsConnected] = useState(initialConnected);
  const cardRef = useRef<HTMLDivElement>(null);

  const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);

  // Update state when initialConnected changes
  useEffect(() => {
    setIsConnected(initialConnected);
  }, [initialConnected]);

  const handleConnect = () => {
    setIsConnected(true);
    if (onConnect) {
      onConnect(provider);
    }
  };

  const handleToggleExpand = () => {
    if (onToggleExpand) {
      onToggleExpand(provider);
    }
  };

  const handleReconnect = () => {
    alert(`Reconnecting to ${providerName}...`);
  };

  const handleDisconnectClick = () => {
    onDisconnect(provider);
  };


  const getIcon = () => {
    switch (provider) {
      case "google":
        return (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
            <g>
              <path
                d="M23.8,12.3c0-0.8-0.1-1.6-0.2-2.4H12.2v4.6h6.5c-0.3,1.5-1.1,2.8-2.4,3.6v3h3.9C22.5,19,23.8,15.9,23.8,12.3z"
                fill="#4285F4"
              />
              <path
                d="M12.2,24c3.2,0,6-1.1,8-2.9l-3.9-3c-1.1,0.7-2.5,1.1-4.1,1.1c-3.1,0-5.8-2.1-6.7-5h-4v3.1C3.6,21.4,7.7,24,12.2,24z"
                fill="#34A853"
              />
              <path
                d="M5.5,14.3C5,12.8,5,11.2,5.5,9.7V6.6h-4c-1.7,3.4-1.7,7.4,0,10.8L5.5,14.3z"
                fill="#FBBC04"
              />
              <path
                d="M12.2,4.7c1.7,0,3.4,0.6,4.6,1.8l0,0l3.4-3.4c-2.2-2-5-3.2-8-3.1C7.7,0,3.6,2.6,1.5,6.6l4,3.1C6.4,6.9,9.1,4.7,12.2,4.7z"
                fill="#EA4335"
              />
            </g>
          </svg>
        );
      case "facebook":
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <g>
              <path
                d="M24,12c0-6.6-5.4-12-12-12S0,5.4,0,12c0,6,4.4,11,10.1,11.9v-8.4h-3V12h3V9.4c0-3,1.8-4.7,4.5-4.7c1.3,0,2.7,0.2,2.7,0.2v3h-1.5c-1.5,0-2,0.9-2,1.9V12h3.3l-0.5,3.5h-2.8v8.4C19.6,23,24,18,24,12z"
                fill="#1877F2"
              />
              <path
                d="M16.7,15.5l0.5-3.5h-3.3V9.7c0-0.9,0.5-1.9,2-1.9h1.5v-3c0,0-1.4-0.2-2.7-0.2c-2.7,0-4.5,1.7-4.5,4.7V12h-3v3.5h3v8.4C10.7,24,11.4,24,12,24s1.3,0,1.9-0.1v-8.4H16.7z"
                fill="#fff"
              />
            </g>
          </svg>
        );
      case "twitter":
        return (
          <svg viewBox="0 0 16 16" className="w-5 h-5 text-black">
            <path
              fill="currentColor"
              d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={cardRef}
      id={`${provider}Card`}
      className={`card-item transition-colors duration-200 ${
        isExpanded && isConnected ? "active bg-[#F8F9FA]" : ""
      }`}
    >
      <div
        className={`card-row p-5 flex items-center relative ${
          !isExpanded || !isConnected
            ? "after:content-[''] after:absolute after:bottom-0 after:left-5 after:right-5 after:h-px after:bg-[rgba(0,0,0,0.08)]"
            : ""
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F0F2F5] mr-[15px] flex-shrink-0 overflow-hidden">
          {getIcon()}
        </div>
        <div className="flex-grow mr-[15px]">
          <h3 className="text-base font-semibold mb-[3px] text-[#464646]">
            {providerName}
          </h3>
          <p className="text-sm text-[#5F5F5F]" id={`${provider}Status`}>
            {isConnected
              ? `You are connected to your ${providerName} account`
              : `Sign in to SchoolScout using ${providerName}`}
          </p>
        </div>
        <div className="flex items-center flex-shrink-0">
          <button
            id={`${provider}EditBtn`}
            className={`btn btn-edit px-3 py-2 rounded-md text-sm font-medium cursor-pointer border border-[#E4E6EB] bg-[#E4E6EB] text-[#050505] hover:bg-[#D8DADF] transition-all duration-200 min-w-[80px] inline-flex items-center justify-center whitespace-nowrap ${
              !isConnected ? "hidden" : ""
            }`}
            onClick={handleToggleExpand}
          >
            Edit
            <svg
              id={`${provider}DropdownIcon`}
              className={`dropdown-icon ml-[5px] w-4 h-4 transition-transform duration-200 ${
                isExpanded ? "up rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            id={`${provider}ConnectBtn`}
            className={`btn btn-connect px-4 py-2 rounded-md text-sm font-medium cursor-pointer border border-[#E4E6EB] bg-[#E4E6EB] text-[#050505] hover:bg-[#D8DADF] transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap ${
              isConnected ? "hidden" : ""
            }`}
            onClick={handleConnect}
          >
            Connect to {providerName}
          </button>
        </div>
      </div>

      {isConnected && (
        <div
          id={`${provider}ConnectedAccount`}
          className={`connected-account p-5 pt-[15px] pb-5 bg-[#F8F9FA] ${
            isExpanded ? "block" : "hidden"
          } border-b border-[rgba(0,0,0,0.08)] relative`}
        >
          <div className="account-details-grid grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-[15px] md:gap-[30px] bg-white p-5 rounded-lg shadow-[0px_1px_2px_rgba(0,0,0,0.05)] items-start">
            <div className="profile-photo-container">
              <h4 className="detail-header text-xs font-semibold text-[#5F5F5F] mb-2.5 uppercase tracking-[0.5px]">
                Profile photo
              </h4>
              <div className="w-10 h-10 rounded-lg bg-[#5F5F5F] flex items-center justify-center text-white font-semibold text-base overflow-hidden">
                <span>{initialLetter}</span>
              </div>
            </div>
            <div className="account-username">
              <h4 className="detail-header text-xs font-semibold text-[#5F5F5F] mb-2.5 uppercase tracking-[0.5px]">
                Username
              </h4>
              <p className="text-sm text-[#464646]">{username}</p>
            </div>
            <div className="account-status">
              <h4 className="detail-header text-xs font-semibold text-[#5F5F5F] mb-2.5 uppercase tracking-[0.5px]">
                Status
              </h4>
              <div className="status-indicator-container flex items-center mt-1">
                <div className="status-indicator w-[10px] h-[10px] rounded-full bg-[#089E68] mr-2 flex-shrink-0"></div>
                <p className="text-sm">Connected</p>
              </div>
            </div>
            <div className="account-actions-container">
              <h4 className="detail-header text-xs font-semibold text-[#5F5F5F] mb-2.5 uppercase tracking-[0.5px]">
                Actions
              </h4>
              <div className="account-actions-stack flex flex-col gap-2.5 items-stretch">
                <button
                  id={`${provider}ReconnectBtn`}
                  className="btn btn-secondary px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer border border-[#E4E6EB] bg-[#E4E6EB] text-[#050505] hover:bg-[#D8DADF] transition-all duration-200 flex items-center justify-start w-full min-w-[120px]"
                  onClick={handleReconnect}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-[6px]"
                  >
                    <path
                      d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                      fill="currentColor"
                    />
                  </svg>
                  Reconnect
                </button>
                <button
                  id={`${provider}DisconnectBtn`}
                  className="btn btn-danger px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer bg-[#FDEEED] text-[#DC3545] hover:bg-[#FAD8D6] transition-all duration-200 flex items-center justify-start w-full min-w-[120px] border-transparent"
                  onClick={handleDisconnectClick}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-[6px]"
                  >
                    <path
                      d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                      fill="#DC3545"
                    />
                  </svg>
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialAccountCard;
