'use client';

import React, { useState, useMemo, useEffect } from 'react';

// --- Types ---
interface Collection {
    id: number;
    name: string;
    icon: string;
    itemCount: number;
    updatedAgo: string;
    selected: boolean;
}

interface AddToCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (selectedCollections: Collection[]) => void;
}

// --- Icons Component ---
const Icons = {
    Close: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    Check: () => (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
        </svg>
    ),
    Plus: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-4 h-4 text-[#5F5F5F]">
            <path fill="currentColor" d="M9 4H7V7H4V9H7V12H9V9H12V7H9V4Z" clipRule="evenodd" fillRule="evenodd"></path>
        </svg>
    )
};

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
];

export const AddToCollectionModal: React.FC<AddToCollectionModalProps> = ({ isOpen, onClose, onSave }) => {
    const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
    const [searchQuery, setSearchQuery] = useState('');
    const [isClosing, setIsClosing] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCollections(INITIAL_COLLECTIONS);
            setSearchQuery('');
            setIsClosing(false);
        }
    }, [isOpen]);

    // Filter collections based on search
    const filteredCollections = useMemo(() => {
        if (!searchQuery.trim()) return collections;
        return collections.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [collections, searchQuery]);

    // Check if any item is selected for the "Done" button state
    const hasSelection = useMemo(() => collections.some(c => c.selected), [collections]);

    const handleToggleSelection = (id: number) => {
        setCollections(prev => prev.map(c =>
            c.id === id ? { ...c, selected: !c.selected } : c
        ));
    };

    const handleCreateCollection = () => {
        const name = window.prompt("Enter collection name:");
        if (name && name.trim()) {
            const newCollection: Collection = {
                id: Date.now(), // simple unique id
                name: name.trim(),
                icon: "📁",
                itemCount: 0,
                updatedAgo: "Just now",
                selected: true
            };
            // Add new collection to top
            setCollections([newCollection, ...collections]);
            setSearchQuery(''); // Clear search to show the new item
        }
    };

    const handleSave = () => {
        const selected = collections.filter(c => c.selected);
        onSave(selected);
        handleClose();
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 200); // Wait for animation
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-5">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleClose}
            />

            {/* Modal Card */}
            <div
                className={`relative w-full max-w-[360px] bg-white rounded-xl shadow-2xl flex flex-col max-h-[80vh] transform transition-all duration-300 ease-out ${isClosing ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
                    }`}
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-[#f0f0f0] shrink-0 relative">
                    <h2 className="text-base font-semibold text-[#4A4A4A]">
                        Save to <span className="text-[#346DC2]">Collection</span>
                    </h2>
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 p-1 rounded hover:bg-gray-100 text-[#5F5F5F] hover:text-[#4A4A4A] transition-colors"
                    >
                        <Icons.Close />
                    </button>
                </div>

                {/* Search */}
                <div className="px-5 py-4 border-b border-[#f0f0f0] shrink-0">
                    <input
                        type="text"
                        placeholder="Filter collections"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-[#e0e0e0] rounded-md text-sm text-[#4A4A4A] placeholder-gray-400 focus:outline-none focus:border-[#1D77BD] focus:ring-4 focus:ring-[#1D77BD]/10 transition-all"
                    />
                </div>

                {/* Body (List) */}
                <div className="flex-1 overflow-y-auto min-h-0 py-2">
                    {filteredCollections.length > 0 ? (
                        filteredCollections.map((collection) => (
                            <div
                                key={collection.id}
                                onClick={() => handleToggleSelection(collection.id)}
                                className={`group relative flex items-center px-5 py-3 cursor-pointer transition-colors hover:bg-[#f8f9fa] ${collection.selected ? 'bg-[#f8f9fa]' : ''}`}
                            >
                                {/* Icon Box */}
                                <div className="w-10 h-10 bg-[#f0f0f0] rounded-lg flex items-center justify-center text-lg mr-3 shrink-0 relative">
                                    {collection.icon}
                                    {/* Selected Indicator Badge (Checkmark overlay on icon) */}
                                    <div className={`absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#1D77BD] border-2 border-white rounded-full flex items-center justify-center transition-all duration-200 ${collection.selected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5 text-white">
                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Text Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-[#464646] mb-0.5 truncate">
                                        {collection.name}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-[#5F5F5F]">
                                        <span>{collection.itemCount} {collection.itemCount === 1 ? 'item' : 'items'}</span>
                                        <div className="w-0.5 h-0.5 bg-[#5F5F5F] rounded-full shrink-0" />
                                        <span>Updated {collection.updatedAgo}</span>
                                    </div>
                                </div>

                                {/* Right Checkbox (Only visible on hover or selected) */}
                                <div
                                    className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 
                    ${collection.selected
                                            ? 'bg-[#1D77BD] border-[#1D77BD] opacity-100 scale-100'
                                            : 'bg-white border-[#e0e0e0] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
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
                <div className="p-5 border-t border-[#f0f0f0] shrink-0">
                    <button
                        onClick={handleCreateCollection}
                        className="w-full flex items-center gap-3 py-3 rounded-lg text-[#4A4A4A] hover:bg-[#f8f9fa] transition-colors text-left"
                    >
                        <div className="w-8 h-8 bg-[#DFDDDB] rounded-full flex items-center justify-center shrink-0">
                            <Icons.Plus />
                        </div>
                        <span className="text-sm font-medium">Create a new collection</span>
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={!hasSelection}
                        className={`w-full mt-3 py-2.5 rounded-md text-sm font-medium text-white transition-colors ml-auto block ${hasSelection
                                ? 'bg-[#1D77BD] hover:bg-[#1565c0] cursor-pointer'
                                : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        style={{ width: 'fit-content', paddingLeft: '24px', paddingRight: '24px' }}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToCollectionModal;
