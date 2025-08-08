'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DebugInfo {
  screenResolution: string;
  deviceType: string;
  browser: string;
  os: string;
  language: string;
  timezone: string;
  connection: string;
}

export const ContactUsModal: React.FC<ContactUsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [message, setMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [includeDebug, setIncludeDebug] = useState(true);
  const [includeScreenshot, setIncludeScreenshot] = useState(false);
  const [includeFile, setIncludeFile] = useState(false);
  const [includeLocation, setIncludeLocation] = useState(false);
  const [screenshot, setScreenshot] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      updateDebugInfo();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const updateDebugInfo = () => {
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    const browserInfo = getBrowserInfo();
    const osInfo = getOSInfo();
    const language = navigator.language || 'en-US';
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const connectionInfo = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection ? 
      (navigator as Navigator & { connection?: { effectiveType?: string } }).connection?.effectiveType || 'Unknown' : 
      'Unknown';

    setDebugInfo({
      screenResolution: screenRes,
      deviceType,
      browser: browserInfo,
      os: osInfo,
      language,
      timezone,
      connection: connectionInfo,
    });
  };

  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = '';

    if (ua.includes('Firefox')) {
      browser = 'Firefox';
      version = ua.match(/Firefox\/([\d.]+)/)?.[1] || '';
    } else if (ua.includes('Chrome')) {
      browser = 'Chrome';
      version = ua.match(/Chrome\/([\d.]+)/)?.[1] || '';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      browser = 'Safari';
      version = ua.match(/Version\/([\d.]+)/)?.[1] || '';
    } else if (ua.includes('Edge')) {
      browser = 'Edge';
      version = ua.match(/Edge\/([\d.]+)/)?.[1] || '';
    } else if (ua.includes('Edg/')) {
      browser = 'Edge';
      version = ua.match(/Edg\/([\d.]+)/)?.[1] || '';
    }

    return version ? `${browser} ${version}` : browser;
  };

  const getOSInfo = () => {
    const ua = navigator.userAgent;
    const platform = navigator.platform;
    
    if (ua.includes('Windows')) {
      return 'Windows';
    } else if (ua.includes('Mac OS')) {
      return 'macOS';
    } else if (ua.includes('Linux')) {
      return 'Linux';
    } else if (/iPhone|iPad|iPod/.test(ua)) {
      return 'iOS';
    } else if (ua.includes('Android')) {
      return 'Android';
    }
    
    return platform || 'Unknown';
  };

  const handleScreenshot = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          frameRate: 1,
          height: window.innerHeight,
          width: window.innerWidth
        }
      } as DisplayMediaStreamOptions);
      
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();
      
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const screenshotData = canvas.toDataURL('image/png');
        setScreenshot(screenshotData);
      }
      
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error('Screenshot error:', err);
      setIncludeScreenshot(false);
      alert('Screenshot capture failed. Please ensure you grant permission to capture your screen.');
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview('');
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`
          };
          setLocation(userLocation);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIncludeLocation(false);
          alert('Could not retrieve your location. Please check your browser permissions.');
        }
      );
    } else {
      setIncludeLocation(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      alert('Please enter your message.');
      return;
    }

    setIsLoading(true);

    const formData = {
      message: message.trim(),
      debugInfo: includeDebug ? debugInfo : null,
      screenshot: includeScreenshot ? screenshot : null,
      file: includeFile ? selectedFile : null,
      location: includeLocation ? location : null
    };

    console.log('Sending form data:', formData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Reset form
    setMessage('');
    setScreenshot('');
    setSelectedFile(null);
    setFilePreview('');
    setLocation(null);
    setIncludeScreenshot(false);
    setIncludeFile(false);
    setIncludeLocation(false);

    setIsLoading(false);
    onClose();
    
    alert('Your message has been sent successfully. We will respond within 3 business days.');
  };

  const resetFileUpload = () => {
    setSelectedFile(null);
    setFilePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-[600px] h-[90vh] md:h-[90vh] h-[95vh] bg-white rounded-xl shadow-2xl flex flex-col mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-[#D1D5DB] bg-white z-10 flex-shrink-0">
          <h2 className="text-2xl font-bold text-[#1B1B1B]">Contact us</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#DFDDDB] hover:bg-[#D1D5DB] transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-4 h-4 text-[#5F5F5F]" fill="none" viewBox="0 0 15 15">
              <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Info Banner */}
          <div className="flex items-start gap-3 m-6 p-4 bg-[#EBF8FF] rounded-lg border-l-4 border-[#1D77BD]">
            <svg className="w-6 h-6 text-[#1D77BD] flex-shrink-0" fill="none" viewBox="0 0 20 20">
              <path fill="#4F4F4F" d="M10 3.25C8.43084 3.25 6.92592 3.87336 5.81633 4.98295C4.70674 6.09254 4.08337 7.59747 4.08337 9.16667V9.4306C4.37153 9.31247 4.68257 9.25 5.00004 9.25H5.83337C6.47431 9.25 7.089 9.50461 7.54221 9.95783C7.99543 10.411 8.25004 11.0257 8.25004 11.6667V14.1667C8.25004 14.8076 7.99543 15.4223 7.54221 15.8755C7.089 16.3287 6.47431 16.5833 5.83337 16.5833H5.00004C4.3591 16.5833 3.74441 16.3287 3.2912 15.8755C2.83799 15.4223 2.58337 14.8076 2.58337 14.1667V9.16667C2.58337 7.19965 3.36477 5.31319 4.75567 3.92229C6.14656 2.5314 8.03302 1.75 10 1.75C11.9671 1.75 13.8535 2.53141 15.2444 3.92229C16.6353 5.31319 17.4167 7.19965 17.4167 9.16667V14.1667C17.4167 14.8076 17.1621 15.4223 16.7089 15.8755C16.4102 16.1742 16.0414 16.3866 15.6412 16.4967C15.374 17.2874 14.6508 17.8821 13.8711 18.272C12.8417 18.7867 11.472 19.0833 10 19.0833C9.58583 19.0833 9.25004 18.7476 9.25004 18.3333C9.25004 17.9191 9.58583 17.5833 10 17.5833C11.2897 17.5833 12.4201 17.3204 13.2003 16.9303C13.4508 16.805 13.646 16.678 13.7964 16.5548C13.2926 16.4767 12.8229 16.2405 12.4579 15.8755C12.0047 15.4223 11.75 14.8076 11.75 14.1667V11.6667C11.75 11.0257 12.0047 10.411 12.4579 9.95783C12.9111 9.50461 13.5258 9.25 14.1667 9.25H15C15.3175 9.25 15.6285 9.31247 15.9167 9.4306V9.16667C15.9167 7.59747 15.2933 6.09254 14.1838 4.98295C13.0742 3.87336 11.5692 3.25 10 3.25ZM15.9167 11.6667C15.9167 11.4236 15.8201 11.1904 15.6482 11.0185C15.4763 10.8466 15.2432 10.75 15 10.75H14.1667C13.9236 10.75 13.6904 10.8466 13.5185 11.0185C13.3466 11.1904 13.25 11.4236 13.25 11.6667V14.1667C13.25 14.4098 13.3466 14.6429 13.5185 14.8148C13.6904 14.9868 13.9236 15.0833 14.1667 15.0833H15C15.2432 15.0833 15.4763 14.9868 15.6482 14.8148C15.8201 14.6429 15.9167 14.4098 15.9167 14.1667V11.6667ZM4.08337 11.6667V14.1667C4.08337 14.4098 4.17995 14.6429 4.35186 14.8148C4.52377 14.9868 4.75693 15.0833 5.00004 15.0833H5.83337C6.07649 15.0833 6.30965 14.9868 6.48155 14.8148C6.65346 14.6429 6.75004 14.4098 6.75004 14.1667V11.6667C6.75004 11.4236 6.65346 11.1904 6.48155 11.0185C6.30965 10.8466 6.07649 10.75 5.83337 10.75H5.00004C4.75693 10.75 4.52377 10.8466 4.35186 11.0185C4.17995 11.1904 4.08337 11.4236 4.08337 11.6667Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
            <p className="text-sm leading-relaxed text-[#4A4A4A] font-medium">
              Please write your message in English and allow us up to 3 business days for a response.
            </p>
          </div>

          <div className="px-7">
            {/* Message Input */}
            <div className="mb-7">
              <label className="block mb-2 text-sm font-semibold text-[#464646]">
                Your message:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your issue or question in detail..."
                className="w-full h-32 p-3 text-sm border-2 border-[#D1D5DB] rounded-lg resize-y transition-all duration-300 focus:outline-none focus:border-[#0B6333] focus:shadow-[0_0_0_3px_rgba(11,99,51,0.1)]"
              />
            </div>

            {/* Debug Information */}
            <div className="mb-5 border-2 border-[#E0E4E7] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#0B6333]">
              <div className="p-4 bg-white">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeDebug}
                    onChange={(e) => setIncludeDebug(e.target.checked)}
                    className="w-4 h-4 cursor-pointer accent-[#0B6333]"
                  />
                  <span className="text-sm font-medium text-[#464646]">
                    Send debug information together with my message.
                  </span>
                </label>
              </div>
              {includeDebug && debugInfo && (
                <div className="p-5 border-t-2 border-[#E0E4E7] bg-[#FAFBFC]">
                  <div className="bg-[#E1E7EE] rounded-lg border border-[#D1D5DB] text-sm">
                    <div className="flex p-3 border-b border-[#D1D5DB]">
                      <span className="w-[170px] font-semibold text-[#464646]">Using Beta:</span>
                      <span className="text-[#4A4A4A] opacity-90">No</span>
                    </div>
                    <div className="flex p-3 border-b border-[#D1D5DB]">
                      <span className="w-[170px] font-semibold text-[#464646]">Screen Resolution:</span>
                      <span className="text-[#4A4A4A] opacity-90">{debugInfo.screenResolution}</span>
                    </div>
                    <div className="flex p-3 border-b border-[#D1D5DB]">
                      <span className="w-[170px] font-semibold text-[#464646]">Detected device type:</span>
                      <span className="text-[#4A4A4A] opacity-90">{debugInfo.deviceType}</span>
                    </div>
                    <div className="flex p-3 border-b border-[#D1D5DB]">
                      <span className="w-[170px] font-semibold text-[#464646]">Browser:</span>
                      <span className="text-[#4A4A4A] opacity-90">{debugInfo.browser}</span>
                    </div>
                    <div className="flex p-3 border-b border-[#D1D5DB]">
                      <span className="w-[170px] font-semibold text-[#464646]">Operating System:</span>
                      <span className="text-[#4A4A4A] opacity-90">{debugInfo.os}</span>
                    </div>
                    <div className="flex p-3 border-b border-[#D1D5DB]">
                      <span className="w-[170px] font-semibold text-[#464646]">Language:</span>
                      <span className="text-[#4A4A4A] opacity-90">{debugInfo.language}</span>
                    </div>
                    <div className="flex p-3 border-b border-[#D1D5DB]">
                      <span className="w-[170px] font-semibold text-[#464646]">Time Zone:</span>
                      <span className="text-[#4A4A4A] opacity-90">{debugInfo.timezone}</span>
                    </div>
                    <div className="flex p-3">
                      <span className="w-[170px] font-semibold text-[#464646]">Connection Type:</span>
                      <span className="text-[#4A4A4A] opacity-90">{debugInfo.connection}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Screenshot */}
            <div className="mb-5 border-2 border-[#E0E4E7] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#0B6333]">
              <div className="p-4 bg-white">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeScreenshot}
                    onChange={(e) => {
                      setIncludeScreenshot(e.target.checked);
                      if (e.target.checked) {
                        handleScreenshot();
                      } else {
                        setScreenshot('');
                      }
                    }}
                    className="w-4 h-4 cursor-pointer accent-[#0B6333]"
                  />
                  <span className="text-sm font-medium text-[#464646]">
                    Include screenshot
                  </span>
                </label>
              </div>
              {includeScreenshot && screenshot && (
                <div className="p-5 border-t-2 border-[#E0E4E7] bg-[#FAFBFC]">
                  <div className="relative">
                    <img src={screenshot} alt="Screenshot" className="w-full rounded-lg border border-[#D1D5DB]" />
                    <button
                      onClick={() => {
                        setScreenshot('');
                        setIncludeScreenshot(false);
                      }}
                      className="absolute top-3 right-3 px-4 py-2 text-xs font-semibold text-white bg-black bg-opacity-70 hover:bg-opacity-90 rounded-md transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* File Upload */}
            <div className="mb-5 border-2 border-[#E0E4E7] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#0B6333]">
              <div className="p-4 bg-white">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeFile}
                    onChange={(e) => setIncludeFile(e.target.checked)}
                    className="w-4 h-4 cursor-pointer accent-[#0B6333]"
                  />
                  <span className="text-sm font-medium text-[#464646]">
                    Upload File
                  </span>
                </label>
              </div>
              {includeFile && (
                <div className="p-5 border-t-2 border-[#E0E4E7] bg-[#FAFBFC]">
                  <div
                    ref={dropAreaRef}
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    className="flex flex-col items-center justify-center p-10 border-3 border-dashed border-[#D1D5DB] rounded-lg cursor-pointer transition-all duration-300 hover:border-[#0B6333] hover:bg-[#EBFCF4] min-h-[160px]"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {!selectedFile ? (
                      <div className="text-center">
                        <svg className="w-15 h-15 mx-auto mb-4 text-[#5F5F5F]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 341 246" fill="none">
                          <path d="M155 246H85.25C61.69 246 41.5917 237.954 24.955 221.861C8.31833 205.666 0 185.935 0 162.667C0 142.68 6.045 124.845 18.135 109.163C30.3283 93.48 46.2417 83.4862 65.875 79.1812C72.385 55.6062 85.3017 36.5412 104.625 21.9862C124.052 7.32875 146.01 0 170.5 0C200.777 0 226.403 10.455 247.38 31.365C268.46 52.1725 279 77.5925 279 107.625C296.877 109.675 311.653 117.362 323.33 130.688C335.11 143.808 341 159.183 341 176.812C341 196.082 334.232 212.431 320.695 225.859C307.158 239.286 290.677 246 271.25 246H186V136.069L210.8 159.9L232.5 138.375L170.5 76.875L108.5 138.375L130.2 159.9L155 136.069V246Z" fill="#5F5F5F" />
                        </svg>
                        <span className="text-[#4A4A4A]">Choose a file to upload</span>
                      </div>
                    ) : (
                      <div className="w-full text-center">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-semibold text-[#464646] text-sm truncate max-w-[200px]">
                            {selectedFile.name}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              resetFileUpload();
                            }}
                            className="text-[#346DC2] hover:text-[#0B6333] hover:bg-[#EBFCF4] px-2 py-1 rounded text-xs font-medium transition-all duration-300"
                          >
                            Remove
                          </button>
                        </div>
                        {filePreview ? (
                          <img src={filePreview} alt="File preview" className="max-w-full max-h-[120px] object-contain rounded border border-[#D1D5DB] mx-auto" />
                        ) : (
                          <div className="bg-[#E1E7EE] p-3 rounded border border-[#D1D5DB] text-xs text-[#4A4A4A]">
                            File type: {selectedFile.type || 'Unknown'}<br />
                            Size: {(selectedFile.size / 1024).toFixed(2)} KB
                          </div>
                        )}
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileSelect(file);
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Location */}
            <div className="mb-5 border-2 border-[#E0E4E7] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#0B6333]">
              <div className="p-4 bg-white">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLocation}
                    onChange={(e) => {
                      setIncludeLocation(e.target.checked);
                      if (e.target.checked) {
                        handleLocation();
                      } else {
                        setLocation(null);
                      }
                    }}
                    className="w-4 h-4 cursor-pointer accent-[#0B6333]"
                  />
                  <span className="text-sm font-medium text-[#464646]">
                    Include my location
                  </span>
                </label>
              </div>
              {includeLocation && location && (
                <div className="p-5 border-t-2 border-[#E0E4E7] bg-[#FAFBFC]">
                  <div className="w-full h-[280px] rounded-lg border-2 border-[#D1D5DB] bg-[#E1E7EE] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-5 h-5 bg-[#0B6333] border-2 border-white rounded-full shadow-lg mx-auto mb-2"></div>
                      <p className="text-sm text-[#4A4A4A] font-medium">
                        Your location: {location.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Bottom padding to ensure last element is visible */}
          <div className="h-6"></div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-5 bg-[#F8FAFC] border-t-2 border-[#D1D5DB] bg-[#F8FAFC] z-10 flex-shrink-0">
          <a href="#" className="text-sm text-[#346DC2] hover:text-[#0B6333] hover:underline font-medium transition-colors duration-300">
            Check service status
          </a>
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-7 py-3 text-sm font-semibold text-[#016853] bg-[#EBFCF4] border-2 border-[#0B6333] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#D7F7E9] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
            <button
              onClick={onClose}
              className="px-7 py-3 text-sm font-medium text-[#4A4A4A] hover:text-[#464646] hover:bg-[#DFDDDB] rounded-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 