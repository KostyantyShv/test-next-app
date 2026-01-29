import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ContextMenuIcons } from './ContextMenuIcons';
import { AddToCollectionModal } from './AddToCollectionModal';

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
}

export const SchoolCardContextMenu: React.FC<SchoolCardContextMenuProps> = ({ schoolName = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMoveTo, setSelectedMoveTo] = useState<string[]>([]);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
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
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscKey);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                document.removeEventListener('keydown', handleEscKey);
            };
        }
    }, [isOpen]);

    const toggleDropdown = () => {
        console.log('SchoolCardContextMenu - toggleDropdown called, current isOpen:', isOpen);
        if (!isOpen && buttonRef.current) {
            // Calculate position when opening
            const rect = buttonRef.current.getBoundingClientRect();
            console.log('Button rect:', rect);
            const menuWidth = 240; // 60 * 4 = 240px (w-60)
            const menuMaxHeight = 400; // max-h-[400px]
            const spacing = 8; // spacing between button and menu

            // Calculate initial position (below button, aligned to right edge)
            let top = rect.bottom + spacing;
            let left = rect.right - menuWidth;

            // Check if menu would go off the right edge of viewport
            if (left < 10) {
                left = rect.left; // align to left edge of button instead
            }

            // Check if menu would go off the bottom of viewport
            const viewportHeight = window.innerHeight;
            if (top + menuMaxHeight > viewportHeight - 10) {
                // Position above the button instead
                top = rect.top - menuMaxHeight - spacing;

                // If still not enough space, position at top with spacing
                if (top < 10) {
                    top = 10;
                }
            }

            console.log('Calculated menu position:', { top, left });
            setMenuPosition({ top, left });
        }

        console.log('Setting isOpen to:', !isOpen);
        setIsOpen(!isOpen);
    };

    const toggleMoveToSelection = (value: string) => {
        setSelectedMoveTo(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleAction = (action: string) => {
        console.log(`Action: ${action} for school: ${schoolName}`);
        setIsOpen(false);
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
                onClick={(e) => {
                    e.stopPropagation();
                    console.log('Button clicked!');
                    toggleDropdown();
                }}
                className="w-8 h-8 border border-[rgba(0,0,0,0.08)] rounded-lg flex items-center justify-center bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-all duration-200 pointer-events-auto relative z-50 cursor-pointer"
            >
                <ContextMenuIcons.Options />
            </button>

            {/* Render menu via Portal to avoid parent overflow clipping */}
            {isOpen && typeof window !== 'undefined' && createPortal(
                <div
                    ref={dropdownRef}
                    className="fixed w-60 bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.15)] z-[9999]"
                    style={{
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                    }}
                >
                    {/* Triangle Shape (Top Right) */}
                    <div className="absolute -top-2 right-[14px] w-4 h-4 bg-white rotate-45 shadow-[-2px_-2px_4px_rgba(0,0,0,0.05)]"></div>

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


                        {/* Add To - Opens Collection Modal */}
                        <MenuItem
                            icon={<ContextMenuIcons.AddTo />}
                            text="Add To"
                            onClick={() => {
                                setIsCollectionModalOpen(true);
                                setIsOpen(false); // Close context menu
                            }}
                        />

                        {/* Move To (Nested Multi-select) */}
                        <div className="group relative">
                            <div className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#F7F9FC] transition-colors duration-200">
                                <div className="mr-3 flex items-center justify-center"><ContextMenuIcons.MoveTo /></div>
                                <span className="text-sm font-medium text-[#464646] flex-grow">Move To</span>
                                <ContextMenuIcons.Arrow />
                            </div>

                            {/* Nested Dropdown */}
                            <div className="hidden group-hover:block absolute left-full top-0 ml-2 w-60 bg-white rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] p-2 z-10">
                                <div className="absolute top-[15px] -left-2 w-4 h-4 bg-white rotate-45 shadow-[-2px_2px_4px_rgba(0,0,0,0.05)]"></div>

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

