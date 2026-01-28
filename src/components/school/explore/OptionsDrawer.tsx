'use client';

import React from 'react';

interface OptionsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    schoolName: string;
}

export const OptionsDrawer: React.FC<OptionsDrawerProps> = ({ isOpen, onClose, schoolName }) => {
    const [activeNestedDrawer, setActiveNestedDrawer] = React.useState<'addTo' | 'moveTo' | null>(null);
    const [selectedMoveItems, setSelectedMoveItems] = React.useState<string[]>([]);

    const handleAction = (action: string) => {
        if (action === 'add-to') {
            setActiveNestedDrawer('addTo');
            return;
        }
        if (action === 'move-to') {
            setActiveNestedDrawer('moveTo');
            return;
        }

        switch (action) {
            case 'copy-link':
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    console.log('Link copied');
                }
                break;
            case 'share':
                if (navigator.share) {
                    navigator.share({
                        title: schoolName,
                        url: window.location.href
                    });
                }
                break;
            default:
                console.log(`Action: ${action} for school: ${schoolName}`);
        }

        onClose();
    };

    const handleNestedDrawerClose = () => {
        setActiveNestedDrawer(null);
    };

    const handleBackToMain = () => {
        setActiveNestedDrawer(null);
    };

    const toggleMoveSelection = (item: string) => {
        setSelectedMoveItems(prev =>
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [...prev, item]
        );
    };

    if (!isOpen && !activeNestedDrawer) return null;

    return (
        <>
            {/* Drawer Overlay */}
            <div
                className={`fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-[1000] transition-opacity duration-300 ${isOpen || activeNestedDrawer ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => {
                    if (activeNestedDrawer) {
                        handleNestedDrawerClose();
                    } else {
                        onClose();
                    }
                }}
            />

            {/* Main Drawer */}
            <div
                className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[420px] max-h-[85vh] bg-white rounded-t-[20px] shadow-[0_-2px_16px_rgba(0,0,0,0.15)] z-[1001] overflow-hidden flex flex-col transition-transform duration-300 ${isOpen && !activeNestedDrawer ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white px-5 py-4 border-b border-[#E5E5E5] flex justify-between items-center z-[2]">
                    <h2 className="text-lg font-semibold text-[#464646]">Actions</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-colors active:bg-[#F7F9FC] text-[#5F5F5F]"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto py-2 flex-grow">
                    {/* Compare */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('compare')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg fill="none" viewBox="0 0 18 18" className="w-full h-full">
                                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M4.5 11.25L6 12.75L9.375 9.375M6 6V3.9C6 3.05992 6 2.63988 6.16349 2.31901C6.3073 2.03677 6.53677 1.8073 6.81901 1.66349C7.13988 1.5 7.55992 1.5 8.4 1.5H14.1C14.9401 1.5 15.3601 1.5 15.681 1.66349C15.9632 1.8073 16.1927 2.03677 16.3365 2.31901C16.5 2.63988 16.5 3.05992 16.5 3.9V9.6C16.5 10.4401 16.5 10.8601 16.3365 11.181C16.1927 11.4632 15.9632 11.6927 15.681 11.8365C15.3601 12 14.9401 12 14.1 12H12M3.9 16.5H9.6C10.4401 16.5 10.8601 16.5 11.181 16.3365C11.4632 16.1927 11.6927 15.9632 11.8365 15.681C12 15.3601 12 14.9401 12 14.1V8.4C12 7.55992 12 7.13988 11.8365 6.81901C11.6927 6.53677 11.4632 6.3073 11.181 6.16349C10.8601 6 10.4401 6 9.6 6H3.9C3.05992 6 2.63988 6 2.31901 6.16349C2.03677 6.3073 1.8073 6.53677 1.66349 6.81901C1.5 7.13988 1.5 7.55992 1.5 8.4V14.1C1.5 14.9401 1.5 15.3601 1.66349 15.681C1.8073 15.9632 2.03677 16.1927 2.31901 16.3365C2.63988 16.5 3.05992 16.5 3.9 16.5Z"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">Compare</span>
                    </div>

                    {/* View Listing */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('view-listing')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.38189 10C5.24313 12.9154 7.45153 14.25 10 14.25C12.5485 14.25 14.7569 12.9154 16.6181 10C14.7569 7.0846 12.5485 5.75 10 5.75C7.45153 5.75 5.24313 7.0846 3.38189 10ZM1.85688 9.61413C3.94664 6.13119 6.65833 4.25 10 4.25C13.3417 4.25 16.0534 6.13119 18.1431 9.61413C18.2856 9.85164 18.2856 10.1484 18.1431 10.3859C16.0534 13.8688 13.3417 15.75 10 15.75C6.65833 15.75 3.94664 13.8688 1.85688 10.3859C1.71437 10.1484 1.71437 9.85164 1.85688 9.61413ZM8.29116 8.29116C8.74437 7.83795 9.35906 7.58333 10 7.58333C10.6409 7.58333 11.2556 7.83795 11.7088 8.29116C12.1621 8.74437 12.4167 9.35906 12.4167 10C12.4167 10.6409 12.1621 11.2556 11.7088 11.7088C11.2556 12.1621 10.6409 12.4167 10 12.4167C9.35906 12.4167 8.74437 12.1621 8.29116 11.7088C7.83795 11.2556 7.58333 10.6409 7.58333 10C7.58333 9.35906 7.83795 8.74437 8.29116 8.29116ZM10 9.08333C9.75689 9.08333 9.52373 9.17991 9.35182 9.35182C9.17991 9.52373 9.08333 9.75689 9.08333 10C9.08333 10.2431 9.17991 10.4763 9.35182 10.6482C9.52373 10.8201 9.75689 10.9167 10 10.9167C10.2431 10.9167 10.4763 10.8201 10.6482 10.6482C10.8201 10.4763 10.9167 10.2431 10.9167 10C10.9167 9.75689 10.8201 9.52373 10.6482 9.35182C10.4763 9.17991 10.2431 9.08333 10 9.08333Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">View Listing</span>
                    </div>

                    {/* Leave Review */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('leave-review')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                <path d="M22.954 9.395C22.832 9.017 22.481 8.756 22.058 8.747L15.298 8.823L12.878 1.628C12.746 1.252 12.39 1 11.992 1H11.99C11.591 1 11.236 1.254 11.103 1.639L8.72301 8.822L1.92101 8.686C1.52101 8.693 1.16901 8.953 1.04601 9.333C0.922011 9.714 1.05401 10.132 1.36001 10.361L6.82101 14.607L4.55601 21.791C4.44101 22.173 4.58101 22.588 4.90501 22.821C5.23101 23.056 5.66501 23.056 5.99101 22.829L12.121 18.526L17.994 22.83C18.155 22.942 18.343 22.998 18.531 22.998C18.726 22.998 18.919 22.938 19.083 22.819C19.406 22.583 19.544 22.169 19.424 21.777L17.129 14.74L22.628 10.43C22.946 10.189 23.077 9.772 22.954 9.393V9.395ZM16.211 13.554C15.736 13.916 15.534 14.541 15.711 15.123L17.463 20.581L12.942 17.268C12.451 16.925 11.794 16.927 11.304 17.268L6.49301 20.646L8.25601 15.053C8.42901 14.482 8.22601 13.856 7.76201 13.504L3.60601 10.222L8.80301 10.326C9.39901 10.313 9.93101 9.927 10.13 9.353L11.997 3.719L13.895 9.363C14.091 9.927 14.622 10.313 15.243 10.326L20.405 10.267L16.211 13.554Z"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">Leave Review</span>
                    </div>

                    {/* Monitor */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('monitor')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 16 16" strokeLinejoin="round" className="w-full h-full">
                                <path fill="currentColor" d="M5.51324 3.62367L3.76375 8.34731C3.61845 8.7396 3.24433 8.99999 2.826 8.99999H0.75H0V7.49999H0.75H2.47799L4.56666 1.86057C4.88684 0.996097 6.10683 0.988493 6.43776 1.84891L10.5137 12.4463L12.2408 8.1286C12.3926 7.74894 12.7604 7.49999 13.1693 7.49999H15.25H16V8.99999H15.25H13.5078L11.433 14.1868C11.0954 15.031 9.8976 15.023 9.57122 14.1744L5.51324 3.62367Z" clipRule="evenodd" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">Monitor</span>
                    </div>

                    {/* Share */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('share')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
                                <path fill="currentColor" d="M11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289L16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711C16.3166 9.09763 15.6834 9.09763 15.2929 8.70711L13 6.41421V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V6.41421L8.70711 8.70711C8.31658 9.09763 7.68342 9.09763 7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289L11.2929 3.29289ZM4 14C4.55228 14 5 14.4477 5 15V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V15C19 14.4477 19.4477 14 20 14C20.5523 14 21 14.4477 21 15V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V15C3 14.4477 3.44772 14 4 14Z" clipRule="evenodd" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">Share</span>
                    </div>

                    {/* Apply Now */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors bg-[#EBFCF4] active:bg-[#D7F7E9]" onClick={() => handleAction('apply-now')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#016853] flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 489.8 489.8" fill="currentColor" className="w-full h-full">
                                <path d="M438.2,0H51.6C23.1,0,0,23.2,0,51.6v386.6c0,28.5,23.2,51.6,51.6,51.6h386.6c28.5,0,51.6-23.2,51.6-51.6V51.6 C489.8,23.2,466.6,0,438.2,0z M465.3,438.2c0,14.9-12.2,27.1-27.1,27.1H51.6c-14.9,0-27.1-12.2-27.1-27.1V51.6 c0-14.9,12.2-27.1,27.1-27.1h386.6c14.9,0,27.1,12.2,27.1,27.1V438.2z"></path>
                                <path d="M337.4,232.7h-80.3v-80.3c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v80.3h-80.3c-6.8,0-12.3,5.5-12.3,12.2 c0,6.8,5.5,12.3,12.3,12.3h80.3v80.3c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-80.3h80.3c6.8,0,12.3-5.5,12.3-12.3 C349.7,238.1,344.2,232.7,337.4,232.7z"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#016853] font-medium leading-relaxed flex-grow">Apply Now</span>
                    </div>

                    {/* View Offers */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors bg-[#EBFCF4] active:bg-[#D7F7E9]" onClick={() => handleAction('view-offers')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#016853] flex items-center justify-center flex-shrink-0">
                            <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
                                <path fill="currentColor" d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" />
                            </svg>
                        </div>
                        <span className="text-base text-[#016853] font-medium leading-relaxed flex-grow">View Offers</span>
                    </div>

                    {/* Virtual Tour */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('virtual-tour')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 24 24" className="w-full h-full">
                                <path fill="currentColor" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10ZM11.132 4.432c.35-.333.641-.432.868-.432.227 0 .518.1.868.432.354.337.719.872 1.047 1.61.635 1.43 1.06 3.456 1.084 5.75-.937.134-1.944.208-2.999.208-1.055 0-2.062-.074-2.999-.209.024-2.293.449-4.319 1.084-5.749.328-.738.693-1.273 1.047-1.61ZM7.01 11.39c.066-2.356.519-4.517 1.249-6.16a9.16 9.16 0 0 1 .188-.399 8.015 8.015 0 0 0-4.255 5.422c.74.448 1.697.839 2.818 1.137Zm-3 1.035c.886.425 1.913.775 3.039 1.035.14 2.024.566 3.867 1.208 5.31.06.136.123.269.188.399a8.002 8.002 0 0 1-4.435-6.744Zm5.075 1.395c.935.118 1.912.18 2.914.18 1.002 0 1.98-.062 2.914-.18-.157 1.627-.517 3.053-1 4.138-.327.738-.692 1.273-1.046 1.61-.35.333-.641.432-.868.432-.227 0-.518-.1-.868-.432-.354-.337-.719-.872-1.047-1.61-.482-1.084-.842-2.511-.999-4.137Zm7.864-.36c-.14 2.024-.566 3.867-1.208 5.31a9.16 9.16 0 0 1-.188.399 8.002 8.002 0 0 0 4.435-6.744c-.886.425-1.913.775-3.039 1.035Zm2.859-3.207a8.015 8.015 0 0 0-4.255-5.422c.065.13.128.263.188.399.73 1.643 1.182 3.804 1.25 6.16 1.12-.298 2.078-.69 2.817-1.137Z" fillRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">Virtual Tour</span>
                    </div>

                    {/* Copy Link */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('copy-link')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
                                <path fill="currentColor" d="M18.2929 5.70711C16.4743 3.88849 13.5257 3.88849 11.7071 5.7071L10.7071 6.70711C10.3166 7.09763 9.68341 7.09763 9.29289 6.70711C8.90236 6.31658 8.90236 5.68342 9.29289 5.29289L10.2929 4.29289C12.8926 1.69323 17.1074 1.69323 19.7071 4.29289C22.3068 6.89256 22.3068 11.1074 19.7071 13.7071L18.7071 14.7071C18.3166 15.0976 17.6834 15.0976 17.2929 14.7071C16.9024 14.3166 16.9024 13.6834 17.2929 13.2929L18.2929 12.2929C20.1115 10.4743 20.1115 7.52572 18.2929 5.70711ZM15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.7071 15.7071C9.31658 16.0976 8.68341 16.0976 8.29289 15.7071C7.90236 15.3166 7.90236 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289ZM6.7071 9.29289C7.09763 9.68342 7.09763 10.3166 6.7071 10.7071L5.7071 11.7071C3.88849 13.5257 3.88849 16.4743 5.7071 18.2929C7.52572 20.1115 10.4743 20.1115 12.2929 18.2929L13.2929 17.2929C13.6834 16.9024 14.3166 16.9024 14.7071 17.2929C15.0976 17.6834 15.0976 18.3166 14.7071 18.7071L13.7071 19.7071C11.1074 22.3068 6.89255 22.3068 4.29289 19.7071C1.69322 17.1074 1.69322 12.8926 4.29289 10.2929L5.29289 9.29289C5.68341 8.90237 6.31658 8.90237 6.7071 9.29289Z" clipRule="evenodd" fillRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">Copy Link</span>
                    </div>

                    {/* Add To */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('add-to')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                <path d="M16 9a7 7 0 1 1 0 14 7 7 0 1 1 0-14zm4-7a2 2 0 0 1 2 2v4h-1.5V3.5h-17v17H8V22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16zm-3 10h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z" fillRule="nonzero"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">Add To</span>
                        <div className="w-5 h-5 text-[#5F5F5F]">
                            <svg viewBox="0 0 24 24" className="w-full h-full">
                                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </div>
                    </div>

                    {/* Move To */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('move-to')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.8" stroke="currentColor" fill="none" viewBox="0 0 24 24" className="w-full h-full">
                                <path d="M18 4l3 3l-3 3"></path>
                                <path d="M18 20l3 -3l-3 -3"></path>
                                <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5"></path>
                                <path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">Move To</span>
                        <div className="w-5 h-5 text-[#5F5F5F]">
                            <svg viewBox="0 0 24 24" className="w-full h-full">
                                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </div>
                    </div>

                    {/* Vendor Section */}
                    <div className="px-5 pt-4 pb-2 text-[13px] text-[#5F5F5F] font-semibold uppercase tracking-wider">Vendor</div>

                    {/* New Announcement */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('new-announcement')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                                <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm3.519 0L12 11.671 18.481 6H5.52zM20 7.329l-7.341 6.424a1 1 0 0 1-1.318 0L4 7.329V18h16V7.329z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">New Announcement</span>
                    </div>

                    {/* View Analytics */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('view-analytics')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
                                <path fill="currentColor" d="M3.71863 3.71841C4.25138 3.18562 4.97399 2.88635 5.72738 2.88635H18.2728C19.0262 2.88635 19.7488 3.18561 20.2816 3.71841C20.8145 4.25117 21.1137 4.97382 21.1137 5.72726V18.2727C21.1137 19.0261 20.8145 19.7487 20.2817 20.2815C20.2817 20.2815 20.2817 20.2815 20.2816 20.2815C20.2816 20.2815 20.2816 20.2816 20.2816 20.2816C19.7488 20.8144 19.0262 21.1136 18.2728 21.1136H5.72738C4.97394 21.1136 4.25129 20.8143 3.71853 20.2815C3.18574 19.7487 2.88647 19.0261 2.88647 18.2727V5.72726C2.88647 4.97387 3.18574 4.25126 3.71853 3.71851C3.71856 3.71848 3.7186 3.71844 3.71863 3.71841ZM5.72738 4.38635C5.37173 4.38635 5.03068 4.52763 4.77929 4.77907L4.77919 4.77917C4.52776 5.03056 4.38647 5.37161 4.38647 5.72726V18.2727C4.38647 18.6284 4.52776 18.9694 4.77919 19.2208L4.77929 19.2209C5.03068 19.4723 5.37173 19.6136 5.72738 19.6136H18.2728C18.6285 19.6136 18.9695 19.4723 19.2209 19.2209L19.221 19.2208C19.4725 18.9694 19.6137 18.6284 19.6137 18.2727V5.72726C19.6137 5.37161 19.4725 5.03056 19.221 4.77917L19.2209 4.77907C18.9695 4.52764 18.6285 4.38635 18.2728 4.38635H5.72738ZM16.1819 7.06817C16.5961 7.06817 16.9319 7.40396 16.9319 7.81817V16.1818C16.9319 16.596 16.5961 16.9318 16.1819 16.9318C15.7677 16.9318 15.4319 16.596 15.4319 16.1818V7.81817C15.4319 7.40396 15.7677 7.06817 16.1819 7.06817ZM12.0001 10.2045C12.4143 10.2045 12.7501 10.5403 12.7501 10.9545V16.1818C12.7501 16.596 12.4143 16.9318 12.0001 16.9318C11.5859 16.9318 11.2501 16.596 11.2501 16.1818V10.9545C11.2501 10.5403 11.5859 10.2045 12.0001 10.2045ZM7.81829 13.3409C8.23251 13.3409 8.56829 13.6767 8.56829 14.0909V16.1818C8.56829 16.596 8.23251 16.9318 7.81829 16.9318C7.40408 16.9318 7.06829 16.596 7.06829 16.1818V14.0909C7.06829 13.6767 7.40408 13.3409 7.81829 13.3409Z" clipRule="evenodd" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">View Analytics</span>
                    </div>

                    {/* View Reports */}
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => handleAction('view-reports')}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                <path d="M2.69965 2C2.31984 2 2 2.30985 2 2.69965V21.3003C2 21.6802 2.30985 22 2.69965 22H21.3003C21.6802 22 22 21.6902 22 21.3003V2.69965C22 2.31984 21.6902 2 21.3003 2H2.69965ZM20.5907 3.38931V20.6007H3.38931V3.38931H20.6007H20.5907Z"></path>
                                <path d="M18.1219 18.012C18.5017 18.012 18.8216 17.7021 18.8216 17.3123C18.8216 16.9225 18.5117 16.6227 18.1219 16.6227H17.992V12.4048C17.992 12.025 17.6822 11.7051 17.2924 11.7051C16.9025 11.7051 16.5927 12.015 16.5927 12.4048V16.6227H15.5132V9.94603C15.5132 9.75612 15.4533 9.58621 15.3133 9.45627C15.1734 9.32634 15.0035 9.25637 14.8236 9.25637C14.4438 9.25637 14.1339 9.56622 14.1239 9.94603V16.6227H13.0545V5.84808C13.0545 5.46827 12.7446 5.14843 12.3548 5.14843C11.965 5.14843 11.6552 5.45827 11.6552 5.84808V16.6227H10.5857V14.044C10.5857 13.6642 10.2759 13.3443 9.88606 13.3443C9.49625 13.3443 9.18641 13.6542 9.18641 14.044V16.6227H8.11694V9.94603C8.11694 9.56622 7.8071 9.25637 7.41729 9.25637C7.02749 9.25637 6.71764 9.56622 6.71764 9.94603V16.6227H5.76812C5.38831 16.6227 5.06847 16.9325 5.06847 17.3123C5.06847 17.6922 5.37831 18.012 5.76812 18.012H18.1219Z"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">View Reports</span>
                    </div>
                </div>
            </div>

            {/* Add To Nested Drawer */}
            <div
                className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[420px] max-h-[85vh] bg-white rounded-t-[20px] shadow-[0_-2px_16px_rgba(0,0,0,0.15)] z-[1002] overflow-hidden flex flex-col transition-transform duration-300 ${activeNestedDrawer === 'addTo' ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <div className="sticky top-0 bg-white px-5 py-4 border-b border-[#E5E5E5] flex justify-between items-center z-[2]">
                    <button
                        onClick={handleBackToMain}
                        className="flex items-center px-3 py-2 -ml-3 rounded-md text-[#346DC2] text-sm font-medium transition-colors hover:bg-[rgba(52,109,194,0.08)]"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] mr-1.5">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back</span>
                    </button>
                    <h2 className="text-lg font-semibold text-[#464646] absolute left-1/2 -translate-x-1/2">Add To</h2>
                    <button
                        onClick={() => { handleNestedDrawerClose(); onClose(); }}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-colors active:bg-[#F7F9FC] text-[#5F5F5F]"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="overflow-y-auto py-2 flex-grow">
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => { console.log('Add to favorites'); handleNestedDrawerClose(); onClose(); }}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                <path d="M9 12h6m-3-3v6m-7 0h2a2 2 0 002-2v-4a2 2 0 00-2-2H5m14 0h-2a2 2 0 00-2 2v4a2 2 0 002 2h2"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">My Favorites</span>
                    </div>
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => { console.log('Add to watchlist'); handleNestedDrawerClose(); onClose(); }}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">Watchlist</span>
                    </div>
                    <div className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC]" onClick={() => { console.log('Add to custom'); handleNestedDrawerClose(); onClose(); }}>
                        <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                        </div>
                        <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">Custom List</span>
                    </div>
                </div>
            </div>

            {/* Move To Nested Drawer */}
            <div
                className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[420px] max-h-[85vh] bg-white rounded-t-[20px] shadow-[0_-2px_16px_rgba(0,0,0,0.15)] z-[1002] overflow-hidden flex flex-col transition-transform duration-300 ${activeNestedDrawer === 'moveTo' ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <div className="sticky top-0 bg-white px-5 py-4 border-b border-[#E5E5E5] flex justify-between items-center z-[2]">
                    <button
                        onClick={handleBackToMain}
                        className="flex items-center px-3 py-2 -ml-3 rounded-md text-[#346DC2] text-sm font-medium transition-colors hover:bg-[rgba(52,109,194,0.08)]"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] mr-1.5">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back</span>
                    </button>
                    <h2 className="text-lg font-semibold text-[#464646] absolute left-1/2 -translate-x-1/2">Move To</h2>
                    <button
                        onClick={() => { handleNestedDrawerClose(); onClose(); }}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-colors active:bg-[#F7F9FC] text-[#5F5F5F]"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="overflow-y-auto py-2 flex-grow">
                    {['Home', 'Archive', 'Scheduled'].map((item) => (
                        <div
                            key={item}
                            className={`flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC] ${selectedMoveItems.includes(item) ? 'bg-[#F7F9FC]' : ''}`}
                            onClick={() => toggleMoveSelection(item)}
                        >
                            <div className="w-[22px] h-[22px] mr-4 text-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                    {item === 'Home' && <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>}
                                    {item === 'Archive' && <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>}
                                    {item === 'Scheduled' && <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>}
                                </svg>
                            </div>
                            <span className="text-base text-[#464646] font-medium leading-relaxed flex-grow">{item}</span>
                            <div className={`w-6 h-6 flex items-center justify-center transition-opacity ${selectedMoveItems.includes(item) ? 'opacity-100' : 'opacity-0'}`}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-[#089E68]">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
