'use client';

import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ContextMenuIcons } from './ContextMenuIcons';
import { AddToCollectionModal } from './AddToCollectionModal';
import { MobileDrawer } from '@/components/ui/MobileDrawer/MobileDrawer';
import { useIsMobile } from '@/hooks/useIsMobile';

interface MenuItemProps {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    className?: string;
    textClassName?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick, className = "", textClassName = "" }) => (
    <div
        onClick={onClick}
        className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#F7F9FC] transition-colors duration-200 my-0.5 ${className}`}
    >
        <div className="mr-3 flex items-center justify-center w-[18px] h-[18px]">
            {icon}
        </div>
        <span className={`text-sm font-medium text-[#464646] flex-grow leading-[1.4] ${textClassName}`}>
            {text}
        </span>
    </div>
);

const NestedMenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick }) => (
    <div
        onClick={onClick}
        className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#F7F9FC] transition-colors duration-200"
    >
        <div className="mr-3 flex items-center justify-center w-5 h-5 text-[#4A4A4A]">
            {icon}
        </div>
        <span className="text-sm font-medium text-[#464646]">
            {text}
        </span>
    </div>
);

interface MultiSelectProps extends MenuItemProps {
    isSelected: boolean;
}

const NestedMultiSelectItem: React.FC<MultiSelectProps> = ({ icon, text, isSelected, onClick }) => (
    <div
        onClick={(e) => {
            e.stopPropagation();
            onClick?.();
        }}
        className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#F7F9FC] transition-colors duration-200 group/item ${isSelected ? '' : ''}`}
    >
        <div className="mr-3 flex items-center justify-center w-5 h-5 text-[#4A4A4A]">
            {icon}
        </div>
        <span className="text-sm font-medium text-[#464646] flex-grow">
            {text}
        </span>

        {/* Checkmark / Remove Logic */}
        <div className={`ml-auto w-5 h-5 flex items-center justify-center transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-50'}`}>
            {isSelected ? (
                <>
                    <div className="group-hover/item:hidden"><ContextMenuIcons.Check /></div>
                    <div className="hidden group-hover/item:block"><ContextMenuIcons.Remove /></div>
                </>
            ) : (
                <div className="w-4 h-4 rounded-full border border-gray-300"></div>
            )}
        </div>
    </div>
);

interface SchoolCardContextMenuProps {
    schoolName?: string;
    buttonClassName?: string;
}

export const SchoolCardContextMenu: React.FC<SchoolCardContextMenuProps> = ({ schoolName = "", buttonClassName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMoveTo, setSelectedMoveTo] = useState<string[]>([]);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [menuPlacement, setMenuPlacement] = useState<"top" | "bottom">("bottom");
    const [menuArrowLeft, setMenuArrowLeft] = useState<number>(0);
    const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
    const [isMoveToOpenMobile, setIsMoveToOpenMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const isMobile = useIsMobile();
    const moveToItemRef = useRef<HTMLDivElement>(null);
    const moveToDropdownRef = useRef<HTMLDivElement>(null);
    const [isMoveToOpenDesktop, setIsMoveToOpenDesktop] = useState(false);
    const [moveToPosition, setMoveToPosition] = useState<{ top: number; left: number; side: "left" | "right"; arrowTop: number } | null>(null);
    const moveToCloseTimerRef = useRef<number | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: PointerEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        // Close on Escape key
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('pointerdown', handleClickOutside);
            document.addEventListener('keydown', handleEscKey);
            return () => {
                document.removeEventListener('pointerdown', handleClickOutside);
                document.removeEventListener('keydown', handleEscKey);
            };
        }
    }, [isOpen]);

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const updateMenuPosition = () => {
        const btn = buttonRef.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const menuWidth = 240; // w-60
        const spacing = 8;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Prefer real rendered height when available (prevents unnecessary "flip to top").
        const measuredHeight = dropdownRef.current?.getBoundingClientRect().height;
        const menuHeight = measuredHeight && measuredHeight > 0 ? measuredHeight : 400; // fallback

        // Default placement: below, aligned to right edge of button.
        let placement: "top" | "bottom" = "bottom";
        let top = rect.bottom + spacing;
        let left = rect.right - menuWidth;

        // Keep within viewport horizontally.
        left = clamp(left, 10, viewportWidth - menuWidth - 10);

        // If it overflows bottom, flip to top (but only if needed).
        if (top + menuHeight > viewportHeight - 10) {
            placement = "top";
            top = rect.top - spacing - menuHeight;
            top = clamp(top, 10, viewportHeight - menuHeight - 10);
        }

        // Arrow should point at the button center. Requested tweaks:
        // - move right by 2px
        const buttonCenterX = rect.left + rect.width / 2;
        const arrowLeft = clamp(buttonCenterX - left + 2, 18, menuWidth - 18);

        setMenuPlacement(placement);
        setMenuArrowLeft(arrowLeft);
        setMenuPosition({ top, left });
    };

    const updateMoveToPosition = () => {
        const anchor = moveToItemRef.current;
        if (!anchor) return;
        const rect = anchor.getBoundingClientRect();
        const nestedWidth = 240; // w-60
        const spacing = 8;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const measuredHeight = moveToDropdownRef.current?.getBoundingClientRect().height;
        const nestedHeight = measuredHeight && measuredHeight > 0 ? measuredHeight : 180;

        let side: "left" | "right" = "right";
        let left = rect.right + spacing;
        if (left + nestedWidth > viewportWidth - 10) {
            side = "left";
            left = rect.left - spacing - nestedWidth;
        }
        left = clamp(left, 10, viewportWidth - nestedWidth - 10);

        let top = rect.top;
        top = clamp(top, 10, viewportHeight - nestedHeight - 10);

        const anchorCenterY = rect.top + rect.height / 2;
        const arrowTop = clamp(anchorCenterY - top - 8, 12, nestedHeight - 28);

        setMoveToPosition({ top, left, side, arrowTop });
    };

    // Compute correct position before paint (prevents any 0,0 flash / jump).
    useLayoutEffect(() => {
        if (isMobile || !isOpen) return;
        updateMenuPosition();
        if (isMoveToOpenDesktop) updateMoveToPosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, isMobile, isMoveToOpenDesktop]);

    // Keep the desktop menu (and nested menu) attached to the 3-dots while scrolling/resizing.
    useEffect(() => {
        if (isMobile || !isOpen) return;

        const onAnyScrollOrResize = () => {
            updateMenuPosition();
            if (isMoveToOpenDesktop) updateMoveToPosition();
        };

        // Initial + post-render measurement correction.
        onAnyScrollOrResize();
        const raf = window.requestAnimationFrame(onAnyScrollOrResize);

        window.addEventListener("resize", onAnyScrollOrResize);
        // Capture scroll events from any scroll container, not just window.
        window.addEventListener("scroll", onAnyScrollOrResize, true);
        return () => {
            window.cancelAnimationFrame(raf);
            window.removeEventListener("resize", onAnyScrollOrResize);
            window.removeEventListener("scroll", onAnyScrollOrResize, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, isMobile, isMoveToOpenDesktop]);

    const closeMenu = () => {
        setIsOpen(false);
        setIsMoveToOpenMobile(false);
        setIsMoveToOpenDesktop(false);
    };

    const toggleDropdown = () => {
        if (isMobile) {
            setIsOpen(!isOpen);
            return;
        }
        setIsOpen((v) => !v);
    };

    const toggleMoveToSelection = (value: string) => {
        setSelectedMoveTo(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleAction = (action: string) => {
        closeMenu();
    };

    const handleSaveCollections = (selectedCollections: any[]) => {
        console.log(`Added "${schoolName}" to ${selectedCollections.length} collections:`, selectedCollections);
        // Here you would typically make an API call to save the school to the selected collections
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                ref={buttonRef}
                type="button"
                onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown();
                }}
                className={
                    buttonClassName ||
                    "w-8 h-8 border border-[rgba(0,0,0,0.08)] rounded-lg flex items-center justify-center bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-all duration-200 pointer-events-auto relative z-50 cursor-pointer"
                }
            >
                <ContextMenuIcons.Options />
            </button>

            {/* Mobile: render context actions as modal/drawer */}
            {isMobile && (
                <MobileDrawer isOpen={isOpen} onClose={closeMenu}>
                    <div className="sticky top-0 z-50 bg-white border-b border-black/10 px-5 py-4 flex items-center justify-between">
                        <div className="text-[#016853] text-lg font-semibold">Actions</div>
                        <button
                            type="button"
                            className="bg-transparent border-none text-[#5F5F5F] cursor-pointer p-2 rounded-full hover:bg-black/5 transition-colors"
                            onClick={closeMenu}
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6l12 12m-12 0L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-2">
                        <div className="px-3 pt-2 pb-1 text-xs font-semibold text-[#5F5F5F] uppercase tracking-[0.5px]">Actions</div>
                        <MenuItem icon={<ContextMenuIcons.Compare />} text="Compare" onClick={() => handleAction('compare')} />
                        <MenuItem icon={<ContextMenuIcons.ViewListing />} text="View Listing" onClick={() => handleAction('view-listing')} />
                        <MenuItem icon={<ContextMenuIcons.Review />} text="Leave Review" onClick={() => handleAction('leave-review')} />
                        <MenuItem icon={<ContextMenuIcons.Monitor />} text="Monitor" onClick={() => handleAction('monitor')} />
                        <MenuItem icon={<ContextMenuIcons.Share />} text="Share" onClick={() => handleAction('share')} />

                        <MenuItem
                            icon={<ContextMenuIcons.Apply />}
                            text="Apply Now"
                            className="bg-[#EBFCF4] hover:bg-[#D7F7E9] text-[#016853] mt-0.5"
                            textClassName="text-[#016853]"
                            onClick={() => handleAction('apply-now')}
                        />
                        <MenuItem
                            icon={<ContextMenuIcons.ViewOffers />}
                            text="View Offers"
                            className="bg-[#EBFCF4] hover:bg-[#D7F7E9] text-[#016853] mt-0.5"
                            textClassName="text-[#016853]"
                            onClick={() => handleAction('view-offers')}
                        />

                        <MenuItem icon={<ContextMenuIcons.VirtualTour />} text="Virtual Tour" onClick={() => handleAction('virtual-tour')} />
                        <MenuItem icon={<ContextMenuIcons.CopyLink />} text="Copy Link" onClick={() => handleAction('copy-link')} />

                        <MenuItem
                            icon={<ContextMenuIcons.AddTo />}
                            text="Save to collection"
                            onClick={() => {
                                setIsCollectionModalOpen(true);
                                closeMenu();
                            }}
                        />

                        <div className="px-3 pt-3 pb-1 text-xs font-semibold text-[#5F5F5F] uppercase tracking-[0.5px]">Move To</div>
                        <div
                            className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#F7F9FC] transition-colors duration-200"
                            onClick={() => setIsMoveToOpenMobile(v => !v)}
                        >
                            <div className="mr-3 flex items-center justify-center"><ContextMenuIcons.MoveTo /></div>
                            <span className="text-sm font-medium text-[#464646] flex-grow">Choose destinations</span>
                            <div className={`transition-transform duration-200 ${isMoveToOpenMobile ? 'rotate-90' : ''}`}>
                                <ContextMenuIcons.Arrow />
                            </div>
                        </div>
                        {isMoveToOpenMobile && (
                            <div className="px-2 pb-1">
                                <NestedMultiSelectItem
                                    icon={<ContextMenuIcons.NestedHome />}
                                    text="Home"
                                    isSelected={selectedMoveTo.includes('Home')}
                                    onClick={() => toggleMoveToSelection('Home')}
                                />
                                <NestedMultiSelectItem
                                    icon={<ContextMenuIcons.NestedArchive />}
                                    text="Archive"
                                    isSelected={selectedMoveTo.includes('Archive')}
                                    onClick={() => toggleMoveToSelection('Archive')}
                                />
                                <NestedMultiSelectItem
                                    icon={<ContextMenuIcons.NestedScheduled />}
                                    text="Scheduled"
                                    isSelected={selectedMoveTo.includes('Scheduled')}
                                    onClick={() => toggleMoveToSelection('Scheduled')}
                                />
                            </div>
                        )}

                        <div className="px-3 pt-3 pb-1 text-xs font-semibold text-[#5F5F5F] uppercase tracking-[0.5px]">Vendor</div>
                        <MenuItem icon={<ContextMenuIcons.NewAnnouncement />} text="New Announcement" onClick={() => handleAction('new-announcement')} />
                        <MenuItem icon={<ContextMenuIcons.ViewAnalytics />} text="View Analytics" onClick={() => handleAction('view-analytics')} />
                        <MenuItem icon={<ContextMenuIcons.ViewReports />} text="View Reports" onClick={() => handleAction('view-reports')} />
                    </div>
                </MobileDrawer>
            )}

            {/* Desktop: render popover via Portal to avoid parent overflow clipping */}
            {!isMobile && isOpen && typeof window !== 'undefined' && createPortal(
                <div
                    ref={dropdownRef}
                    className="fixed w-60 bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.15)] z-[9999]"
                    style={{
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                    }}
                >
                    {/* Arrow pointer (should point to 3 dots, and flip when menu flips) */}
                    <div
                        className="absolute w-4 h-4 bg-white rotate-45 shadow-[-2px_-2px_4px_rgba(0,0,0,0.05)]"
                        style={{
                            left: `${menuArrowLeft}px`,
                            transform: "translateX(-50%) rotate(45deg)",
                            // Requested: move tip DOWN 5px (was -8px), and align to center (+2px handled above).
                            top: menuPlacement === "bottom" ? "-3px" : undefined,
                            bottom: menuPlacement === "top" ? "-3px" : undefined,
                        }}
                    />

                    {/* Scrollable content container with custom scrollbar */}
                    <div
                        className="max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#CBD5E0 transparent'
                        }}
                    >

                        {/* --- ACTIONS SECTION --- */}
                        <div className="px-3 pt-2 pb-1 text-xs font-semibold text-[#5F5F5F] uppercase tracking-[0.5px]">Actions</div>

                        {/* Regular Items */}
                        <MenuItem icon={<ContextMenuIcons.Compare />} text="Compare" onClick={() => handleAction('compare')} />
                        <MenuItem icon={<ContextMenuIcons.ViewListing />} text="View Listing" onClick={() => handleAction('view-listing')} />
                        <MenuItem icon={<ContextMenuIcons.Review />} text="Leave Review" onClick={() => handleAction('leave-review')} />
                        <MenuItem icon={<ContextMenuIcons.Monitor />} text="Monitor" onClick={() => handleAction('monitor')} />
                        <MenuItem icon={<ContextMenuIcons.Share />} text="Share" onClick={() => handleAction('share')} />

                        {/* Apply Now (Special Style) */}
                        <MenuItem
                            icon={<ContextMenuIcons.Apply />}
                            text="Apply Now"
                            className="bg-[#EBFCF4] hover:bg-[#D7F7E9] text-[#016853] mt-0.5"
                            textClassName="text-[#016853]"
                            onClick={() => handleAction('apply-now')}
                        />

                        {/* View Offers (Special Style) */}
                        <MenuItem
                            icon={<ContextMenuIcons.ViewOffers />}
                            text="View Offers"
                            className="bg-[#EBFCF4] hover:bg-[#D7F7E9] text-[#016853] mt-0.5"
                            textClassName="text-[#016853]"
                            onClick={() => handleAction('view-offers')}
                        />

                        <MenuItem icon={<ContextMenuIcons.VirtualTour />} text="Virtual Tour" onClick={() => handleAction('virtual-tour')} />
                        <MenuItem icon={<ContextMenuIcons.CopyLink />} text="Copy Link" onClick={() => handleAction('copy-link')} />


                        {/* Save to collection - Opens Collection Modal */}
                        <MenuItem
                            icon={<ContextMenuIcons.AddTo />}
                            text="Save to collection"
                            onClick={() => {
                                setIsCollectionModalOpen(true);
                                closeMenu(); // Close context menu
                            }}
                        />

                        {/* Move To (Nested Multi-select) */}
                        <div
                            className="relative"
                            onPointerEnter={() => {
                                if (moveToCloseTimerRef.current) {
                                    window.clearTimeout(moveToCloseTimerRef.current);
                                    moveToCloseTimerRef.current = null;
                                }
                                setIsMoveToOpenDesktop(true);
                                // Ensure we position with fresh DOM rects.
                                window.requestAnimationFrame(updateMoveToPosition);
                            }}
                            onPointerLeave={() => {
                                if (moveToCloseTimerRef.current) window.clearTimeout(moveToCloseTimerRef.current);
                                moveToCloseTimerRef.current = window.setTimeout(() => {
                                    setIsMoveToOpenDesktop(false);
                                }, 80);
                            }}
                        >
                            <div
                                ref={moveToItemRef}
                                className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#F7F9FC] transition-colors duration-200"
                            >
                                <div className="mr-3 flex items-center justify-center"><ContextMenuIcons.MoveTo /></div>
                                <span className="text-sm font-medium text-[#464646] flex-grow">Move To</span>
                                <ContextMenuIcons.Arrow />
                            </div>
                        </div>

                        {/* --- VENDOR SECTION --- */}
                        <div className="px-3 pt-3 pb-1 text-xs font-semibold text-[#5F5F5F] uppercase tracking-[0.5px]">Vendor</div>

                        <MenuItem icon={<ContextMenuIcons.NewAnnouncement />} text="New Announcement" onClick={() => handleAction('new-announcement')} />
                        <MenuItem icon={<ContextMenuIcons.ViewAnalytics />} text="View Analytics" onClick={() => handleAction('view-analytics')} />
                        <MenuItem icon={<ContextMenuIcons.ViewReports />} text="View Reports" onClick={() => handleAction('view-reports')} />

                    </div>
                    {/* End of scrollable content */}
                </div>,
                document.body
            )}

            {/* Desktop nested "Move To" menu: portal + fixed so it isn't clipped by overflow and stays attached */}
            {!isMobile && isOpen && isMoveToOpenDesktop && moveToPosition && typeof window !== 'undefined' && createPortal(
                <div
                    ref={moveToDropdownRef}
                    className="fixed w-60 bg-white rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] p-2 z-[10000]"
                    style={{ top: `${moveToPosition.top}px`, left: `${moveToPosition.left}px` }}
                    onPointerEnter={() => {
                        if (moveToCloseTimerRef.current) {
                            window.clearTimeout(moveToCloseTimerRef.current);
                            moveToCloseTimerRef.current = null;
                        }
                        setIsMoveToOpenDesktop(true);
                    }}
                    onPointerLeave={() => {
                        if (moveToCloseTimerRef.current) window.clearTimeout(moveToCloseTimerRef.current);
                        moveToCloseTimerRef.current = window.setTimeout(() => {
                            setIsMoveToOpenDesktop(false);
                        }, 80);
                    }}
                >
                    <div
                        className="absolute w-4 h-4 bg-white rotate-45 shadow-[-2px_2px_4px_rgba(0,0,0,0.05)]"
                        style={{
                            top: `${moveToPosition.arrowTop}px`,
                            left: moveToPosition.side === "right" ? "-8px" : undefined,
                            right: moveToPosition.side === "left" ? "-8px" : undefined,
                        }}
                    />
                    <NestedMultiSelectItem
                        icon={<ContextMenuIcons.NestedHome />}
                        text="Home"
                        isSelected={selectedMoveTo.includes('Home')}
                        onClick={() => toggleMoveToSelection('Home')}
                    />
                    <NestedMultiSelectItem
                        icon={<ContextMenuIcons.NestedArchive />}
                        text="Archive"
                        isSelected={selectedMoveTo.includes('Archive')}
                        onClick={() => toggleMoveToSelection('Archive')}
                    />
                    <NestedMultiSelectItem
                        icon={<ContextMenuIcons.NestedScheduled />}
                        text="Scheduled"
                        isSelected={selectedMoveTo.includes('Scheduled')}
                        onClick={() => toggleMoveToSelection('Scheduled')}
                    />
                </div>,
                document.body
            )}

            {/* Collection Modal */}
            {isCollectionModalOpen && typeof window !== 'undefined' && createPortal(
                <AddToCollectionModal
                    isOpen={isCollectionModalOpen}
                    onClose={() => setIsCollectionModalOpen(false)}
                    onSave={handleSaveCollections}
                />,
                document.body
            )}
        </>
    );
};

