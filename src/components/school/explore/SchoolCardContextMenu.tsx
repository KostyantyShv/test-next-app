'use client';

import React, { useCallback, useLayoutEffect, useState, useRef, useEffect } from 'react';
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

/* Mobile drawer list items — match HTML/photo: 16px 20px padding, 22px icon, 16px font-medium */
interface MobileDrawerItemProps {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    className?: string;
    textClassName?: string;
    iconClassName?: string;
    hasArrow?: boolean;
}

const MobileDrawerMenuItem: React.FC<MobileDrawerItemProps> = ({
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
        className={`flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC] ${className}`}
    >
        <div className={`mr-4 flex items-center justify-center w-[22px] h-[22px] flex-shrink-0 ${iconClassName}`}>
            {icon}
        </div>
        <span className={`text-base font-medium flex-grow leading-[1.4] ${textClassName}`}>
            {text}
        </span>
        {hasArrow && (
            <div className="w-5 h-5 text-[#5F5F5F] flex-shrink-0">
                <ContextMenuIcons.Arrow />
            </div>
        )}
    </div>
);

interface MobileDrawerMultiSelectProps extends Omit<MobileDrawerItemProps, 'hasArrow'> {
    isSelected: boolean;
}

const MobileDrawerMultiSelectItem: React.FC<MobileDrawerMultiSelectProps> = ({ icon, text, isSelected, onClick }) => (
    <div
        onClick={(e) => {
            e.stopPropagation();
            onClick?.();
        }}
        className="flex items-center px-5 py-4 cursor-pointer transition-colors active:bg-[#F7F9FC] group"
    >
        <div className="mr-4 flex items-center justify-center w-[22px] h-[22px] flex-shrink-0 text-[#4A4A4A]">
            {icon}
        </div>
        <span className="text-base font-medium text-[#464646] flex-grow">
            {text}
        </span>
        <div className={`ml-auto w-6 h-6 flex items-center justify-center transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
            {isSelected && (
                <>
                    <div className="group-active:hidden"><ContextMenuIcons.Check /></div>
                    <div className="hidden group-active:block"><ContextMenuIcons.Remove /></div>
                </>
            )}
        </div>
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
    iconClassName?: string;
    iconVariant?: "default" | "list";
    preferredPlacement?: "top" | "bottom";
}

export const SchoolCardContextMenu: React.FC<SchoolCardContextMenuProps> = ({ schoolName = "", buttonClassName, iconClassName, iconVariant = "default", preferredPlacement }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMoveTo, setSelectedMoveTo] = useState<string[]>([]);
    const [menuPlacement, setMenuPlacement] = useState<"top" | "bottom">("bottom");
    const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
    const [isMoveToOpenMobile, setIsMoveToOpenMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const triggeredByPointerDownRef = useRef(false);
    const isMobile = useIsMobile();
    const moveToItemRef = useRef<HTMLDivElement>(null);
    const moveToDropdownRef = useRef<HTMLDivElement>(null);
    const [isMoveToOpenDesktop, setIsMoveToOpenDesktop] = useState(false);
    const [moveToPosition, setMoveToPosition] = useState<{ top: number; left: number; side: "left" | "right"; arrowTop: number } | null>(null);
    const moveToCloseTimerRef = useRef<number | null>(null);
    const placementLockedRef = useRef(false);
    const lockedPlacementRef = useRef<"top" | "bottom">("bottom");
    const rafPosRef = useRef<number | null>(null);
    const lastPosRef = useRef<{ top: number; left: number; arrowLeft: number; placement: "top" | "bottom" } | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        if (isMobile) return;
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
    }, [isOpen, isMobile]);

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const applyMenuStyles = (next: { top: number; left: number; arrowLeft: number; placement: "top" | "bottom" }) => {
        const el = dropdownRef.current;
        if (!el) return;
        // Use transform-only positioning to avoid layout jitter while scrolling.
        const placementTransform = next.placement === "top" ? " translateY(-100%)" : "";
        el.style.transform = `translate3d(${next.left}px, ${next.top}px, 0)${placementTransform}`;
        el.style.setProperty("--menu-arrow-left", `${next.arrowLeft}px`);
    };

    const updateMenuPosition = (force: boolean = false) => {
        const btn = buttonRef.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const menuWidth = 240; // w-60
        const spacing = 8;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const measuredHeight = dropdownRef.current?.getBoundingClientRect().height;
        const menuHeight = measuredHeight && measuredHeight > 0 ? measuredHeight : 320;

        // Decide placement once (prevents jumpy flipping while scrolling).
        // Prefer bottom by default (more predictable). Allow callers (e.g. Classic footer) to prefer opening upward.
        let placement: "top" | "bottom" = placementLockedRef.current ? lockedPlacementRef.current : "bottom";
        if (!placementLockedRef.current) {
            const availableBelow = viewportHeight - (rect.bottom + spacing);
            const availableAbove = rect.top - spacing;
            const fitsBelow = availableBelow >= menuHeight;
            const fitsAbove = availableAbove >= menuHeight;
            if (preferredPlacement) {
                // Honor preferred placement if it has reasonable space; otherwise fall back.
                const pref = preferredPlacement;
                if (pref === "bottom") {
                    placement = fitsBelow ? "bottom" : (fitsAbove ? "top" : (availableBelow >= availableAbove ? "bottom" : "top"));
                } else {
                    placement = fitsAbove ? "top" : (fitsBelow ? "bottom" : (availableBelow >= availableAbove ? "bottom" : "top"));
                }
            } else {
                placement = fitsBelow ? "bottom" : (fitsAbove ? "top" : (availableBelow >= availableAbove ? "bottom" : "top"));
            }
            lockedPlacementRef.current = placement;
            placementLockedRef.current = true;
        }

        // Keep attached to the trigger.
        // For "top" placement we anchor to rect.top and use translateY(-100%) in render,
        // so menu height changes won't cause vertical jumping.
        const top = placement === "bottom" ? rect.bottom + spacing : rect.top - spacing;
        let left = rect.right - menuWidth;

        // Keep within viewport horizontally.
        left = clamp(left, 10, viewportWidth - menuWidth - 10);

        // Arrow should point at the button center. Requested tweaks:
        // - move right by 2px
        const buttonCenterX = rect.left + rect.width / 2;
        const arrowLeft = clamp(buttonCenterX - left + 2, 18, menuWidth - 18);

        const next = {
            placement,
            top,
            left,
            arrowLeft,
        };

        const prev = lastPosRef.current;
        if (
            force ||
            !prev ||
            prev.placement !== next.placement ||
            prev.top !== next.top ||
            prev.left !== next.left ||
            prev.arrowLeft !== next.arrowLeft
        ) {
            lastPosRef.current = next;
            // Only placement needs React state (for arrow orientation).
            if (menuPlacement !== next.placement) setMenuPlacement(next.placement);
            // Imperatively position to avoid re-render jitter on scroll.
            applyMenuStyles(next);
        }
    };

    // When the portal mounts, immediately position it. This prevents a "stuck at 0,0" render
    // in cases where layout effects are delayed/skipped due to portal timing.
    const setDropdownNode = useCallback(
        (node: HTMLDivElement | null) => {
            dropdownRef.current = node;
            if (!node) return;
            if (isMobile || !isOpen) return;
            // Position now that the DOM node exists (menu height can be measured).
            updateMenuPosition(true);
            window.requestAnimationFrame(() => updateMenuPosition(true));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isMobile, isOpen]
    );

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
        // Post-mount correction (ensures portal ref exists + measured layout is settled)
        const raf = window.requestAnimationFrame(() => updateMenuPosition());
        if (isMoveToOpenDesktop) updateMoveToPosition();
        return () => window.cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, isMobile, isMoveToOpenDesktop]);

    // Keep the desktop menu glued to the trigger while open.
    // Placement is locked when opening (prevents flip/jitter). We only update transforms.
    useEffect(() => {
        if (isMobile || !isOpen) return;

        const schedule = () => {
            if (rafPosRef.current) return;
            rafPosRef.current = window.requestAnimationFrame(() => {
                rafPosRef.current = null;
                updateMenuPosition();
                if (isMoveToOpenDesktop) updateMoveToPosition();
            });
        };

        // Initial + post-render measurement correction.
        schedule();

        window.addEventListener("resize", schedule);
        // Capture scroll events from any scroll container, not just window.
        window.addEventListener("scroll", schedule, true);
        return () => {
            if (rafPosRef.current) window.cancelAnimationFrame(rafPosRef.current);
            rafPosRef.current = null;
            window.removeEventListener("resize", schedule);
            window.removeEventListener("scroll", schedule, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, isMobile, isMoveToOpenDesktop]);

    const closeMenu = () => {
        setIsOpen(false);
        setIsMoveToOpenMobile(false);
        setIsMoveToOpenDesktop(false);
        placementLockedRef.current = false;
        lastPosRef.current = null;
    };

    const toggleDropdown = () => {
        if (isMobile) {
            setIsOpen(!isOpen);
            return;
        }
        setIsOpen((v) => {
            const next = !v;
            if (next) {
                placementLockedRef.current = false;
                // Important: if the menu was previously closed by clicking the trigger again,
                // lastPosRef may still be set. Clear it so the first open always applies transform.
                lastPosRef.current = null;
            }
            return next;
        });
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
                    (triggeredByPointerDownRef.current = true);
                    toggleDropdown();
                }}
                onClick={(e) => {
                    // Fallback for environments where pointer events are flaky/disabled.
                    // Prevent double-toggle when both pointerdown and click fire.
                    if (triggeredByPointerDownRef.current) {
                        triggeredByPointerDownRef.current = false;
                        return;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown();
                }}
                className={
                    buttonClassName ||
                    "w-8 h-8 border border-[rgba(0,0,0,0.08)] rounded-lg flex items-center justify-center bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-all duration-200 pointer-events-auto relative z-50 cursor-pointer"
                }
            >
                {iconVariant === "list" ? (
                    <ContextMenuIcons.OptionsList className={iconClassName} />
                ) : (
                    <ContextMenuIcons.Options className={iconClassName} />
                )}
            </button>

            {/* Mobile: render context actions as modal/drawer */}
            {isMobile && (
                <MobileDrawer isOpen={isOpen} onClose={closeMenu}>
                    {/* Header — matches HTML/photo: title Actions #464646, close 32px circle */}
                    <div className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5] px-5 py-4 flex items-center justify-between shrink-0">
                        <h2 className="text-lg font-semibold text-[#464646]">Actions</h2>
                        <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full text-[#5F5F5F] active:bg-[#F7F9FC] transition-colors touch-manipulation"
                            onClick={closeMenu}
                            aria-label="Close"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <div className="py-2 flex-1 min-h-0">
                        {/* List items — 16px 20px padding, 22px icon, 16px font-medium like HTML */}
                        <MobileDrawerMenuItem icon={<ContextMenuIcons.Compare />} text="Compare" onClick={() => handleAction('compare')} />
                        <MobileDrawerMenuItem icon={<ContextMenuIcons.ViewListing />} text="View Listing" onClick={() => handleAction('view-listing')} />
                        <MobileDrawerMenuItem icon={<ContextMenuIcons.Review />} text="Leave Review" onClick={() => handleAction('leave-review')} />
                        <MobileDrawerMenuItem icon={<ContextMenuIcons.Monitor />} text="Monitor" onClick={() => handleAction('monitor')} />
                        <MobileDrawerMenuItem icon={<ContextMenuIcons.Share />} text="Share" onClick={() => handleAction('share')} />

                        <MobileDrawerMenuItem
                            icon={<ContextMenuIcons.Apply />}
                            text="Apply Now"
                            className="bg-[#EBFCF4] active:bg-[#D7F7E9]"
                            textClassName="text-[#016853]"
                            iconClassName="text-[#016853]"
                            onClick={() => handleAction('apply-now')}
                        />
                        <MobileDrawerMenuItem
                            icon={<ContextMenuIcons.ViewOffers />}
                            text="View Offers"
                            className="bg-[#EBFCF4] active:bg-[#D7F7E9]"
                            textClassName="text-[#016853]"
                            iconClassName="text-[#016853]"
                            onClick={() => handleAction('view-offers')}
                        />

                        <MobileDrawerMenuItem icon={<ContextMenuIcons.VirtualTour />} text="Virtual Tour" onClick={() => handleAction('virtual-tour')} />
                        <MobileDrawerMenuItem icon={<ContextMenuIcons.CopyLink />} text="Copy Link" onClick={() => handleAction('copy-link')} />

                        <MobileDrawerMenuItem
                            icon={<ContextMenuIcons.AddTo />}
                            text="Add To"
                            hasArrow
                            onClick={() => {
                                setIsCollectionModalOpen(true);
                                closeMenu();
                            }}
                        />

                        <MobileDrawerMenuItem
                            icon={<ContextMenuIcons.MoveTo />}
                            text="Move To"
                            hasArrow
                            onClick={() => setIsMoveToOpenMobile(v => !v)}
                        />
                        {isMoveToOpenMobile && (
                            <div className="px-2 pb-1">
                                <MobileDrawerMultiSelectItem
                                    icon={<ContextMenuIcons.NestedHome />}
                                    text="Home"
                                    isSelected={selectedMoveTo.includes('Home')}
                                    onClick={() => toggleMoveToSelection('Home')}
                                />
                                <MobileDrawerMultiSelectItem
                                    icon={<ContextMenuIcons.NestedArchive />}
                                    text="Archive"
                                    isSelected={selectedMoveTo.includes('Archive')}
                                    onClick={() => toggleMoveToSelection('Archive')}
                                />
                                <MobileDrawerMultiSelectItem
                                    icon={<ContextMenuIcons.NestedScheduled />}
                                    text="Scheduled"
                                    isSelected={selectedMoveTo.includes('Scheduled')}
                                    onClick={() => toggleMoveToSelection('Scheduled')}
                                />
                            </div>
                        )}

                        <div className="px-5 pt-4 pb-2 text-[13px] font-semibold text-[#5F5F5F] uppercase tracking-[0.5px]">Vendor</div>
                        <MobileDrawerMenuItem icon={<ContextMenuIcons.NewAnnouncement />} text="New Announcement" onClick={() => handleAction('new-announcement')} />
                        <MobileDrawerMenuItem icon={<ContextMenuIcons.ViewAnalytics />} text="View Analytics" onClick={() => handleAction('view-analytics')} />
                        <MobileDrawerMenuItem icon={<ContextMenuIcons.ViewReports />} text="View Reports" onClick={() => handleAction('view-reports')} />
                    </div>
                </MobileDrawer>
            )}

            {/* Desktop: render popover via Portal to avoid parent overflow clipping */}
            {!isMobile && isOpen && typeof window !== 'undefined' && createPortal(
                <div
                    ref={setDropdownNode}
                    className="fixed top-0 left-0 w-60 bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.15)] z-[9999] will-change-transform"
                    style={{
                        // Note: position is updated imperatively (see applyMenuStyles / updateMenuPosition).
                        // Keep a default CSS var so arrow has a valid initial value before first measurement.
                        ["--menu-arrow-left" as any]: `0px`,
                    }}
                >
                    {/* Arrow pointer (single "cone" that always points to the 3-dots) */}
                    {menuPlacement === "bottom" ? (
                        // Menu is below the button → arrow on top pointing UP to button
                        <div
                            className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"
                            style={{
                                left: "var(--menu-arrow-left)",
                                top: "-8px",
                                transform: "translateX(-50%)",
                                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
                            }}
                        />
                    ) : (
                        // Menu is above the button → arrow on bottom pointing DOWN to button
                        <div
                            className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"
                            style={{
                                left: "var(--menu-arrow-left)",
                                bottom: "-8px",
                                transform: "translateX(-50%)",
                                filter: "drop-shadow(0 -2px 6px rgba(0,0,0,0.12))",
                            }}
                        />
                    )}

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
                    {/* Nested arrow: single cone pointing back to the anchor item */}
                    {moveToPosition.side === "right" ? (
                        // Nested menu is to the RIGHT of the anchor → arrow on left pointing LEFT
                        <div
                            className="absolute w-0 h-0 border-t-[8px] border-b-[8px] border-r-[8px] border-t-transparent border-b-transparent border-r-white"
                            style={{
                                top: `${moveToPosition.arrowTop}px`,
                                left: "-8px",
                                filter: "drop-shadow(2px 0 6px rgba(0,0,0,0.10))",
                            }}
                        />
                    ) : (
                        // Nested menu is to the LEFT of the anchor → arrow on right pointing RIGHT
                        <div
                            className="absolute w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent border-l-white"
                            style={{
                                top: `${moveToPosition.arrowTop}px`,
                                right: "-8px",
                                filter: "drop-shadow(-2px 0 6px rgba(0,0,0,0.10))",
                            }}
                        />
                    )}
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
