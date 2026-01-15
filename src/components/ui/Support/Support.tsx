'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Portal } from '@/components/ui/Portal';
import { cn } from '@/lib/utils';

interface SupportProps {
  isOpen: boolean;
  onClose: () => void;
}


// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

interface DebugInfo {
  screenResolution: string;
  deviceType: string;
  browser: string;
  os: string;
  language: string;
  timezone: string;
  connection: string;
}

interface LocationInfo {
  lat: number;
  lng: number;
  address: string;
}

// Google Maps types
declare global {
  interface Window {
    google: typeof google;
  }
}

const Support: React.FC<SupportProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();
  const [message, setMessage] = useState('');
  const [debugChecked, setDebugChecked] = useState(true);
  const [screenshotChecked, setScreenshotChecked] = useState(false);
  const [fileChecked, setFileChecked] = useState(false);
  const [locationChecked, setLocationChecked] = useState(false);
  const [screenshot, setScreenshot] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
  const [locationLoaded, setLocationLoaded] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Update debug info when modal opens
  useEffect(() => {
    if (isOpen && debugChecked) {
      updateDebugInfo();
    }
  }, [isOpen, debugChecked]);

  const updateDebugInfo = () => {
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    const browserInfo = getBrowserInfo();
    const osInfo = getOSInfo();
    const language = navigator.language || 'en-US';
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const connectionInfo = (navigator as any).connection ? 
      (navigator as any).connection.effectiveType || 'Unknown' : 
      'Unknown';

    setDebugInfo({
      screenResolution: screenRes,
      deviceType,
      browser: browserInfo,
      os: osInfo,
      language,
      timezone,
      connection: connectionInfo
    });
  };

  const getBrowserInfo = (): string => {
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

  const getOSInfo = (): string => {
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
      });
      
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
      setScreenshotChecked(false);
      alert('Screenshot capture failed. Please ensure you grant permission to capture your screen.');
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLocationToggle = () => {
    if (locationChecked) {
      setLocationChecked(false);
      setLocation(null);
      if (userMarker) {
        userMarker.setMap(null);
        setUserMarker(null);
      }
      if (map) {
        setMap(null);
      }
    } else {
      setLocationChecked(true);
      if (!locationLoaded) {
        loadGoogleMaps();
      } else {
        // If map already loaded, initialize it
        setTimeout(() => {
          if (mapRef.current) {
            initMap();
          }
        }, 100);
      }
    }
  };

  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) {
      setLocationLoaded(true);
      setTimeout(() => {
        initMap();
      }, 100);
      return;
    }
    
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]') as HTMLScriptElement;
    if (existingScript) {
      // Script already exists, wait for it to load
      if (window.google && window.google.maps) {
        setLocationLoaded(true);
        setTimeout(() => {
          initMap();
        }, 100);
      } else {
        // Wait for script to load
        const handleLoad = () => {
          setLocationLoaded(true);
          setTimeout(() => {
            initMap();
          }, 100);
          existingScript.removeEventListener('load', handleLoad);
        };
        existingScript.addEventListener('load', handleLoad);
      }
      return;
    }
    
    // Check if script with our ID already exists
    if (document.head.querySelector('#google-maps-script-support')) {
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCUCfMPDqV_QffjP19EA905jGthitQiBlM&libraries=places';
    script.async = true;
    script.defer = true;
    script.id = 'google-maps-script-support';
    
    script.onload = () => {
      setLocationLoaded(true);
      setTimeout(() => {
        if (mapRef.current) {
          initMap();
        }
      }, 100);
    };
    
    script.onerror = () => {
      console.error('Failed to load Google Maps script');
      setLocationLoaded(false);
    };
    
    scriptRef.current = script;
    document.head.appendChild(script);
  };

  const initMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) return;
    
    // Don't create a new map if one already exists
    if (map) {
      return;
    }
    
    // Create map with default location (will be updated)
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#464646' }]
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [{ color: '#E1E7EE' }]
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [{ color: '#1D77BD' }]
        },
        {
          featureType: 'road',
          elementType: 'all',
          stylers: [{ color: '#ffffff' }]
        }
      ]
    });
    
    setMap(newMap);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Center map on user location
          newMap.setCenter(userLocation);
          
          // Create marker for user location
          if (userMarker) {
            userMarker.setMap(null);
          }
          
          const marker = new window.google.maps.Marker({
            position: userLocation,
            map: newMap,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#0B6333',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 10
            } as any,
            title: 'Your Location'
          });
          
          setUserMarker(marker);
          
          // Set location with coordinates (Geocoding API is not enabled, so we skip address lookup)
          setLocation({
            lat: userLocation.lat,
            lng: userLocation.lng,
            address: `Your location: ${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}`
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocation({
            lat: 0,
            lng: 0,
            address: 'Could not retrieve your location. Please check your browser permissions.'
          });
          
          // Center map on default location
          newMap.setCenter({ lat: 40.7128, lng: -74.0060 }); // New York
        }
      );
    } else {
      setLocation({
        lat: 0,
        lng: 0,
        address: 'Geolocation is not supported by your browser.'
      });
      
      // Center map on default location
      newMap.setCenter({ lat: 40.7128, lng: -74.0060 }); // New York
    }
  };

  // Re-initialize map when locationChecked changes and map is loaded
  useEffect(() => {
    if (locationChecked && locationLoaded && mapRef.current && window.google && window.google.maps) {
      setTimeout(() => {
        initMap();
        if (map) {
          window.google.maps.event.trigger(map, 'resize');
        }
      }, 100);
    }
  }, [locationChecked, locationLoaded]);

  const handleSubmit = () => {
    if (!message.trim()) {
      alert('Please enter your message.');
      return;
    }

    const formData = {
      message,
      debugInfo: debugChecked ? debugInfo : null,
      screenshot: screenshot || null,
      file: selectedFile || null,
      location: locationChecked ? location : null
    };

    console.log('Sending form data:', formData);

    // Reset form
    setMessage('');
    setScreenshot('');
    setSelectedFile(null);
    setLocation(null);
    setScreenshotChecked(false);
    setFileChecked(false);
    setLocationChecked(false);
    handleFileRemove();
    
    onClose();
    
    alert('Your message has been sent successfully. We will respond within 3 business days.');
  };

  const toggleModal = () => {
    onClose();
  };

  // Handle body overflow when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Apply blur to header when modal is open (desktop only)
  useEffect(() => {
    if (!isMobile) {
      const header = document.querySelector('header');
      if (header) {
        if (isOpen) {
          header.style.filter = 'blur(4px)';
          header.style.transition = 'filter 0.3s ease';
        } else {
          header.style.filter = 'none';
        }
      }
    }
    return () => {
      const header = document.querySelector('header');
      if (header) {
        header.style.filter = 'none';
      }
    };
  }, [isOpen, isMobile]);

  if (!isOpen) return null;

  return (
    <>
      {/* Desktop Modal */}
      {!isMobile && (
        <Portal containerId="support-desktop-portal">
          <>
            <div 
              className="fixed inset-0 backdrop-blur-sm transition-all duration-300 z-[2000]"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
              onClick={toggleModal}
            />
            <div className="fixed top-1/2 left-1/2 ml-20 mt-9 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden sidebar-scroll border border-gray-200 z-[2001]">
              {/* Custom scrollbar styles */}
              <style jsx>{`
                .sidebar-scroll::-webkit-scrollbar {
                  width: 6px;
                }
                .sidebar-scroll::-webkit-scrollbar-track {
                  background: transparent;
                }
                .sidebar-scroll::-webkit-scrollbar-thumb {
                  background-color: var(--subtle-text);
                  border-radius: 3px;
                }
                .sidebar-scroll::-webkit-scrollbar-thumb:hover {
                  background-color: var(--text-default);
                }
              `}</style>
              {/* Header */}
              <div className="flex justify-between items-center px-7 py-6 border-b-2 border-gray-200 sticky top-0 bg-white z-10">
                <h2 className="text-[22px] font-bold" style={{ color: 'var(--dark-text)' }}>Contact us</h2>
                <button 
                  onClick={toggleModal}
                  className="flex items-center justify-center w-9 h-9 rounded-full border-none bg-gray-200 cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:scale-105"
                >
                  <svg className="w-4 h-4" style={{ color: 'var(--subtle-text)' }} fill="none" viewBox="0 0 15 15">
                    <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"></path>
                  </svg>
                </button>
              </div>

              {/* Info Banner */}
              <div className="flex items-start gap-3 mx-6 mt-6 px-[18px] py-[18px] rounded-[10px] border-l-4" style={{ backgroundColor: 'var(--state-info-bg)', borderLeftColor: 'var(--verification-blue)' }}>
                <svg className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--verification-blue)' }} fill="none" viewBox="0 0 20 20">
                    <path fill="#4F4F4F" d="M10 3.25C8.43084 3.25 6.92592 3.87336 5.81633 4.98295C4.70674 6.09254 4.08337 7.59747 4.08337 9.16667V9.4306C4.37153 9.31247 4.68257 9.25 5.00004 9.25H5.83337C6.47431 9.25 7.089 9.50461 7.54221 9.95783C7.99543 10.411 8.25004 11.0257 8.25004 11.6667V14.1667C8.25004 14.8076 7.99543 15.4223 7.54221 15.8755C7.089 16.3287 6.47431 16.5833 5.83337 16.5833H5.00004C4.3591 16.5833 3.74441 16.3287 3.2912 15.8755C2.83799 15.4223 2.58337 14.8076 2.58337 14.1667V9.16667C2.58337 7.19965 3.36477 5.31319 4.75567 3.92229C6.14656 2.5314 8.03302 1.75 10 1.75C11.9671 1.75 13.8535 2.53141 15.2444 3.92229C16.6353 5.31319 17.4167 7.19965 17.4167 9.16667V14.1667C17.4167 14.8076 17.1621 15.4223 16.7089 15.8755C16.4102 16.1742 16.0414 16.3866 15.6412 16.4967C15.374 17.2874 14.6508 17.8821 13.8711 18.272C12.8417 18.7867 11.472 19.0833 10 19.0833C9.58583 19.0833 9.25004 18.7476 9.25004 18.3333C9.25004 17.9191 9.58583 17.5833 10 17.5833C11.2897 17.5833 12.4201 17.3204 13.2003 16.9303C13.4508 16.805 13.646 16.678 13.7964 16.5548C13.2926 16.4767 12.8229 16.2405 12.4579 15.8755C12.0047 15.4223 11.75 14.8076 11.75 14.1667V11.6667C11.75 11.0257 12.0047 10.411 12.4579 9.95783C12.9111 9.50461 13.5258 9.25 14.1667 9.25H15C15.3175 9.25 15.6285 9.31247 15.9167 9.4306V9.16667C15.9167 7.59747 15.2933 6.09254 14.1838 4.98295C13.0742 3.87336 11.5692 3.25 10 3.25ZM15.9167 11.6667C15.9167 11.4236 15.8201 11.1904 15.6482 11.0185C15.4763 10.8466 15.2432 10.75 15 10.75H14.1667C13.9236 10.75 13.6904 10.8466 13.5185 11.0185C13.3466 11.1904 13.25 11.4236 13.25 11.6667V14.1667C13.25 14.4098 13.3466 14.6429 13.5185 14.8148C13.6904 14.9868 13.9236 15.0833 14.1667 15.0833H15C15.2432 15.0833 15.4763 14.9868 15.6482 14.8148C15.8201 14.6429 15.9167 14.4098 15.9167 14.1667V11.6667ZM4.08337 11.6667V14.1667C4.08337 14.4098 4.17995 14.6429 4.35186 14.8148C4.52377 14.9868 4.75693 15.0833 5.00004 15.0833H5.83337C6.07649 15.0833 6.30965 14.9868 6.48155 14.8148C6.65346 14.6429 6.75004 14.4098 6.75004 14.1667V11.6667C6.75004 11.4236 6.65346 11.1904 6.48155 11.0185C6.30965 10.8466 6.07649 10.75 5.83337 10.75H5.00004C4.75693 10.75 4.52377 10.8466 4.35186 11.0185C4.17995 11.1904 4.08337 11.4236 4.08337 11.6667Z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
                <p className="text-sm leading-[1.6]" style={{ color: 'var(--text-default)', fontWeight: 500 }}>
                  Please write your message in English and allow us up to 3 business days for a response.
                </p>
              </div>

              {/* Content */}
              <div className="px-7">
                {/* Message Input */}
                <div className="mb-7 flex flex-col items-start mt-4">
                  <label className="block mb-2.5 text-sm" style={{ color: 'var(--bold-text)', fontWeight: 400 }}>
                    Your message:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-[130px] px-[14px] py-[14px] text-sm border-2 rounded-lg resize-y transition-all duration-300 focus:outline-none"
                    style={{ 
                      borderColor: 'var(--border-color)',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--active-green)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(11, 99, 51, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-color)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Please describe your issue or question in detail..."
                  />
                </div>

                {/* Debug Information */}
                <div className="mb-5 border-2 rounded-[10px] overflow-hidden transition-all duration-300 bg-white" style={{ borderColor: '#E0E4E7' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--active-green)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E0E4E7'}>
                  <div className="px-[18px] py-[18px] bg-white">
                    <label className="flex items-center gap-3 cursor-pointer text-[15px]" style={{ color: 'var(--bold-text)', fontWeight: 500 }}>
                      <input
                        type="checkbox"
                        checked={debugChecked}
                        onChange={(e) => setDebugChecked(e.target.checked)}
                        className="w-[18px] h-[18px] cursor-pointer"
                        style={{ accentColor: 'var(--active-green)' }}
                      />
                      Send debug information together with my message.
                    </label>
                  </div>
                  {debugChecked && debugInfo && (
                    <div className="px-5 py-5 border-t-2" style={{ borderColor: '#E0E4E7', backgroundColor: '#FAFBFC' }}>
                      <div className="rounded-lg text-sm border" style={{ backgroundColor: 'var(--background-color)', borderColor: 'var(--border-color)' }}>
                        <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                          <span className="w-[170px] font-semibold" style={{ color: 'var(--bold-text)' }}>Using Beta:</span>
                          <span style={{ color: 'var(--text-default)', opacity: 0.9 }}>No</span>
                        </div>
                        <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                          <span className="w-[170px] font-semibold" style={{ color: 'var(--bold-text)' }}>Screen Resolution:</span>
                          <span style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.screenResolution}</span>
                        </div>
                        <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                          <span className="w-[170px] font-semibold" style={{ color: 'var(--bold-text)' }}>Detected device type:</span>
                          <span style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.deviceType}</span>
                        </div>
                        <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                          <span className="w-[170px] font-semibold" style={{ color: 'var(--bold-text)' }}>Browser:</span>
                          <span style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.browser}</span>
                        </div>
                        <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                          <span className="w-[170px] font-semibold" style={{ color: 'var(--bold-text)' }}>Operating System:</span>
                          <span style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.os}</span>
                        </div>
                        <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                          <span className="w-[170px] font-semibold" style={{ color: 'var(--bold-text)' }}>Language:</span>
                          <span style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.language}</span>
                        </div>
                        <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                          <span className="w-[170px] font-semibold" style={{ color: 'var(--bold-text)' }}>Time Zone:</span>
                          <span style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.timezone}</span>
                        </div>
                        <div className="flex px-3 py-3">
                          <span className="w-[170px] font-semibold" style={{ color: 'var(--bold-text)' }}>Connection Type:</span>
                          <span style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.connection}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Screenshot */}
                <div className="mb-5 border-2 rounded-[10px] overflow-hidden transition-all duration-300 bg-white" style={{ borderColor: '#E0E4E7' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--active-green)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E0E4E7'}>
                  <div className="px-[18px] py-[18px] bg-white">
                    <label className="flex items-center gap-3 cursor-pointer text-[15px]" style={{ color: 'var(--bold-text)', fontWeight: 500 }}>
                      <input
                        type="checkbox"
                        checked={screenshotChecked}
                        onChange={(e) => {
                          setScreenshotChecked(e.target.checked);
                          if (e.target.checked) {
                            handleScreenshot();
                          }
                        }}
                        className="w-[18px] h-[18px] cursor-pointer"
                        style={{ accentColor: 'var(--active-green)' }}
                      />
                      Include screenshot
                    </label>
                  </div>
                  {screenshotChecked && screenshot && (
                    <div className="px-5 py-5 border-t-2" style={{ borderColor: '#E0E4E7', backgroundColor: '#FAFBFC' }}>
                      <div className="mt-4 relative w-full border-2 rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                        <img src={screenshot} alt="Screenshot" className="w-full h-auto block" />
                        <button
                          onClick={() => {
                            setScreenshot('');
                            setScreenshotChecked(false);
                          }}
                          className="absolute top-3 right-3 px-4 py-2 text-xs font-semibold text-white border-none rounded-md cursor-pointer transition-all duration-300"
                          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* File Upload */}
                <div className="mb-5 border-2 rounded-[10px] overflow-hidden transition-all duration-300 bg-white" style={{ borderColor: '#E0E4E7' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--active-green)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E0E4E7'}>
                  <div className="px-[18px] py-[18px] bg-white">
                    <label className="flex items-center gap-3 cursor-pointer text-[15px]" style={{ color: 'var(--bold-text)', fontWeight: 500 }}>
                      <input
                        type="checkbox"
                        checked={fileChecked}
                        onChange={(e) => setFileChecked(e.target.checked)}
                        className="w-[18px] h-[18px] cursor-pointer"
                        style={{ accentColor: 'var(--active-green)' }}
                      />
                      Upload File
                    </label>
                  </div>
                  {fileChecked && (
                    <div className="px-5 py-5 border-t-2" style={{ borderColor: '#E0E4E7', backgroundColor: '#FAFBFC' }}>
                      <div className="mt-4">
                        <label
                          htmlFor="fileInput"
                          className="flex flex-col items-center justify-center p-10 border-[3px] border-dashed rounded-[10px] cursor-pointer transition-all duration-300 min-h-[160px]"
                          style={{ borderColor: 'var(--border-color)', backgroundColor: '#FAFBFC' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--active-green)';
                            e.currentTarget.style.backgroundColor = 'var(--apply-button-bg)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.backgroundColor = '#FAFBFC';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          {!selectedFile ? (
                            <div className="flex flex-col items-center justify-center text-center" id="uploadState">
                              <svg className="mb-4" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 341 246" fill="none">
                                <path d="M155 246H85.25C61.69 246 41.5917 237.954 24.955 221.861C8.31833 205.666 0 185.935 0 162.667C0 142.68 6.045 124.845 18.135 109.163C30.3283 93.48 46.2417 83.4862 65.875 79.1812C72.385 55.6062 85.3017 36.5412 104.625 21.9862C124.052 7.32875 146.01 0 170.5 0C200.777 0 226.403 10.455 247.38 31.365C268.46 52.1725 279 77.5925 279 107.625C296.877 109.675 311.653 117.362 323.33 130.688C335.11 143.808 341 159.183 341 176.812C341 196.082 334.232 212.431 320.695 225.859C307.158 239.286 290.677 246 271.25 246H186V136.069L210.8 159.9L232.5 138.375L170.5 76.875L108.5 138.375L130.2 159.9L155 136.069V246Z" style={{ fill: 'var(--subtle-text)' }}></path>
                              </svg>
                              <span id="dropAreaText">Choose a file to upload</span>
                            </div>
                          ) : (
                            <div className="w-full text-center" id="filePreview">
                              <div className="flex justify-between items-center mb-3 px-2">
                                <span className="font-semibold text-sm max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: 'var(--bold-text)' }}>
                                  {selectedFile.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={handleFileRemove}
                                  className="text-xs font-medium transition-colors duration-300 px-2 py-1 rounded"
                                  style={{ color: 'var(--link-text)' }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--active-green)';
                                    e.currentTarget.style.backgroundColor = 'var(--apply-button-bg)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--link-text)';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              {selectedFile.type.startsWith('image/') ? (
                                <img
                                  src={URL.createObjectURL(selectedFile)}
                                  alt="Preview"
                                  className="max-w-full max-h-[120px] object-contain rounded-md border"
                                  style={{ borderColor: 'var(--border-color)' }}
                                />
                              ) : (
                                <div className="text-xs p-3 rounded-md border whitespace-pre-line" style={{ color: 'var(--text-default)', backgroundColor: 'var(--background-color)', borderColor: 'var(--border-color)' }}>
                                  {`File type: ${selectedFile.type || 'Unknown'}\nSize: ${(selectedFile.size / 1024).toFixed(2)} KB`}
                                </div>
                              )}
                            </div>
                          )}
                          <input
                            ref={fileInputRef}
                            type="file"
                            id="fileInput"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileSelect(file);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="mb-5 border-2 rounded-[10px] overflow-hidden transition-all duration-300 bg-white" style={{ borderColor: '#E0E4E7' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--active-green)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E0E4E7'}>
                  <div className="px-[18px] py-[18px] bg-white">
                    <label className="flex items-center gap-3 cursor-pointer text-[15px]" style={{ color: 'var(--bold-text)', fontWeight: 500 }}>
                      <input
                        type="checkbox"
                        checked={locationChecked}
                        onChange={handleLocationToggle}
                        className="w-[18px] h-[18px] cursor-pointer"
                        style={{ accentColor: 'var(--active-green)' }}
                      />
                      Include my location
                    </label>
                  </div>
                  {locationChecked && (
                    <div className="px-5 py-5 border-t-2" style={{ borderColor: '#E0E4E7', backgroundColor: '#FAFBFC' }}>
                      <div className="w-full h-[280px] rounded-lg overflow-hidden mt-4 border-2" style={{ borderColor: 'var(--border-color)' }}>
                        <div ref={mapRef} id="locationMap" className="w-full h-full" style={{ backgroundColor: 'var(--background-color)' }}>
                          {!locationLoaded && (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                              <div className="text-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto" style={{ backgroundColor: 'var(--active-green)' }}>
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                </div>
                                <span className="text-sm" style={{ color: 'var(--text-default)' }}>Retrieving your location...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 text-sm font-medium" style={{ color: 'var(--text-default)' }}>
                        <p id="locationAddress">{location?.address || 'Retrieving your location...'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-8 px-7 py-5 border-t-2 sticky bottom-0 z-10" style={{ backgroundColor: '#F8FAFC', borderColor: 'var(--border-color)' }}>
                <a href="#" className="text-sm font-medium transition-colors duration-300 no-underline" style={{ color: 'var(--link-text)' }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--active-green)';
                  e.currentTarget.style.textDecoration = 'underline';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--link-text)';
                  e.currentTarget.style.textDecoration = 'none';
                }}>
                  Check service status
                </a>
                <div className="flex gap-4">
                  <button
                    onClick={handleSubmit}
                    className="px-7 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300 border-2"
                    style={{ 
                      color: 'var(--header-green)', 
                      backgroundColor: 'var(--apply-button-bg)', 
                      borderColor: 'var(--active-green)' 
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--apply-button-hover)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--apply-button-bg)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Send
                  </button>
                  <button
                    onClick={toggleModal}
                    className="px-7 py-3 text-sm font-medium rounded-lg transition-colors duration-300"
                    style={{ color: 'var(--text-default)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--bold-text)';
                      e.currentTarget.style.backgroundColor = 'var(--gray-200)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-default)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </>
        </Portal>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Portal containerId="support-mobile-portal">
              <div className="fixed inset-0 z-[1001] md:hidden">
                {/* Overlay */}
                <div 
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isOpen ? "opacity-100 visible bg-black/50" : "opacity-0 invisible"
                  )}
                  onClick={toggleModal}
                  data-backdrop="support-mobile"
                />
                
                {/* Drawer */}
                <div 
                  className={cn(
                    "fixed left-0 right-0 w-full bg-white overflow-hidden flex flex-col transition-transform duration-300",
                    isOpen ? "bottom-0" : "-bottom-full"
                  )}
                  style={{ 
                    maxHeight: '90%',
                    borderRadius: '20px 20px 0 0',
                    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  {/* Drawer Header */}
                  <div className="px-6 py-5 flex justify-between items-center border-b-2 bg-white sticky top-0 z-10 flex-shrink-0" style={{ borderColor: 'var(--border-color)' }}>
                    <h2 className="text-xl font-bold" style={{ color: 'var(--dark-text)' }}>Contact us</h2>
                    <button 
                      onClick={toggleModal}
                      className="flex items-center justify-center w-9 h-9 rounded-full border-none cursor-pointer transition-all duration-300"
                      style={{ backgroundColor: 'var(--gray-200)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--border-color)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--gray-200)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <svg className="w-4 h-4" style={{ color: 'var(--subtle-text)' }} fill="none" viewBox="0 0 15 15">
                        <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Drawer Body */}
                  <div 
                    className="flex-1 overflow-y-auto overflow-x-hidden"
                    style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent' }}
                  >
                    <style jsx>{`
                      div::-webkit-scrollbar {
                        width: 6px;
                      }
                      div::-webkit-scrollbar-track {
                        background: transparent;
                      }
                      div::-webkit-scrollbar-thumb {
                        background-color: var(--subtle-text);
                        border-radius: 3px;
                      }
                      div::-webkit-scrollbar-thumb:hover {
                        background-color: var(--text-default);
                      }
                    `}</style>
                {/* Info Banner */}
                <div className="flex items-start gap-3 mx-6 mt-6 px-[18px] py-[18px] rounded-[10px] border-l-4" style={{ backgroundColor: 'var(--state-info-bg)', borderLeftColor: 'var(--verification-blue)' }}>
                  <svg className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--verification-blue)' }} fill="none" viewBox="0 0 20 20">
                    <path fill="#4F4F4F" d="M10 3.25C8.43084 3.25 6.92592 3.87336 5.81633 4.98295C4.70674 6.09254 4.08337 7.59747 4.08337 9.16667V9.4306C4.37153 9.31247 4.68257 9.25 5.00004 9.25H5.83337C6.47431 9.25 7.089 9.50461 7.54221 9.95783C7.99543 10.411 8.25004 11.0257 8.25004 11.6667V14.1667C8.25004 14.8076 7.99543 15.4223 7.54221 15.8755C7.089 16.3287 6.47431 16.5833 5.83337 16.5833H5.00004C4.3591 16.5833 3.74441 16.3287 3.2912 15.8755C2.83799 15.4223 2.58337 14.8076 2.58337 14.1667V9.16667C2.58337 7.19965 3.36477 5.31319 4.75567 3.92229C6.14656 2.5314 8.03302 1.75 10 1.75C11.9671 1.75 13.8535 2.53141 15.2444 3.92229C16.6353 5.31319 17.4167 7.19965 17.4167 9.16667V14.1667C17.4167 14.8076 17.1621 15.4223 16.7089 15.8755C16.4102 16.1742 16.0414 16.3866 15.6412 16.4967C15.374 17.2874 14.6508 17.8821 13.8711 18.272C12.8417 18.7867 11.472 19.0833 10 19.0833C9.58583 19.0833 9.25004 18.7476 9.25004 18.3333C9.25004 17.9191 9.58583 17.5833 10 17.5833C11.2897 17.5833 12.4201 17.3204 13.2003 16.9303C13.4508 16.805 13.646 16.678 13.7964 16.5548C13.2926 16.4767 12.8229 16.2405 12.4579 15.8755C12.0047 15.4223 11.75 14.8076 11.75 14.1667V11.6667C11.75 11.0257 12.0047 10.411 12.4579 9.95783C12.9111 9.50461 13.5258 9.25 14.1667 9.25H15C15.3175 9.25 15.6285 9.31247 15.9167 9.4306V9.16667C15.9167 7.59747 15.2933 6.09254 14.1838 4.98295C13.0742 3.87336 11.5692 3.25 10 3.25ZM15.9167 11.6667C15.9167 11.4236 15.8201 11.1904 15.6482 11.0185C15.4763 10.8466 15.2432 10.75 15 10.75H14.1667C13.9236 10.75 13.6904 10.8466 13.5185 11.0185C13.3466 11.1904 13.25 11.4236 13.25 11.6667V14.1667C13.25 14.4098 13.3466 14.6429 13.5185 14.8148C13.6904 14.9868 13.9236 15.0833 14.1667 15.0833H15C15.2432 15.0833 15.4763 14.9868 15.6482 14.8148C15.8201 14.6429 15.9167 14.4098 15.9167 14.1667V11.6667ZM4.08337 11.6667V14.1667C4.08337 14.4098 4.17995 14.6429 4.35186 14.8148C4.52377 14.9868 4.75693 15.0833 5.00004 15.0833H5.83337C6.07649 15.0833 6.30965 14.9868 6.48155 14.8148C6.65346 14.6429 6.75004 14.4098 6.75004 14.1667V11.6667C6.75004 11.4236 6.65346 11.1904 6.48155 11.0185C6.30965 10.8466 6.07649 10.75 5.83337 10.75H5.00004C4.75693 10.75 4.52377 10.8466 4.35186 11.0185C4.17995 11.1904 4.08337 11.4236 4.08337 11.6667Z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                  <p className="text-sm leading-[1.6]" style={{ color: 'var(--text-default)', fontWeight: 500 }}>
                    Please write your message in English and allow us up to 3 business days for a response.
                  </p>
                </div>

                    {/* Message Input */}
                    <div className="mx-6 mb-6">
                      <label className="block mb-2.5 text-sm mt-4" style={{ color: 'var(--bold-text)', fontWeight: 400 }}>
                        Your message:
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full h-[120px] px-[14px] py-[14px] text-sm border-2 rounded-lg resize-y transition-all duration-300 focus:outline-none"
                        style={{ 
                          borderColor: 'var(--border-color)',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--active-green)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(11, 99, 51, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--border-color)';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="Please describe your issue or question in detail..."
                      />
                    </div>

                    {/* Debug Information */}
                    <div className="mx-6 mb-5 border-2 rounded-[10px] overflow-hidden transition-all duration-300 bg-white" style={{ borderColor: '#E0E4E7' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--active-green)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E0E4E7'}>
                      <div className="px-[18px] py-[18px] bg-white">
                        <label className="flex items-center gap-3 cursor-pointer text-[15px]" style={{ color: 'var(--bold-text)', fontWeight: 500 }}>
                          <input
                            type="checkbox"
                            checked={debugChecked}
                            onChange={(e) => setDebugChecked(e.target.checked)}
                            className="w-[18px] h-[18px] cursor-pointer"
                            style={{ accentColor: 'var(--active-green)' }}
                          />
                          Include debug information
                        </label>
                      </div>
                      {debugChecked && debugInfo && (
                        <div className="px-5 py-5 border-t-2" style={{ borderColor: '#E0E4E7', backgroundColor: '#FAFBFC' }}>
                          <div className="rounded-lg text-sm border" style={{ backgroundColor: 'var(--background-color)', borderColor: 'var(--border-color)' }}>
                            <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                              <span className="w-[140px] font-semibold flex-shrink-0" style={{ color: 'var(--bold-text)' }}>Using Beta:</span>
                              <span className="break-words" style={{ color: 'var(--text-default)', opacity: 0.9 }}>No</span>
                            </div>
                            <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                              <span className="w-[140px] font-semibold flex-shrink-0" style={{ color: 'var(--bold-text)' }}>Screen Resolution:</span>
                              <span className="break-words" style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.screenResolution}</span>
                            </div>
                            <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                              <span className="w-[140px] font-semibold flex-shrink-0" style={{ color: 'var(--bold-text)' }}>Detected device type:</span>
                              <span className="break-words" style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.deviceType}</span>
                            </div>
                            <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                              <span className="w-[140px] font-semibold flex-shrink-0" style={{ color: 'var(--bold-text)' }}>Browser:</span>
                              <span className="break-words" style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.browser}</span>
                            </div>
                            <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                              <span className="w-[140px] font-semibold flex-shrink-0" style={{ color: 'var(--bold-text)' }}>Operating System:</span>
                              <span className="break-words" style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.os}</span>
                            </div>
                            <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                              <span className="w-[140px] font-semibold flex-shrink-0" style={{ color: 'var(--bold-text)' }}>Language:</span>
                              <span className="break-words" style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.language}</span>
                            </div>
                            <div className="flex px-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                              <span className="w-[140px] font-semibold flex-shrink-0" style={{ color: 'var(--bold-text)' }}>Time Zone:</span>
                              <span className="break-words" style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.timezone}</span>
                            </div>
                            <div className="flex px-3 py-3">
                              <span className="w-[140px] font-semibold flex-shrink-0" style={{ color: 'var(--bold-text)' }}>Connection Type:</span>
                              <span className="break-words" style={{ color: 'var(--text-default)', opacity: 0.9 }}>{debugInfo.connection}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Screenshot */}
                    <div className="mx-6 mb-5 border-2 rounded-[10px] overflow-hidden transition-all duration-300 bg-white" style={{ borderColor: '#E0E4E7' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--active-green)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E0E4E7'}>
                      <div className="px-[18px] py-[18px] bg-white">
                        <label className="flex items-center gap-3 cursor-pointer text-[15px]" style={{ color: 'var(--bold-text)', fontWeight: 500 }}>
                          <input
                            type="checkbox"
                            checked={screenshotChecked}
                            onChange={(e) => {
                              setScreenshotChecked(e.target.checked);
                              if (e.target.checked) {
                                handleScreenshot();
                              }
                            }}
                            className="w-[18px] h-[18px] cursor-pointer"
                            style={{ accentColor: 'var(--active-green)' }}
                          />
                          Include screenshot
                        </label>
                      </div>
                      {screenshotChecked && screenshot && (
                        <div className="px-5 py-5 border-t-2" style={{ borderColor: '#E0E4E7', backgroundColor: '#FAFBFC' }}>
                          <div className="mt-4 relative w-full border-2 rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                            <img src={screenshot} alt="Screenshot" className="w-full h-auto block" />
                            <button
                              onClick={() => {
                                setScreenshot('');
                                setScreenshotChecked(false);
                              }}
                              className="absolute top-3 right-3 px-4 py-2 text-xs font-semibold text-white border-none rounded-md cursor-pointer transition-all duration-300"
                              style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* File Upload */}
                    <div className="mx-6 mb-5 border-2 rounded-[10px] overflow-hidden transition-all duration-300 bg-white" style={{ borderColor: '#E0E4E7' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--active-green)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E0E4E7'}>
                      <div className="px-[18px] py-[18px] bg-white">
                        <label className="flex items-center gap-3 cursor-pointer text-[15px]" style={{ color: 'var(--bold-text)', fontWeight: 500 }}>
                          <input
                            type="checkbox"
                            checked={fileChecked}
                            onChange={(e) => setFileChecked(e.target.checked)}
                            className="w-[18px] h-[18px] cursor-pointer"
                            style={{ accentColor: 'var(--active-green)' }}
                          />
                          Upload file
                        </label>
                      </div>
                      {fileChecked && (
                        <div className="px-5 py-5 border-t-2" style={{ borderColor: '#E0E4E7', backgroundColor: '#FAFBFC' }}>
                          <div className="mt-4">
                            <label
                              htmlFor="fileInputMobile"
                              className="flex flex-col items-center justify-center px-5 py-[30px] border-[3px] border-dashed rounded-[10px] cursor-pointer transition-all duration-300 min-h-[120px]"
                              style={{ borderColor: 'var(--border-color)', backgroundColor: '#FAFBFC' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--active-green)';
                                e.currentTarget.style.backgroundColor = 'var(--apply-button-bg)';
                                e.currentTarget.style.transform = 'scale(1.02)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-color)';
                                e.currentTarget.style.backgroundColor = '#FAFBFC';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                            >
                              {!selectedFile ? (
                                <div className="flex flex-col items-center justify-center text-center" id="uploadState">
                                  <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 341 246" fill="none">
                                    <path d="M155 246H85.25C61.69 246 41.5917 237.954 24.955 221.861C8.31833 205.666 0 185.935 0 162.667C0 142.68 6.045 124.845 18.135 109.163C30.3283 93.48 46.2417 83.4862 65.875 79.1812C72.385 55.6062 85.3017 36.5412 104.625 21.9862C124.052 7.32875 146.01 0 170.5 0C200.777 0 226.403 10.455 247.38 31.365C268.46 52.1725 279 77.5925 279 107.625C296.877 109.675 311.653 117.362 323.33 130.688C335.11 143.808 341 159.183 341 176.812C341 196.082 334.232 212.431 320.695 225.859C307.158 239.286 290.677 246 271.25 246H186V136.069L210.8 159.9L232.5 138.375L170.5 76.875L108.5 138.375L130.2 159.9L155 136.069V246Z" style={{ fill: 'var(--subtle-text)' }}></path>
                                  </svg>
                                  <span id="dropAreaText">Choose a file to upload</span>
                                </div>
                              ) : (
                                <div className="w-full text-center" id="filePreview">
                                  <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold text-sm max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: 'var(--bold-text)' }}>
                                      {selectedFile.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={handleFileRemove}
                                      className="text-xs font-medium transition-colors duration-300 px-2 py-1 rounded"
                                      style={{ color: 'var(--link-text)' }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'var(--active-green)';
                                        e.currentTarget.style.backgroundColor = 'var(--apply-button-bg)';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--link-text)';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                  {selectedFile.type.startsWith('image/') ? (
                                    <img
                                      src={URL.createObjectURL(selectedFile)}
                                      alt="Preview"
                                      className="max-w-full max-h-[100px] object-contain rounded-md border"
                                      style={{ borderColor: 'var(--border-color)' }}
                                    />
                                  ) : (
                                    <div className="text-xs p-3 rounded-md border whitespace-pre-line" style={{ color: 'var(--text-default)', backgroundColor: 'var(--background-color)', borderColor: 'var(--border-color)' }}>
                                      {`File type: ${selectedFile.type || 'Unknown'}\nSize: ${(selectedFile.size / 1024).toFixed(2)} KB`}
                                    </div>
                                  )}
                                </div>
                              )}
                              <input
                                ref={fileInputRef}
                                type="file"
                                id="fileInputMobile"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileSelect(file);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="mx-6 mb-5 border-2 rounded-[10px] overflow-hidden transition-all duration-300 bg-white" style={{ borderColor: '#E0E4E7' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--active-green)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E0E4E7'}>
                      <div className="px-[18px] py-[18px] bg-white">
                        <label className="flex items-center gap-3 cursor-pointer text-[15px]" style={{ color: 'var(--bold-text)', fontWeight: 500 }}>
                          <input
                            type="checkbox"
                            checked={locationChecked}
                            onChange={handleLocationToggle}
                            className="w-[18px] h-[18px] cursor-pointer"
                            style={{ accentColor: 'var(--active-green)' }}
                          />
                          Include my location
                        </label>
                      </div>
                      {locationChecked && (
                        <div className="px-5 py-5 border-t-2" style={{ borderColor: '#E0E4E7', backgroundColor: '#FAFBFC' }}>
                          <div className="w-full h-[200px] rounded-lg overflow-hidden mt-4 border-2" style={{ borderColor: 'var(--border-color)' }}>
                            <div ref={mapRef} id="locationMapMobile" className="w-full h-full" style={{ backgroundColor: 'var(--background-color)' }}>
                              {!locationLoaded && (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                  <div className="text-center">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 mx-auto" style={{ backgroundColor: 'var(--active-green)' }}>
                                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                    </div>
                                    <span className="text-xs" style={{ color: 'var(--text-default)' }}>Loading location...</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-3 text-sm font-medium" style={{ color: 'var(--text-default)' }}>
                            <p>{location?.address || 'Retrieving your location...'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Drawer Footer */}
                  <div className="px-6 py-5 border-t-2 flex justify-between items-center gap-4 flex-shrink-0 sticky bottom-0" style={{ backgroundColor: '#F8FAFC', borderColor: 'var(--border-color)' }}>
                    <a href="#" className="text-sm font-medium transition-colors duration-300 no-underline" style={{ color: 'var(--link-text)' }} onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--active-green)';
                      e.currentTarget.style.textDecoration = 'underline';
                    }} onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--link-text)';
                      e.currentTarget.style.textDecoration = 'none';
                    }}>
                      Service status
                    </a>
                    <div className="flex gap-3 flex-1 justify-end">
                      <button
                        onClick={handleSubmit}
                        className="px-6 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300 border-2"
                        style={{ 
                          color: 'var(--header-green)', 
                          backgroundColor: 'var(--apply-button-bg)', 
                          borderColor: 'var(--active-green)' 
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--apply-button-hover)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--apply-button-bg)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Send
                      </button>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleModal();
                        }}
                        className="px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-300 flex items-center no-underline"
                        style={{ color: 'var(--text-default)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--bold-text)';
                          e.currentTarget.style.backgroundColor = 'var(--gray-200)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-default)';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        Close
                      </a>
                    </div>
                  </div>
                </div>
              </div>
        </Portal>
      )}
    </>
  );
};

export default Support;