'use client';

import React, { useState } from 'react';
import { MobileDrawerIcons } from './MobileDrawerIcons';
import { MobileCollectionDrawer } from './MobileCollectionDrawer';

// --- REUSABLE COMPONENTS ---

interface DrawerItemProps {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    className?: string;
    textClassName?: string;
    hasArrow?: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
    icon,
    text,
    onClick,
    className = "",
    textClassName = "text-[#464646]",
    hasArrow = false
}) => (
    <div
        onClick={onClick}
        className={`flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC] ${className}`}
    >
        <div className="mr-4 flex items-center justify-center">
            {icon}
        </div>
        <span className={`text-base font-medium flex-grow leading-[1.4] ${textClassName}`}>
            {text}
        </span>
        {hasArrow && <MobileDrawerIcons.Arrow />}
    </div>
);

interface MultiSelectProps extends Omit<DrawerItemProps, 'hasArrow'> {
    isSelected: boolean;
}

const DrawerMultiSelectItem: React.FC<MultiSelectProps> = ({ icon, text, isSelected, onClick }) => (
    <div
        onClick={(e) => {
            e.stopPropagation();
            onClick?.();
        }}
        className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC] group"
    >
        <div className="mr-4 flex items-center justify-center">
            {icon}
        </div>
        <span className="text-base font-medium text-[#464646] flex-grow">
            {text}
        </span>

        <div className={`ml-auto w-6 h-6 flex items-center justify-center transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
            {isSelected && (
                <>
                    <div className="group-active:hidden"><MobileDrawerIcons.Check /></div>
                    <div className="hidden group-active:block"><MobileDrawerIcons.Remove /></div>
                </>
            )}
        </div>
    </div>
);

// --- DRAWER SHELL COMPONENT ---

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    hasBack?: boolean;
    onBack?: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, hasBack, onBack }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible delay-300'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed bottom-0 left-0 right-0 w-full max-w-[420px] mx-auto max-h-[85vh] bg-white rounded-t-[20px] shadow-[0_-2px_16px_rgba(0,0,0,0.15)] z-[1001] flex flex-col overflow-hidden transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0 visible' : 'translate-y-full invisible'
                    }`}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white px-5 py-4 border-b border-[#E5E5E5] flex justify-between items-center z-10 shrink-0">
                    {hasBack ? (
                        <button
                            onClick={onBack}
                            className="flex items-center px-3 py-2 -ml-2 rounded-md text-[#346DC2] text-sm font-medium hover:bg-[rgba(52,109,194,0.08)] active:bg-[rgba(52,109,194,0.12)] transition-colors"
                        >
                            <MobileDrawerIcons.Back />
                            Back
                        </button>
                    ) : (
                        <h2 className="text-lg font-semibold text-[#464646]">{title}</h2>
                    )}

                    {hasBack && <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#464646]">{title}</h2>}

                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#5F5F5F] hover:bg-[#F7F9FC] transition-colors"
                    >
                        <MobileDrawerIcons.Close />
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto py-2 flex-grow touch-pan-y">
                    {children}
                </div>
            </div>
        </>
    );
};

// --- MAIN COMPONENT ---

type ViewState = 'main' | 'add-to' | 'move-to';

interface MobileOptionsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    schoolName?: string;
}

export const MobileOptionsDrawer: React.FC<MobileOptionsDrawerProps> = ({ isOpen, onClose, schoolName = "" }) => {
    const [currentView, setCurrentView] = useState<ViewState>('main');
    const [selectedMoveTo, setSelectedMoveTo] = useState<string[]>([]);
    const [isCollectionDrawerOpen, setIsCollectionDrawerOpen] = useState(false);

    // Debug logging
    React.useEffect(() => {
        console.log('MobileOptionsDrawer - isOpen:', isOpen, 'currentView:', currentView);
    }, [isOpen, currentView]);

    // Reset to main view when drawer is closed
    React.useEffect(() => {
        if (!isOpen) {
            setCurrentView('main');
        }
    }, [isOpen]);

    const closeAll = () => {
        console.log('MobileOptionsDrawer - closeAll called');
        onClose();
    };

    const openMain = () => setCurrentView('main');

    const toggleMoveToSelection = (value: string) => {
        setSelectedMoveTo(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleAction = (action: string) => {
        console.log(`Action: ${action} for school: ${schoolName}`);
        closeAll();
    };

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <div className="px-5 pt-4 pb-2 text-[13px] font-semibold text-[#5F5F5F] uppercase tracking-[0.5px]">
            {children}
        </div>
    );

    const Separator = () => <div className="h-px bg-[#E5E5E5] my-2" />;

    return (
        <>
            {/* Main Drawer */}
            <Drawer
                isOpen={isOpen && currentView === 'main'}
                onClose={closeAll}
                title="Actions"
            >
                <SectionTitle>Actions</SectionTitle>
                <DrawerItem icon={<MobileDrawerIcons.Compare />} text="Compare" onClick={() => handleAction('compare')} />
                <DrawerItem icon={<MobileDrawerIcons.ViewListing />} text="View Listing" onClick={() => handleAction('view-listing')} />
                <DrawerItem icon={<MobileDrawerIcons.Review />} text="Leave Review" onClick={() => handleAction('leave-review')} />
                <DrawerItem icon={<MobileDrawerIcons.Monitor />} text="Monitor" onClick={() => handleAction('monitor')} />
                <DrawerItem icon={<MobileDrawerIcons.Share />} text="Share" onClick={() => handleAction('share')} />

                <DrawerItem
                    icon={<MobileDrawerIcons.Apply />}
                    text="Apply Now"
                    className="bg-[#EBFCF4] active:bg-[#D7F7E9]"
                    textClassName="text-[#016853]"
                    onClick={() => handleAction('apply-now')}
                />

                <DrawerItem
                    icon={<MobileDrawerIcons.ViewOffers />}
                    text="View Offers"
                    className="bg-[#EBFCF4] active:bg-[#D7F7E9]"
                    textClassName="text-[#016853]"
                    onClick={() => handleAction('view-offers')}
                />

                <DrawerItem icon={<MobileDrawerIcons.VirtualTour />} text="Virtual Tour" onClick={() => handleAction('virtual-tour')} />
                <DrawerItem icon={<MobileDrawerIcons.CopyLink />} text="Copy Link" onClick={() => handleAction('copy-link')} />

                <DrawerItem
                    icon={<MobileDrawerIcons.AddTo />}
                    text="Add To"
                    onClick={() => {
                        onClose(); // Close main options drawer first
                        // Open collection drawer after animation completes
                        setTimeout(() => {
                            setIsCollectionDrawerOpen(true);
                        }, 300); // Wait for drawer close animation
                    }}
                />

                <DrawerItem
                    icon={<MobileDrawerIcons.MoveTo />}
                    text="Move To"
                    hasArrow
                    onClick={() => setCurrentView('move-to')}
                />

                <Separator />

                <SectionTitle>Vendor</SectionTitle>
                <DrawerItem icon={<MobileDrawerIcons.NewAnnouncement />} text="New Announcement" onClick={() => handleAction('new-announcement')} />
                <DrawerItem icon={<MobileDrawerIcons.ViewAnalytics />} text="View Analytics" onClick={() => handleAction('view-analytics')} />
                <DrawerItem icon={<MobileDrawerIcons.ViewReports />} text="View Reports" onClick={() => handleAction('view-reports')} />
            </Drawer>

            {/* Add To Drawer (Nested) */}
            <Drawer
                isOpen={isOpen && currentView === 'add-to'}
                onClose={closeAll}
                title="Add To"
                hasBack
                onBack={openMain}
            >
                <DrawerItem icon={<MobileDrawerIcons.NestedFavorites />} text="My Favorites" onClick={() => handleAction('add-to-favorites')} />
                <DrawerItem icon={<MobileDrawerIcons.NestedWatchlist />} text="Watchlist" onClick={() => handleAction('add-to-watchlist')} />
                <DrawerItem icon={<MobileDrawerIcons.NestedCustomList />} text="Custom List" onClick={() => handleAction('add-to-custom')} />
            </Drawer>

            {/* Move To Drawer (Nested Multi-select) */}
            <Drawer
                isOpen={isOpen && currentView === 'move-to'}
                onClose={closeAll}
                title="Move To"
                hasBack
                onBack={openMain}
            >
                <DrawerMultiSelectItem
                    icon={<MobileDrawerIcons.NestedHome />}
                    text="Home"
                    isSelected={selectedMoveTo.includes('Home')}
                    onClick={() => toggleMoveToSelection('Home')}
                />
                <DrawerMultiSelectItem
                    icon={<MobileDrawerIcons.NestedArchive />}
                    text="Archive"
                    isSelected={selectedMoveTo.includes('Archive')}
                    onClick={() => toggleMoveToSelection('Archive')}
                />
                <DrawerMultiSelectItem
                    icon={<MobileDrawerIcons.NestedScheduled />}
                    text="Scheduled"
                    isSelected={selectedMoveTo.includes('Scheduled')}
                    onClick={() => toggleMoveToSelection('Scheduled')}
                />
            </Drawer>

            {/* Collection Drawer */}
            <MobileCollectionDrawer
                isOpen={isCollectionDrawerOpen}
                onClose={() => setIsCollectionDrawerOpen(false)}
                schoolName={schoolName}
            />
        </>
    );
};
