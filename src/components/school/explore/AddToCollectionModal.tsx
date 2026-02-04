'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { SaveToCollectionDrawer, CollectionItem } from './SaveToCollectionDrawer';

// --- Types ---
interface AddToCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (selectedCollections: CollectionItem[]) => void;
}

// --- Mock Data ---
const INITIAL_COLLECTIONS: CollectionItem[] = [
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
    const [collections, setCollections] = useState<CollectionItem[]>(INITIAL_COLLECTIONS);
    const [searchQuery, setSearchQuery] = useState('');

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCollections(INITIAL_COLLECTIONS);
            setSearchQuery('');
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
            const newCollection: CollectionItem = {
                id: Date.now(),
                name: name.trim(),
                icon: "📁",
                itemCount: 0,
                updatedAgo: "Just now",
                selected: true,
            };
            setCollections((prev) => [newCollection, ...prev]);
            setSearchQuery('');
        }
    };

    const handleSave = () => {
        const selected = collections.filter((c) => c.selected);
        onSave(selected);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <SaveToCollectionDrawer
            isOpen={isOpen}
            onClose={onClose}
            collections={collections}
            filteredCollections={filteredCollections}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleCollection={handleToggleSelection}
            onCreateCollection={handleCreateCollection}
            onDone={handleSave}
            hasSelection={hasSelection}
        />
    );
};

export default AddToCollectionModal;
