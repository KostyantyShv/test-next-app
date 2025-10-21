'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ContentType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface MatchingRequest {
  id: number;
  title: string;
  author: string;
  type: string;
  votes: number;
  image: string;
}

interface RequestContentProps {
  isOpen: boolean;
  onClose: () => void;
}

const contentTypes: ContentType[] = [
  {
    id: 'k12',
    name: 'K12',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833ZM6.75 6.75462C6.53133 6.73031 6.30401 6.80199 6.13634 6.96967L1.96967 11.1363C1.82902 11.277 1.75 11.4678 1.75 11.6667V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V3.33333C18.25 2.91341 18.0832 2.51068 17.7863 2.21375C17.4893 1.91681 17.0866 1.75 16.6667 1.75H8.33333C7.91341 1.75 7.51068 1.91681 7.21375 2.21375C6.91682 2.51068 6.75 2.91341 6.75 3.33333V6.75462ZM10.8333 5.08333C11.2475 5.08333 11.5833 5.41912 11.5833 5.83333V5.84167C11.5833 6.25588 11.2475 6.59167 10.8333 6.59167C10.4191 6.59167 10.0833 6.25588 10.0833 5.84167V5.83333C10.0833 5.41912 10.4191 5.08333 10.8333 5.08333ZM14.1667 5.08333C14.5809 5.08333 14.9167 5.41912 14.9167 5.83333V5.84167C14.9167 6.25588 14.5809 6.59167 14.1667 6.59167C13.7525 6.59167 13.4167 6.25588 13.4167 5.84167V5.83333C13.4167 5.41912 13.7525 5.08333 14.1667 5.08333ZM14.1667 8.41667C14.5809 8.41667 14.9167 8.75245 14.9167 9.16667V9.175C14.9167 9.58921 14.5809 9.925 14.1667 9.925C13.7525 9.925 13.4167 9.58921 13.4167 9.175V9.16667C13.4167 8.75245 13.7525 8.41667 14.1667 8.41667ZM14.1667 11.75C14.5809 11.75 14.9167 12.0858 14.9167 12.5V12.5083C14.9167 12.9225 14.5809 13.2583 14.1667 13.2583C13.7525 13.2583 13.4167 12.9225 13.4167 12.5083V12.5C13.4167 12.0858 13.7525 11.75 14.1667 11.75Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 'college',
    name: 'College',
    icon: (
      <svg viewBox="0 0 640 512" className="w-4 h-4">
        <path
          d="M306.7 4c8.1-5.4 18.6-5.4 26.6 0l138 92L568 96c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-184 0-128 0L72 512c-39.8 0-72-32.2-72-72L0 168c0-39.8 32.2-72 72-72l96.7 0 138-92zM568 464c13.3 0 24-10.7 24-24l0-272c0-13.3-10.7-24-24-24l-104 0c-4.7 0-9.4-1.4-13.3-4L320 52.8 189.3 140c-3.9 2.6-8.6 4-13.3 4L72 144c-13.3 0-24 10.7-24 24l0 272c0 13.3 10.7 24 24 24l184 0 0-80c0-35.3 28.7-64 64-64s64 28.7 64 64l0 80 184 0zM112 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm368 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM112 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm368 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM240 192a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zm80-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l24 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-8 0 0-16c0-8.8-7.2-16-16-16z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 'grad-school',
    name: 'Grad School',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'district',
    name: 'District',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" />
      </svg>
    ),
  },
];

const sampleRequests: MatchingRequest[] = [
  {
    id: 1,
    title: "Advanced Mathematics for Engineers",
    author: "Dr. Sarah Johnson",
    type: "k12",
    votes: 15,
    image: "https://i.ibb.co/5NTkykV/product3.jpg",
  },
  {
    id: 2,
    title: "Introduction to Computer Science",
    author: "Prof. Michael Chen",
    type: "college",
    votes: 23,
    image: "https://i.ibb.co/XkdtT1Y/product2.png",
  },
  {
    id: 3,
    title: "Physics Fundamentals",
    author: "Dr. Amanda Rodriguez",
    type: "k12",
    votes: 8,
    image: "https://i.ibb.co/5NTkykV/product3.jpg",
  },
  {
    id: 4,
    title: "Research Methods in Psychology",
    author: "Prof. David Wilson",
    type: "grad-school",
    votes: 19,
    image: "https://i.ibb.co/XkdtT1Y/product2.png",
  },
  {
    id: 5,
    title: "Elementary School Curriculum Guide",
    author: "Mary Thompson",
    type: "district",
    votes: 12,
    image: "https://i.ibb.co/5NTkykV/product3.jpg",
  },
  {
    id: 6,
    title: "Modern Biology Textbook",
    author: "Dr. Jennifer Lee",
    type: "k12",
    votes: 31,
    image: "https://i.ibb.co/XkdtT1Y/product2.png",
  },
  {
    id: 7,
    title: "Statistics for Business Students",
    author: "Prof. Robert Taylor",
    type: "college",
    votes: 27,
    image: "https://i.ibb.co/5NTkykV/product3.jpg",
  },
  {
    id: 8,
    title: "Advanced Organic Chemistry",
    author: "Dr. Lisa Martinez",
    type: "grad-school",
    votes: 16,
    image: "https://i.ibb.co/XkdtT1Y/product2.png",
  },
  {
    id: 9,
    title: "District Technology Integration Plan",
    author: "Technology Committee",
    type: "district",
    votes: 9,
    image: "https://i.ibb.co/5NTkykV/product3.jpg",
  },
  {
    id: 10,
    title: "Creative Writing Workshop",
    author: "Prof. Emily Davis",
    type: "college",
    votes: 21,
    image: "https://i.ibb.co/XkdtT1Y/product2.png",
  },
  {
    id: 11,
    title: "Early Childhood Development",
    author: "Dr. Karen Brown",
    type: "k12",
    votes: 14,
    image: "https://i.ibb.co/5NTkykV/product3.jpg",
  },
  {
    id: 12,
    title: "Machine Learning Fundamentals",
    author: "Prof. Alex Kumar",
    type: "grad-school",
    votes: 35,
    image: "https://i.ibb.co/XkdtT1Y/product2.png",
  },
  {
    id: 13,
    title: "School Leadership Best Practices",
    author: "Administrative Team",
    type: "district",
    votes: 7,
    image: "https://i.ibb.co/5NTkykV/product3.jpg",
  },
  {
    id: 14,
    title: "World History Comprehensive Guide",
    author: "Dr. Thomas Anderson",
    type: "k12",
    votes: 18,
    image: "https://i.ibb.co/XkdtT1Y/product2.png",
  },
  {
    id: 15,
    title: "International Business Strategy",
    author: "Prof. Maria Garcia",
    type: "college",
    votes: 25,
    image: "https://i.ibb.co/5NTkykV/product3.jpg",
  },
];

export default function RequestContent({ isOpen, onClose }: RequestContentProps) {
  const [selectedContentType, setSelectedContentType] = useState(contentTypes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [showUrlPreview, setShowUrlPreview] = useState(false);
  const [previewData, setPreviewData] = useState({ title: '', description: '', image: '' });
  const [matchingRequests, setMatchingRequests] = useState<MatchingRequest[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [focusedDropdownIndex, setFocusedDropdownIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const urlTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setFocusedDropdownIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, input, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus first element when modal opens
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  // Update matching requests when inputs change
  useEffect(() => {
    const filteredRequests = sampleRequests.filter(request => {
      const matchesType = request.type === selectedContentType.id;
      const matchesTitle = !title || request.title.toLowerCase().includes(title.toLowerCase());
      return matchesType && matchesTitle;
    });

    setMatchingRequests(filteredRequests.slice(0, 5));
  }, [selectedContentType.id, title]);

  // Handle URL input with debouncing
  useEffect(() => {
    if (urlTimeoutRef.current) {
      clearTimeout(urlTimeoutRef.current);
    }

    if (url && isValidUrl(url)) {
      setIsLoadingPreview(true);
      urlTimeoutRef.current = setTimeout(() => {
        generatePreviewData(url);
        setShowUrlPreview(true);
        setIsLoadingPreview(false);
      }, 500);
    } else {
      setShowUrlPreview(false);
      setIsLoadingPreview(false);
    }

    return () => {
      if (urlTimeoutRef.current) {
        clearTimeout(urlTimeoutRef.current);
      }
    };
  }, [url]);

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generatePreviewData = (url: string) => {
    const titles = [
      "Understanding Modern Educational Technology Integration",
      "Advanced Learning Management Systems for Higher Education",
      "Innovative Teaching Methods in the Digital Age",
      "Student Assessment Strategies and Best Practices",
      "Creating Inclusive Learning Environments"
    ];
    
    const descriptions = [
      "This comprehensive guide explores the latest trends in educational technology and provides practical strategies for implementation in modern learning environments.",
      "An in-depth analysis of current pedagogical approaches and their effectiveness in promoting student engagement and academic success.",
      "Discover innovative methods for enhancing student learning through technology integration and evidence-based teaching practices."
    ];
    
    const images = [
      "https://i.ibb.co/5NTkykV/product3.jpg",
      "https://i.ibb.co/XkdtT1Y/product2.png"
    ];
    
    setPreviewData({
      title: titles[Math.floor(Math.random() * titles.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      image: images[Math.floor(Math.random() * images.length)]
    });
  };

  const handleVote = (id: number, action: 'up' | 'down') => {
    setMatchingRequests(prev => 
      prev.map(request => {
        if (request.id === id) {
          const newVotes = action === 'up' ? request.votes + 1 : Math.max(0, request.votes - 1);
          return { ...request, votes: newVotes };
        }
        return request;
      })
    );
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsDropdownOpen(true);
        setFocusedDropdownIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedDropdownIndex(prev => 
          prev < contentTypes.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedDropdownIndex(prev => 
          prev > 0 ? prev - 1 : contentTypes.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedDropdownIndex >= 0 && focusedDropdownIndex < contentTypes.length) {
          setSelectedContentType(contentTypes[focusedDropdownIndex]);
          setIsDropdownOpen(false);
          setFocusedDropdownIndex(-1);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsDropdownOpen(false);
        setFocusedDropdownIndex(-1);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }
    
    if (!isValidUrl(url.trim())) {
      alert('Please enter a valid URL');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Form submitted:', {
      contentType: selectedContentType.id,
      title: title.trim(),
      url: url.trim()
    });

    setIsSubmitting(false);
    onClose();
  };

  const hasMatchingResults = matchingRequests.length > 0;
  const canSubmit = !hasMatchingResults || isCheckboxChecked;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-5">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-100 relative">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">Request New Content</h2>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Content Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onKeyDown={handleDropdownKeyDown}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="listbox"
                  id="content-type-dropdown"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="text-green-600">
                      {selectedContentType.icon}
                    </div>
                    <span>{selectedContentType.name}</span>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 animate-in slide-in-from-top-2 duration-150"
                    role="listbox"
                    aria-labelledby="content-type-dropdown"
                  >
                    {contentTypes.map((type, index) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          setSelectedContentType(type);
                          setIsDropdownOpen(false);
                          setFocusedDropdownIndex(-1);
                        }}
                        className={`w-full p-3 text-left flex items-center gap-2.5 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors ${
                          focusedDropdownIndex === index ? 'bg-gray-50' : ''
                        }`}
                        role="option"
                        aria-selected={selectedContentType.id === type.id}
                        tabIndex={-1}
                      >
                        <div className="text-green-600">
                          {type.icon}
                        </div>
                        <span>{type.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter content title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />

              {/* URL Preview */}
              {(showUrlPreview || isLoadingPreview) && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 animate-in slide-in-from-top-2 duration-300">
                  <span className="block text-xs font-medium text-gray-500 mb-3">Preview</span>
                  {isLoadingPreview ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="ml-2 text-sm text-gray-500">Loading preview...</span>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <img 
                        src={previewData.image} 
                        alt="Content preview" 
                        className="w-15 h-15 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-700 line-clamp-3 mb-1.5">
                          {previewData.title}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-3">
                          {previewData.description}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Matching Requests */}
            {matchingRequests.length > 0 && (
              <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 mb-4">Matching Requests</h4>
                <div className="space-y-2">
                  {matchingRequests.map((request) => (
                    <div key={request.id} className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-lg hover:shadow-sm transition-shadow">
                      <img 
                        src={request.image} 
                        alt={request.title} 
                        className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-700 truncate">
                          {request.title}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <span>{request.author}</span>
                          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-600 rounded text-xs font-medium">
                            {contentTypes.find(t => t.id === request.type)?.icon}
                            <span>{contentTypes.find(t => t.id === request.type)?.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center min-w-8">
                        <button
                          type="button"
                          onClick={() => handleVote(request.id, 'up')}
                          className="text-gray-500 hover:text-green-600 p-0.5 text-xs transition-colors"
                        >
                          ▲
                        </button>
                        <span className="text-xs font-medium text-gray-700 my-0.5">
                          {request.votes}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleVote(request.id, 'down')}
                          className="text-gray-500 hover:text-green-600 p-0.5 text-xs transition-colors"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirmation Section */}
            <div className="pt-5 border-t border-gray-200">
              {hasMatchingResults && (
                <div className="flex items-start gap-3 mb-5">
                  <div
                    className={`w-4.5 h-4.5 border-2 rounded cursor-pointer flex items-center justify-center transition-all ${
                      isCheckboxChecked 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setIsCheckboxChecked(!isCheckboxChecked)}
                    role="checkbox"
                    aria-checked={isCheckboxChecked}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsCheckboxChecked(!isCheckboxChecked);
                      }
                    }}
                  >
                    {isCheckboxChecked && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                  <label className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                    I confirm my request is not in the list above
                  </label>
                </div>
              )}
              
              <button
                ref={lastFocusableRef}
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full py-3 px-6 bg-green-50 text-green-800 border border-green-200 rounded-lg font-medium hover:bg-green-100 hover:border-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
