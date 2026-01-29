'use client';

import React, { useMemo, useState } from 'react';
import { MobileDrawerIcons } from './MobileDrawerIcons';
import { Portal } from '@/components/ui/Portal';

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

    // Reset to main view when drawer is closed
    React.useEffect(() => {
        if (!isOpen) {
            setCurrentView('main');
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

    const handleAction = (action: string) => {
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
        // Placeholder behavior (until wired to API)
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

    return (
        <Portal containerId="mobile-modal-root">
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
                        text="Save to collection"
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
                </Drawer>

                {/* Save to collection (full-screen within same drawer) */}
                <Drawer
                    isOpen={isOpen && currentView === 'collection'}
                    onClose={closeAll}
                    title="Save to collection"
                    hasBack
                    onBack={openMain}
                >
                    <div className="px-5 pt-3 pb-2">
                        <input
                            type="text"
                            placeholder="Filter collections"
                            value={collectionSearchQuery}
                            onChange={(e) => setCollectionSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg text-[15px] text-[#4A4A4A] placeholder-[#5F5F5F] focus:outline-none focus:border-[#1D77BD] focus:ring-4 focus:ring-[#1D77BD]/10 transition-all"
                        />
                    </div>

                    <div className="px-1">
                        {filteredCollections.length > 0 ? (
                            filteredCollections.map((collection) => (
                                <div
                                    key={collection.id}
                                    onClick={() => toggleCollectionSelection(collection.id)}
                                    className="flex items-center px-5 py-3.5 cursor-pointer transition-colors active:bg-[#F7F9FC] group"
                                >
                                    <div className="w-11 h-11 bg-[#DFDDDB] rounded-[10px] flex items-center justify-center text-xl mr-3.5 shrink-0 relative">
                                        {collection.icon}
                                        {collection.selected && (
                                            <div className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#1D77BD] border-2 border-white rounded-full flex items-center justify-center">
                                                <svg viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5 text-white">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="text-[15px] font-medium text-[#464646] mb-0.5 truncate">
                                            {collection.name}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                                            <span>
                                                {collection.itemCount} {collection.itemCount === 1 ? 'item' : 'items'}
                                            </span>
                                            <div className="w-[3px] h-[3px] bg-[#5F5F5F] rounded-full shrink-0" />
                                            <span>Updated {collection.updatedAgo}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-10 text-center text-sm text-[#5F5F5F]">
                                No collections found
                            </div>
                        )}
                    </div>

                    <div className="px-5 pt-2 pb-3">
                        <button
                            type="button"
                            onClick={handleCreateCollection}
                            className="w-full flex items-center gap-3 mb-3.5 py-3.5 rounded-lg text-[#4A4A4A] active:bg-[#F7F9FC] transition-colors text-left"
                        >
                            <div className="w-9 h-9 bg-[#DFDDDB] rounded-full flex items-center justify-center shrink-0 text-[#5F5F5F]">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                                    <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" />
                                </svg>
                            </div>
                            <span className="text-[15px] font-medium">Create a new collection</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleSaveToCollections}
                            disabled={!hasCollectionSelection}
                            className={`w-full py-3 rounded-lg text-[15px] font-medium text-white transition-colors ${hasCollectionSelection
                                ? 'bg-[#1D77BD] active:bg-[#1565c0]'
                                : 'bg-[#D1D5DB] cursor-not-allowed'
                                }`}
                        >
                            Done
                        </button>
                    </div>
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
            </>
        </Portal>
    );
};
