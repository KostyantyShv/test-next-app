'use client';

import React, { useEffect } from 'react';
import { Portal } from '@/components/ui/Portal';
import { useIsMobile } from '@/hooks/useIsMobile';

// Reference CSS variables from the HTML design (1:1)
const COLORS = {
  background: '#E1E7EE',
  textDefault: '#4A4A4A',
  boldText: '#464646',
  subtleText: '#5F5F5F',
  linkText: '#346DC2',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray500: '#6B7280',
  verificationBlue: '#1D77BD',
  verificationBlueActive: '#1565c0',
  arrowCircle: '#DFDDDB',
  white: '#ffffff',
} as const;

export interface CollectionItem {
  id: number;
  name: string;
  icon: string;
  itemCount: number;
  updatedAgo: string;
  selected: boolean;
}

interface SaveToCollectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  schoolName?: string;
  collections: CollectionItem[];
  filteredCollections: CollectionItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleCollection: (id: number) => void;
  onCreateCollection: () => void;
  onDone: () => void;
  hasSelection: boolean;
}

// Reference SVG paths from the HTML SVG_ICONS (used in CloseIcon, PlusIcon, CheckIconSvg below)

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" style={{ color: COLORS.subtleText }}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 6L6 18M6 6l12 12"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" style={{ color: COLORS.subtleText }}>
      <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function CheckIconSvg() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Save to Collection drawer — 1:1 visual and functional replica of the HTML/CSS/JS reference.
 * Mobile: drawer slides up from bottom with overlay
 * Desktop: centered modal with overlay
 */
export function SaveToCollectionDrawer({
  isOpen,
  onClose,
  schoolName = '',
  collections,
  filteredCollections,
  searchQuery,
  onSearchChange,
  onToggleCollection,
  onCreateCollection,
  onDone,
  hasSelection,
}: SaveToCollectionDrawerProps) {
  const isMobile = useIsMobile();
  
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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // Desktop modal styles
  const desktopModalStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) scale(0.95)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    width: '100%',
    maxWidth: '440px',
    maxHeight: '80vh',
    backgroundColor: COLORS.white,
    borderRadius: '12px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    zIndex: 1001,
    transition: 'transform 0.2s ease, opacity 0.2s ease, visibility 0s linear 0.2s',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  };

  // Mobile drawer styles
  const mobileDrawerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    maxHeight: '85%',
    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
    visibility: isOpen ? 'visible' : 'hidden',
    backgroundColor: COLORS.white,
    borderRadius: '20px 20px 0 0',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.15)',
    zIndex: 1001,
    transition: isOpen ? 'transform 0.3s ease' : 'transform 0.3s ease, visibility 0s linear 0.3s',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    WebkitTapHighlightColor: 'transparent',
  };

  return (
    <>
      <style>{`
        .save-to-collection-drawer-body::-webkit-scrollbar { width: 6px; }
        .save-to-collection-drawer-body::-webkit-scrollbar-track { background: ${COLORS.gray100}; }
        .save-to-collection-drawer-body::-webkit-scrollbar-thumb { background: ${COLORS.gray300}; border-radius: 3px; }
        .save-to-collection-drawer-body::-webkit-scrollbar-thumb:hover { background: ${COLORS.gray500}; }
        .save-to-collection-item:active .save-to-collection-checkbox { opacity: 1; transform: scale(1); }
        .save-to-collection-item:hover .save-to-collection-checkbox { opacity: 1; transform: scale(1); }
      `}</style>
      <Portal containerId="mobile-modal-root">
        {/* Overlay — reference: rgba(0,0,0,0.5), z-index 1000, opacity/visibility transition */}
        <div
          role="presentation"
          aria-hidden
          onClick={onClose}
          className="save-to-collection-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            transition: isOpen ? 'opacity 0.3s ease' : 'opacity 0.3s ease, visibility 0s linear 0.3s',
            pointerEvents: isOpen ? 'auto' : 'none',
          }}
        />

        {/* Modal/Drawer container - desktop: centered modal, mobile: bottom drawer */}
        <div
          className="save-to-collection-drawer"
          style={isMobile ? mobileDrawerStyle : desktopModalStyle}
        >
          {/* .drawer-header — padding 16px 20px, border-bottom gray-200 */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              backgroundColor: COLORS.white,
              padding: '16px 20px',
              borderBottom: `1px solid ${COLORS.gray200}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: COLORS.boldText,
                lineHeight: 1,
              }}
            >
              Save to <span style={{ color: COLORS.linkText }}>Collection</span>
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close collections"
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: COLORS.subtleText,
                borderRadius: '50%',
                transition: 'background-color 0.2s',
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = COLORS.gray100;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '';
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '';
              }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* .search-container — padding 16px 20px, border-bottom gray-200 */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: `1px solid ${COLORS.gray200}`,
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              placeholder="Filter collections"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="save-to-collection-search-input"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${COLORS.gray300}`,
                borderRadius: 8,
                fontSize: 15,
                color: COLORS.textDefault,
                background: COLORS.white,
                transition: 'border-color 0.2s, box-shadow 0.2s',
                outline: 'none',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.verificationBlue;
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29, 119, 189, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.gray300;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* .drawer-body — flex 1, overflow-y auto; .collections-list padding 8px 0 */}
          <div
            className="save-to-collection-drawer-body"
            style={{
              flex: 1,
              overflowY: 'auto',
              position: 'relative',
              minHeight: 0,
            }}
          >
            {filteredCollections.length > 0 ? (
              <div style={{ padding: '8px 0' }}>
                {filteredCollections.map((collection) => (
                  <div
                    key={collection.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onToggleCollection(collection.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onToggleCollection(collection.id);
                      }
                    }}
                    className="save-to-collection-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '14px 20px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      position: 'relative',
                    }}
                    onMouseDown={(e) => {
                      (e.currentTarget as HTMLDivElement).style.backgroundColor = COLORS.gray100;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.backgroundColor = '';
                    }}
                    onMouseUp={(e) => {
                      (e.currentTarget as HTMLDivElement).style.backgroundColor = '';
                    }}
                  >
                    {/* .collection-icon — 44x44, arrow-circle, rounded 10px, mr 14px */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: COLORS.arrowCircle,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        marginRight: 14,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      {collection.icon}
                      {/* .selected-indicator — top -2px right -2px, 18x18, only when selected */}
                      {collection.selected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: -2,
                            right: -2,
                            width: 18,
                            height: 18,
                            background: COLORS.verificationBlue,
                            border: `2px solid ${COLORS.white}`,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CheckIconSvg />
                        </div>
                      )}
                    </div>

                    {/* .collection-details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          color: COLORS.boldText,
                          marginBottom: 3,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {collection.name}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: COLORS.subtleText,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span>
                          {collection.itemCount} {collection.itemCount === 1 ? 'item' : 'items'}
                        </span>
                        <div
                          style={{
                            width: 3,
                            height: 3,
                            background: COLORS.subtleText,
                            borderRadius: '50%',
                            flexShrink: 0,
                          }}
                        />
                        <span>Updated {collection.updatedAgo}</span>
                      </div>
                    </div>

                    {/* .collection-checkbox — absolute top 8px right 8px, 22x22; visible on :active or .selected (see CSS) */}
                    <div
                      className="save-to-collection-checkbox"
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: collection.selected ? COLORS.verificationBlue : COLORS.white,
                        border: `2px solid ${collection.selected ? COLORS.verificationBlue : COLORS.gray300}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: collection.selected ? 1 : 0,
                        transform: collection.selected ? 'scale(1)' : 'scale(0.8)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {collection.selected && <CheckIconSvg />}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: COLORS.subtleText,
                  fontSize: 14,
                }}
              >
                No collections found
              </div>
            )}
          </div>

          {/* .drawer-footer — padding 16px 20px 20px 20px, border-top gray-200 */}
          <div
            style={{
              padding: '16px 20px 20px 20px',
              borderTop: `1px solid ${COLORS.gray200}`,
              backgroundColor: COLORS.white,
              flexShrink: 0,
              position: 'sticky',
              bottom: 0,
            }}
          >
            {/* .create-collection-btn — gap 12px, padding 14px 0, margin-bottom 14px */}
            <button
              type="button"
              onClick={onCreateCollection}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '14px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                borderRadius: 8,
                color: COLORS.textDefault,
                marginBottom: 14,
                fontFamily: 'inherit',
                textAlign: 'left',
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = COLORS.gray100;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '';
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '';
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: COLORS.arrowCircle,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <PlusIcon />
              </div>
              <span style={{ fontSize: 15, fontWeight: 500, color: COLORS.textDefault }}>
                Create a new collection
              </span>
            </button>

            {/* .done-button — padding 12px 24px, font-size 15px, border-radius 8px */}
            <button
              type="button"
              onClick={onDone}
              disabled={!hasSelection}
              style={{
                background: hasSelection ? COLORS.verificationBlue : COLORS.gray300,
                color: COLORS.white,
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: 15,
                fontWeight: 500,
                cursor: hasSelection ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s',
                width: '100%',
                fontFamily: 'inherit',
              }}
              onMouseDown={(e) => {
                if (hasSelection) (e.currentTarget as HTMLButtonElement).style.background = COLORS.verificationBlueActive;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = hasSelection ? COLORS.verificationBlue : COLORS.gray300;
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = hasSelection ? COLORS.verificationBlue : COLORS.gray300;
              }}
            >
              Done
            </button>
          </div>
        </div>
      </Portal>
    </>
  );
}
