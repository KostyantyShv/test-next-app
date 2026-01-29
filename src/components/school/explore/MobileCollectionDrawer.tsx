'use client';

import React, { useState, useEffect, useMemo } from 'react';

// --- Types ---
interface Collection {
    id: number;
    name: string;
    icon: string;
    itemCount: number;
    updatedAgo: string;
    selected: boolean;
}

interface MobileCollectionDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    schoolName?: string;
}

// --- Mock Data ---
const INITIAL_COLLECTIONS: Collection[] = [
    { id: 1, name: "Collection XYZ", icon: "😊", itemCount: 1, updatedAgo: "2 hours ago", selected: true },
    { id: 2, name: "Collection ABC", icon: "🧠", itemCount: 63, updatedAgo: "1 day ago", selected: false },
    { id: 3, name: "TASK X", icon: "📋", itemCount: 54, updatedAgo: "2 months ago", selected: false },
    { id: 4, name: "S_HUB_2.0", icon: "🚀", itemCount: 101, updatedAgo: "2 months ago", selected: false },
    { id: 5, name: "NEWS", icon: "📰", itemCount: 100, updatedAgo: "5 months ago", selected: false },
    { id: 6, name: "Research Papers", icon: "📚", itemCount: 25, updatedAgo: "1 week ago", selected: false },
    { id: 7, name: "Design Resources", icon: "🎨", itemCount: 87, updatedAgo: "3 days ago", selected: false },
    { id: 8, name: "Learning Materials", icon: "📖", itemCount: 142, updatedAgo: "6 hours ago", selected: false },
    { id: 9, name: "Project Ideas", icon: "💡", itemCount: 33, updatedAgo: "2 weeks ago", selected: false },
    { id: 10, name: "Code Snippets", icon: "💻", itemCount: 78, updatedAgo: "4 days ago", selected: false },
];

// --- Icons ---
const Icons = {
    Close: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    ),
    Plus: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
            <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" />
        </svg>
    ),
    Check: () => (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
        </svg>
    )
};

export const MobileCollectionDrawer: React.FC<MobileCollectionDrawerProps> = ({ isOpen, onClose, schoolName = "" }) => {
    const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
    const [searchQuery, setSearchQuery] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    // Handle animation logic
    useEffect(() => {
        if (isOpen) {
            setShowDrawer(true);
            setIsClosing(false);
            setCollections(INITIAL_COLLECTIONS);
            setSearchQuery('');
            // Reset scroll on body when open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowDrawer(false);
            onClose();
        }, 300); // Animation duration
    };

    const filteredCollections = useMemo(() => {
        if (!searchQuery.trim()) return collections;
        return collections.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [collections, searchQuery]);

    const handleToggleSelection = (id: number) => {
        setCollections(prev => prev.map(c =>
            c.id === id ? { ...c, selected: !c.selected } : c
        ));
    };

    const handleCreateCollection = () => {
        const name = window.prompt("Enter collection name:");
        if (name && name.trim()) {
            const newCollection: Collection = {
                id: Date.now(),
                name: name.trim(),
                icon: "📁",
                itemCount: 0,
                updatedAgo: "Just now",
                selected: true
            };
            setCollections([newCollection, ...collections]);
            setSearchQuery('');
        }
    };

    const handleSave = () => {
        const selected = collections.filter(c => c.selected);
        console.log(`Added "${schoolName}" to ${selected.length} collections:`, selected);
        handleClose();
    };

    const hasSelection = collections.some(c => c.selected);

    if (!showDrawer) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 ease-in-out ${isClosing || !isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                onClick={handleClose}
            />

            {/* Drawer */}
            <div
                className={`fixed bottom-0 left-0 right-0 w-full h-[85vh] bg-white rounded-t-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.15)] z-[1001] flex flex-col overflow-hidden transition-transform duration-300 ease-out ${isClosing || !isOpen ? 'translate-y-full' : 'translate-y-0'
                    }`}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white px-5 py-4 border-b border-[#E5E7EB] flex justify-between items-center z-10 shrink-0">
                    <h2 className="text-lg font-semibold text-[#464646]">
                        Save to <span className="text-[#346DC2]">Collection</span>
                    </h2>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#5F5F5F] hover:bg-[#F3F4F6] transition-colors active:bg-[#E5E7EB]"
                    >
                        <Icons.Close />
                    </button>
                </div>

                {/* Search */}
                <div className="px-5 py-4 border-b border-[#E5E7EB] shrink-0">
                    <input
                        type="text"
                        placeholder="Filter collections"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg text-[15px] text-[#4A4A4A] placeholder-[#5F5F5F] focus:outline-none focus:border-[#1D77BD] focus:ring-4 focus:ring-[#1D77BD]/10 transition-all"
                    />
                </div>

                {/* List Body */}
                <div className="flex-1 overflow-y-auto min-h-0 py-2">
                    {filteredCollections.length > 0 ? (
                        filteredCollections.map((collection) => (
                            <div
                                key={collection.id}
                                onClick={() => handleToggleSelection(collection.id)}
                                className={`flex items-center px-5 py-3.5 cursor-pointer transition-colors active:bg-[#F3F4F6] group relative ${collection.selected ? '' : ''
                                    }`}
                            >
                                {/* Icon Container */}
                                <div className="w-11 h-11 bg-[#DFDDDB] rounded-[10px] flex items-center justify-center text-xl mr-3.5 shrink-0 relative">
                                    {collection.icon}

                                    {/* Selected Indicator (Small badge on icon) */}
                                    <div
                                        className={`absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#1D77BD] border-2 border-white rounded-full flex items-center justify-center transition-all duration-200 ${collection.selected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                                            }`}
                                    >
                                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5 text-white">
                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-[15px] font-medium text-[#464646] mb-0.5 truncate">
                                        {collection.name}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                                        <span>{collection.itemCount} {collection.itemCount === 1 ? 'item' : 'items'}</span>
                                        <div className="w-[3px] h-[3px] bg-[#5F5F5F] rounded-full shrink-0" />
                                        <span>Updated {collection.updatedAgo}</span>
                                    </div>
                                </div>

                                {/* Right Checkbox */}
                                <div
                                    className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all duration-200 ml-3 shrink-0 ${collection.selected
                                            ? 'bg-[#1D77BD] border-[#1D77BD] opacity-100 scale-100'
                                            : 'bg-white border-[#D1D5DB] opacity-0 scale-75 group-active:opacity-50'
                                        }`}
                                >
                                    <Icons.Check />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center text-sm text-[#5F5F5F]">
                            No collections found
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-5 pb-safe border-t border-[#E5E7EB] bg-white shrink-0 sticky bottom-0">
                    <button
                        onClick={handleCreateCollection}
                        className="w-full flex items-center gap-3 mb-3.5 py-3.5 rounded-lg text-[#4A4A4A] active:bg-[#F3F4F6] transition-colors text-left"
                    >
                        <div className="w-9 h-9 bg-[#DFDDDB] rounded-full flex items-center justify-center shrink-0 text-[#5F5F5F]">
                            <Icons.Plus />
                        </div>
                        <span className="text-[15px] font-medium">Create a new collection</span>
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={!hasSelection}
                        className={`w-full py-3 rounded-lg text-[15px] font-medium text-white transition-colors ${hasSelection
                                ? 'bg-[#1D77BD] active:bg-[#1565c0]'
                                : 'bg-[#D1D5DB] cursor-not-allowed'
                            }`}
                    >
                        Done
                    </button>
                </div>
            </div>
        </>
    );
};

export default MobileCollectionDrawer;
