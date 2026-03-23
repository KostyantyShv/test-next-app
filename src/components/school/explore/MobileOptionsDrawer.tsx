'use client';

import React, { useMemo, useState, useRef } from 'react';
import { MobileDrawerIcons } from './MobileDrawerIcons';
import { MobileDrawer } from '@/components/ui/MobileDrawer/MobileDrawer';
import { SaveToCollectionDrawer } from './SaveToCollectionDrawer';

// --- REUSABLE COMPONENTS ---

interface DrawerItemProps {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    className?: string;
    textClassName?: string;
    iconClassName?: string;
    hasArrow?: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
    icon,
    text,
    onClick,
    className = "",
    textClassName = "text-[#464646]",
    iconClassName = "text-[#4A4A4A]",
    hasArrow = false
}) => (
    <div
        onClick={onClick}
        className={`flex items-center px-5 py-4 cursor-pointer w-max transition-colors active:bg-[#F7F9FC] ${className}`}
    >
        <div className={`mr-4 flex items-center justify-center w-max h-[22px] flex-shrink-0 ${iconClassName}`}>
            {icon}
        </div>
        <span className={`text-base font-medium flex-grow leading-[1.4] ${textClassName}`}>
            {text}
        </span>
        {hasArrow && <div className="w-5 h-5 text-[#5F5F5F] flex-shrink-0"><MobileDrawerIcons.Arrow /></div>}
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

// --- MAIN COMPONENT ---

type ViewState = 'main' | 'collection' | 'move-to';

interface Collection {
    id: number;
    name: string;
    icon: string;
    itemCount: number;
    updatedAgo: string;
    selected: boolean;
}

const INITIAL_COLLECTIONS: Collection[] = [
    { id: 1, name: "Collection XYZ", icon: "😊", itemCount: 1, updatedAgo: "2 hours ago", selected: true },
    { id: 2, name: "Collection ABC", icon: "🧠", itemCount: 63, updatedAgo: "1 day ago", selected: false },
    { id: 3, name: "TASK X", icon: "📋", itemCount: 54, updatedAgo: "2 months ago", selected: false },
    { id: 4, name: "S_HUB_2.0", icon: "🚀", itemCount: 101, updatedAgo: "2 months ago", selected: false },
    { id: 5, name: "NEWS", icon: "📰", itemCount: 100, updatedAgo: "5 months ago", selected: false },
];

interface MobileOptionsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    schoolName?: string;
}

export const MobileOptionsDrawer: React.FC<MobileOptionsDrawerProps> = ({ isOpen, onClose, schoolName = "" }) => {
    const [currentView, setCurrentView] = useState<ViewState>('main');
    const [selectedMoveTo, setSelectedMoveTo] = useState<string[]>([]);
    const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
    const [collectionSearchQuery, setCollectionSearchQuery] = useState('');

    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    React.useEffect(() => {
        if (!isOpen) {
            closeTimeoutRef.current = setTimeout(() => setCurrentView('main'), 320);
            return () => {
                if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
            };
        }
    }, [isOpen]);

    const closeAll = () => {
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

    const handleAction = (_action?: string) => {
        closeAll();
    };

    const filteredCollections = useMemo(() => {
        const q = collectionSearchQuery.trim().toLowerCase();
        if (!q) return collections;
        return collections.filter((c) => c.name.toLowerCase().includes(q));
    }, [collections, collectionSearchQuery]);

    const toggleCollectionSelection = (id: number) => {
        setCollections((prev) =>
            prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
        );
    };

    const hasCollectionSelection = collections.some((c) => c.selected);

    const handleCreateCollection = () => {
        const name = window.prompt("Enter collection name:");
        if (!name || !name.trim()) return;
        const newCollection: Collection = {
            id: Date.now(),
            name: name.trim(),
            icon: "📁",
            itemCount: 0,
            updatedAgo: "Just now",
            selected: true,
        };
        setCollections((prev) => [newCollection, ...prev]);
        setCollectionSearchQuery('');
    };

    const handleSaveToCollections = () => {
        const selected = collections.filter((c) => c.selected);
        console.log(`Added "${schoolName}" to ${selected.length} collections:`, selected);
        closeAll();
    };

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <div className="px-5 pt-4 pb-2 text-[13px] font-semibold text-[#5F5F5F] uppercase tracking-[0.5px]">
            {children}
        </div>
    );

    const Separator = () => <div className="h-px bg-[#E5E5E5] my-2" />;

    if (!isOpen) return null;

    const mainDrawerOpen = currentView !== 'collection';
    const drawerTitle = currentView === 'move-to' ? 'Move To' : 'Actions';

    return (
        <>
            <MobileDrawer
                isOpen={mainDrawerOpen}
                onClose={closeAll}
                title={drawerTitle}
                showPullIndicator={false}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5] px-5 py-4 flex justify-between items-center shrink-0">
                    {currentView === 'move-to' ? (
                        <button
                            onClick={openMain}
                            className="flex items-center px-3 py-2 -ml-2 rounded-md text-[#346DC2] text-sm font-medium hover:bg-[rgba(52,109,194,0.08)] active:bg-[rgba(52,109,194,0.12)] transition-colors"
                        >
                            <MobileDrawerIcons.Back />
                            Back
                        </button>
                    ) : (
                        <h2 className="text-lg font-semibold text-[#464646]">Actions</h2>
                    )}

                    {currentView === 'move-to' && (
                        <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#464646]">Move To</h2>
                    )}

                    <button
                        onClick={closeAll}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#5F5F5F] active:bg-[#F7F9FC] transition-colors touch-manipulation"
                        aria-label="Close"
                    >
                        <MobileDrawerIcons.Close />
                    </button>
                </div>

                {/* Main Actions View */}
                {currentView === 'main' && (
                    <div className="py-2">
                        <DrawerItem icon={<MobileDrawerIcons.Compare />} text="Compare" onClick={() => handleAction('compare')} />
                        <DrawerItem icon={<MobileDrawerIcons.ViewListing />} text="View Listing" onClick={() => handleAction('view-listing')} />
                        <DrawerItem icon={<MobileDrawerIcons.Review />} text="Leave Review" onClick={() => handleAction('leave-review')} />
                        <DrawerItem icon={<MobileDrawerIcons.Monitor />} text="Monitor" onClick={() => handleAction('monitor')} />
                        <DrawerItem icon={<MobileDrawerIcons.Share />} text="Share" onClick={() => handleAction('share')} />

                        <DrawerItem
                            icon={<MobileDrawerIcons.Apply />}
                            text="Apply Now"
                            className="bg-[#EBFCF4] active:bg-[#D7F7E9] !w-full"
                            textClassName="text-[#016853]"
                            iconClassName="text-[#016853]"
                            onClick={() => handleAction('apply-now')}
                        />

                        <DrawerItem
                            icon={<MobileDrawerIcons.ViewOffers />}
                            text="View Offers"
                            className="bg-[#EBFCF4] active:bg-[#D7F7E9] !w-full"
                            textClassName="text-[#016853]"
                            iconClassName="text-[#016853]"
                            onClick={() => handleAction('view-offers')}
                        />

                        <DrawerItem icon={<MobileDrawerIcons.VirtualTour />} text="Virtual Tour" onClick={() => handleAction('virtual-tour')} />
                        <DrawerItem icon={<MobileDrawerIcons.CopyLink />} text="Copy Link" onClick={() => handleAction('copy-link')} />

                        <DrawerItem
                            icon={<MobileDrawerIcons.AddTo />}
                            text="Add To"
                            hasArrow
                            onClick={() => setCurrentView('collection')}
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
                    </div>
                )}

                {/* Move To View */}
                {currentView === 'move-to' && (
                    <div className="py-2">
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
                    </div>
                )}
            </MobileDrawer>

            {/* Save to Collection — renders its own MobileDrawer */}
            {currentView === 'collection' && (
                <SaveToCollectionDrawer
                    isOpen={isOpen}
                    onClose={closeAll}
                    schoolName={schoolName}
                    filteredCollections={filteredCollections}
                    searchQuery={collectionSearchQuery}
                    onSearchChange={setCollectionSearchQuery}
                    onToggleCollection={toggleCollectionSelection}
                    onCreateCollection={handleCreateCollection}
                    onDone={handleSaveToCollections}
                    hasSelection={hasCollectionSelection}
                />
            )}
        </>
    );
};
