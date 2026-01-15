'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMonitors, type Monitor, type MonitorDetail } from '@/hooks/useMonitors.hook';
import { mockStats, mockPageHistoryData, mockItemHistoryData, mockFieldHistoryData } from '@/mocks/monitors';
import NewMonitorModal from './NewMonitorModal';
import FieldHistoryModal from './FieldHistoryModal';
import PageHistoryModal from './PageHistoryModal';
import useWindowWidth from '@/hooks/useWindowWidth';


// Dropdown Portal Component
function DropdownPortal({ children, isOpen, buttonRef }: { 
  children: React.ReactNode; 
  isOpen: boolean; 
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}) {
  if (!isOpen || typeof window === 'undefined') return null;

  const buttonRect = buttonRef.current?.getBoundingClientRect();
  if (!buttonRect) return null;

  const style = {
    position: 'fixed' as const,
    top: buttonRect.bottom + 12,
    left: buttonRect.left + (buttonRect.width / 2) - 100, // Center the 200px tooltip
    zIndex: 1000,
  };

  return createPortal(
    <div 
      style={{
        ...style,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
      }} 
      className="bg-white rounded-[10px] w-[200px] p-1.5 relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Triangle */}
      <div 
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-45 w-3 h-3"
        style={{
          backgroundColor: 'white',
          boxShadow: '-2px -2px 4px rgba(0, 0, 0, 0.06)',
          zIndex: -1
        }}
      />
      {children}
    </div>,
    document.body
  );
}

// Tooltip Portal Component
function TooltipPortal({ 
  children, 
  isOpen, 
  targetRef,
  position = 'top',
  offset = 10
}: { 
  children: React.ReactNode; 
  isOpen: boolean; 
  targetRef: React.RefObject<HTMLElement | null>;
  position?: 'top' | 'bottom';
  offset?: number;
}) {
  if (!isOpen || typeof window === 'undefined') return null;

  const targetRect = targetRef.current?.getBoundingClientRect();
  if (!targetRect) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    left: targetRect.left + (targetRect.width / 2),
    transform: 'translateX(-50%)',
    zIndex: 1000,
  };

  if (position === 'top') {
    style.bottom = window.innerHeight - targetRect.top + offset;
  } else {
    style.top = targetRect.bottom + offset;
  }

  return createPortal(
    <div style={style} className="pointer-events-none">
      {children}
    </div>,
    document.body
  );
}

export default function Monitors() {
  const { monitors, loading, error, toggleMonitorStatus, deleteMonitor } = useMonitors();
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  const [selectedMonitors, setSelectedMonitors] = useState<Set<string>>(new Set());
  const [expandedMonitor, setExpandedMonitor] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [buttonRefs, setButtonRefs] = useState<Record<string, React.RefObject<HTMLButtonElement | null>>>({});
  const [isNewMonitorModalOpen, setIsNewMonitorModalOpen] = useState(false);
  const [showFieldsTooltip, setShowFieldsTooltip] = useState<string | null>(null);
  const [hoveredLastCheck, setHoveredLastCheck] = useState<string | null>(null);
  const [lastCheckRefs, setLastCheckRefs] = useState<Record<string, React.RefObject<HTMLDivElement | null>>>({});
  const [fieldsRefs, setFieldsRefs] = useState<Record<string, React.RefObject<HTMLDivElement | null>>>({});
  
  // Mobile-specific state
  const [mobileExpandedCards, setMobileExpandedCards] = useState<Set<string>>(new Set());
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const [mobileFilterDrawerOpen, setMobileFilterDrawerOpen] = useState(false);
  const [mobileHistoryDrawerOpen, setMobileHistoryDrawerOpen] = useState(false);
  const [mobileHistoryType, setMobileHistoryType] = useState<'page' | 'item' | 'field' | null>(null);
  const [mobileHistoryData, setMobileHistoryData] = useState<{ monitorId: string; fieldName?: string } | null>(null);
  const [filterCount, setFilterCount] = useState(0);
  const [mobileSortBy, setMobileSortBy] = useState('lastModified');
  const [mobileStatusFilter, setMobileStatusFilter] = useState('all');
  const [mobileCountryFilter, setMobileCountryFilter] = useState('all');
  const [fieldHistoryModalOpen, setFieldHistoryModalOpen] = useState(false);
  const [selectedFieldHistory, setSelectedFieldHistory] = useState<{ monitorId: string; fieldName: string } | null>(null);
  
  // Mobile history drawer filters
  const [mobileHistorySearch, setMobileHistorySearch] = useState('');
  const [mobileHistoryDateFilter, setMobileHistoryDateFilter] = useState('All Time');
  const [mobileHistoryAlertsOnly, setMobileHistoryAlertsOnly] = useState(false);
  const [mobileHistoryShowDateDropdown, setMobileHistoryShowDateDropdown] = useState(false);

  const toggleSelectAll = () => {
    if (selectedMonitors.size === monitors.length) {
      setSelectedMonitors(new Set());
    } else {
      setSelectedMonitors(new Set(monitors.map((m) => m.id)));
    }
  };

  const toggleSelectMonitor = (id: string) => {
    const newSelected = new Set(selectedMonitors);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedMonitors(newSelected);
  };

  const toggleExpand = (id: string) => {
    setExpandedMonitor(expandedMonitor === id ? null : id);
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleMonitorStatus(id);
    } catch (err) {
      console.error('Failed to toggle monitor status:', err);
    }
  };

  const handleDeleteMonitor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this monitor?')) return;
    try {
      await deleteMonitor(id);
      setSelectedMonitors((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (err) {
      console.error('Failed to delete monitor:', err);
    }
  };

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const getButtonRef = (dropdownId: string) => {
    if (!buttonRefs[dropdownId]) {
      buttonRefs[dropdownId] = { current: null as HTMLButtonElement | null };
      setButtonRefs({ ...buttonRefs, [dropdownId]: buttonRefs[dropdownId] });
    }
    return buttonRefs[dropdownId];
  };

  const getLastCheckRef = (monitorId: string) => {
    if (!lastCheckRefs[monitorId]) {
      lastCheckRefs[monitorId] = { current: null as HTMLDivElement | null };
      setLastCheckRefs({ ...lastCheckRefs, [monitorId]: lastCheckRefs[monitorId] });
    }
    return lastCheckRefs[monitorId];
  };

  const getFieldsRef = (monitorId: string) => {
    if (!fieldsRefs[monitorId]) {
      fieldsRefs[monitorId] = { current: null as HTMLDivElement | null };
      setFieldsRefs({ ...fieldsRefs, [monitorId]: fieldsRefs[monitorId] });
    }
    return fieldsRefs[monitorId];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 2) + '..';
  };

  const getVisibleFields = (fields: string[]) => {
    // Calculate visible fields based on container width (130px) and badge widths
    const containerWidth = 130;
    const countBadgeWidth = 35;
    const gapWidth = 6;
    const availableWidth = containerWidth - countBadgeWidth - gapWidth;
    
    const visible: string[] = [];
    let currentWidth = 0;
    
    for (const field of fields) {
      // Estimate badge width: text length * 8 + padding (20px)
      const badgeWidth = field.length * 8 + 20;
      const neededWidth = currentWidth > 0 ? badgeWidth + gapWidth : badgeWidth;
      
      if (currentWidth + neededWidth <= availableWidth) {
        visible.push(field);
        currentWidth += neededWidth;
      } else {
        break;
      }
    }
    
    const hidden = fields.length - visible.length;
    return { visible, hidden };
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Mobile-specific functions
  const toggleMobileCard = (id: string) => {
    const newExpanded = new Set(mobileExpandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setMobileExpandedCards(newExpanded);
  };

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    if (!isMobile) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileOpenDropdown) {
        setMobileOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileOpenDropdown, isMobile]);

  const openMobileHistory = (type: 'page' | 'item' | 'field', monitorId: string, fieldName?: string) => {
    if (type === 'field' && fieldName) {
      // Open field history modal instead of drawer
      setSelectedFieldHistory({ monitorId, fieldName });
      setFieldHistoryModalOpen(true);
    } else {
      setMobileHistoryType(type);
      setMobileHistoryData({ monitorId, fieldName });
      setMobileHistoryDrawerOpen(true);
    }
  };

  const closeMobileHistory = () => {
    setMobileHistoryDrawerOpen(false);
    setMobileHistoryType(null);
    setMobileHistoryData(null);
    setMobileHistorySearch('');
    setMobileHistoryDateFilter('All Time');
    setMobileHistoryAlertsOnly(false);
    setMobileHistoryShowDateDropdown(false);
  };

  // Get history data based on type
  const getMobileHistoryData = () => {
    if (!mobileHistoryData) return null;
    
    if (mobileHistoryType === 'page') {
      return mockPageHistoryData[mobileHistoryData.monitorId] || null;
    } else if (mobileHistoryType === 'item') {
      return mockItemHistoryData[mobileHistoryData.monitorId] || null;
    } else if (mobileHistoryType === 'field' && mobileHistoryData.fieldName) {
      return mockFieldHistoryData[mobileHistoryData.monitorId]?.[mobileHistoryData.fieldName] || null;
    }
    return null;
  };

  // Filter history changes
  const getFilteredHistoryChanges = () => {
    const historyData = getMobileHistoryData();
    if (!historyData) return [];
    
    let filtered = historyData.changes;
    
    // Search filter
    if (mobileHistorySearch) {
      const query = mobileHistorySearch.toLowerCase();
      filtered = filtered.filter((change: { id: string; date: string; field?: string; prev: string; new: string; mag: string; alert: boolean }) => 
        change.id.toLowerCase().includes(query) ||
        change.prev.toLowerCase().includes(query) ||
        change.new.toLowerCase().includes(query) ||
        (change.field && change.field.toLowerCase().includes(query))
      );
    }
    
    // Alerts only filter
    if (mobileHistoryAlertsOnly) {
      filtered = filtered.filter((change: { id: string; date: string; field?: string; prev: string; new: string; mag: string; alert: boolean }) => change.alert);
    }
    
    return filtered;
  };

  const toggleMobileDropdown = (id: string) => {
    setMobileOpenDropdown(mobileOpenDropdown === id ? null : id);
  };

  // Render mobile version (only after mount to avoid hydration mismatch)
  if (!isMounted) {
    // Render desktop version on server to avoid hydration mismatch
    return null; // or return a loading state
  }

  if (isMobile) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
        <div className="p-4">
          {/* Mobile Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--bold-text)' }}>Monitors</h1>
            <button 
              onClick={() => setIsNewMonitorModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                borderColor: 'var(--header-green)',
                backgroundColor: 'var(--apply-button-bg)',
                color: 'var(--header-green)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--apply-button-hover)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--apply-button-bg)';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 4H7V7H4V9H7V12H9V9H12V7H9V4Z" />
              </svg>
              New
            </button>
          </div>

          {/* Mobile Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="rounded-xl p-4 shadow-sm flex items-center gap-3" style={{ backgroundColor: 'var(--surface-color)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5" style={{ color: 'var(--header-green)' }}>
                  <path d="M12 2C6.579 2 2 6.58 2 12s4.579 10 10 10 10-4.58 10-10S17.421 2 12 2zm0 18c-4.337 0-8-3.664-8-8 0-3.998 3.115-7.417 7-7.927V6.09C8.167 6.569 6 9.033 6 12c0 3.309 2.691 6 6 6 1.595 0 3.1-.626 4.237-1.763l-1.414-1.415A3.97 3.97 0 0 1 12 16c-2.206 0-4-1.794-4-4 0-1.858 1.279-3.411 3-3.858v2.146c-.59.353-1 .993-1 1.712 0 1.081.919 2 2 2s2-.919 2-2c0-.719-.41-1.359-1-1.712V4.073c3.885.51 7 3.929 7 7.927 0 4.336-3.663 8-8 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-medium mb-0.5" style={{ color: 'var(--subtle-text)' }}>Total</h3>
                <div className="text-lg font-semibold" style={{ color: 'var(--bold-text)' }}>{formatNumber(mockStats.total)}</div>
              </div>
            </div>

            <div className="rounded-xl p-4 shadow-sm flex items-center gap-3" style={{ backgroundColor: 'var(--surface-color)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ color: 'var(--header-green)' }}>
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-medium mb-0.5" style={{ color: 'var(--subtle-text)' }}>Active</h3>
                <div className="text-lg font-semibold" style={{ color: 'var(--bold-text)' }}>{formatNumber(mockStats.active)}</div>
              </div>
            </div>

            <div className="rounded-xl p-4 shadow-sm flex items-center gap-3" style={{ backgroundColor: 'var(--surface-color)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ color: 'var(--header-green)' }}>
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-medium mb-0.5" style={{ color: 'var(--subtle-text)' }}>Unread</h3>
                <div className="text-lg font-semibold" style={{ color: 'var(--bold-text)' }}>{formatNumber(mockStats.unreadChanges)}</div>
              </div>
            </div>

            <div className="rounded-xl p-4 shadow-sm flex items-center gap-3" style={{ backgroundColor: 'var(--surface-color)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ color: 'var(--header-green)' }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-medium mb-0.5" style={{ color: 'var(--subtle-text)' }}>Issues</h3>
                <div className="text-lg font-semibold" style={{ color: 'var(--bold-text)' }}>{formatNumber(mockStats.issues)}</div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Bar */}
          <div className="flex gap-2 items-center mb-4">
            <div className="relative flex-grow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search monitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-default)',
                  backgroundColor: 'var(--surface-color)',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              />
            </div>
            <button
              onClick={() => setMobileFilterDrawerOpen(true)}
              className="p-2.5 rounded-lg relative flex items-center justify-center"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--surface-color)',
                borderWidth: '1px',
                borderStyle: 'solid',
                color: 'var(--text-default)'
              }}
            >
              <svg viewBox="0 0 512 512" className="w-4.5 h-4.5" fill="currentColor">
                <path d="M41.2 64C18.5 64 0 82.5 0 105.2c0 10.4 3.9 20.4 11 28.1l93 100.1 0 126c0 13.4 6.7 26 18 33.4l75.5 49.8c5.3 3.5 11.6 5.4 18 5.4c18 0 32.6-14.6 32.6-32.6l0-182 93-100.1c7.1-7.6 11-17.6 11-28.1C352 82.5 333.5 64 310.8 64L41.2 64zM145.6 207.7L56.8 112l238.5 0-88.8 95.7c-4.1 4.4-6.4 10.3-6.4 16.3l0 162.8-48-31.7L152 224c0-6.1-2.3-11.9-6.4-16.3zM344 392c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0zM320 256c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0c-13.3 0-24 10.7-24 24zM408 72c-13.3 0-24 10.7-24 24s10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0z" />
              </svg>
              {filterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white border-2" style={{ backgroundColor: 'var(--grade-badge)', borderColor: 'var(--surface-color)' }}>
                  {filterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Monitor Cards */}
          <div className="flex flex-col gap-3 w-full max-w-full overflow-hidden">
            {loading ? (
              <div className="text-center py-8" style={{ color: 'var(--subtle-text)' }}>Loading monitors...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">Error: {error}</div>
            ) : monitors.length === 0 ? (
              <div className="text-center py-8" style={{ color: 'var(--subtle-text)' }}>No monitors found.</div>
            ) : (
              monitors
                .filter((monitor) => {
                  if (!searchQuery) return true;
                  const query = searchQuery.toLowerCase();
                  return (
                    monitor.name.toLowerCase().includes(query) ||
                    monitor.item.title.toLowerCase().includes(query) ||
                    monitor.item.id.toLowerCase().includes(query) ||
                    monitor.country.site.toLowerCase().includes(query)
                  );
                })
                .map((monitor) => {
                  const isExpanded = mobileExpandedCards.has(monitor.id);
                  const { visible: visibleFields, hidden: hiddenFieldsCount } = getVisibleFields(monitor.fields);
                  const usagePercent = Math.round((monitor.usage.used / monitor.usage.total) * 100);
                  
                  return (
                    <div
                      key={monitor.id}
                      className={`rounded-xl shadow-sm border w-full max-w-full overflow-hidden ${isExpanded ? 'expanded' : ''}`}
                      style={{
                        backgroundColor: 'var(--surface-color)',
                        borderColor: 'var(--border-color)',
                        boxShadow: isExpanded ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
                        transition: 'box-shadow 0.2s'
                      }}
                    >
                      {/* Card Main */}
                      <div
                        className="p-3 flex items-center gap-3 cursor-pointer"
                        onClick={() => toggleMobileCard(monitor.id)}
                      >
                        <img src={monitor.item.image} alt={monitor.item.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <p className="font-semibold text-[15px] mb-0.5 truncate max-w-[180px]" style={{ color: 'var(--bold-text)' }}>{monitor.name}</p>
                          <p className="text-[13px] truncate max-w-[174px]" style={{ color: 'var(--subtle-text)' }}>{monitor.item.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <img src={monitor.country.flag} alt={monitor.country.code} className="w-4 h-3 rounded-sm object-cover" />
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-lg" style={{ backgroundColor: 'var(--apply-button-bg)', color: 'var(--header-green)' }}>
                              {monitor.interval}
                            </span>
                            <span className="text-[11px]" style={{ color: 'var(--subtle-text)' }}>{monitor.lastCheck}</span>
                          </div>
                        </div>
                        <div
                          className="relative w-11 h-6 rounded-full cursor-pointer flex-shrink-0"
                          style={{
                            backgroundColor: monitor.isActive ? 'var(--success-green)' : 'var(--gray-300)'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(monitor.id);
                          }}
                        >
                          <div
                            className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform"
                            style={{
                              transform: monitor.isActive ? 'translateX(20px)' : 'translateX(2px)',
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                            }}
                          />
                        </div>
                        <div className="relative flex-shrink-0">
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                            style={{ color: 'var(--subtle-text)' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              toggleMobileDropdown(monitor.id);
                            }}
                            onTouchStart={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                            }}
                            onTouchEnd={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                          </button>
                          {mobileOpenDropdown === monitor.id && (
                            <div
                              className="absolute top-full right-0 mt-2 rounded-lg shadow-lg min-w-[160px] z-50 p-2"
                              style={{
                                backgroundColor: 'var(--surface-color)',
                                borderColor: 'var(--border-color)',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                              }}
                            >
                              <div
                                className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-md cursor-pointer transition-colors"
                                style={{ color: 'var(--text-default)' }}
                                onClick={() => {
                                  openMobileHistory('page', monitor.id);
                                  setMobileOpenDropdown(null);
                                }}
                                onTouchStart={(e) => {
                                  e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                }}
                                onTouchEnd={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                                View History
                              </div>
                              <div
                                className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-md cursor-pointer transition-colors"
                                style={{ color: 'var(--text-default)' }}
                                onClick={() => {
                                  setMobileOpenDropdown(null);
                                  // Edit functionality
                                }}
                                onTouchStart={(e) => {
                                  e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                }}
                                onTouchEnd={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                Edit Monitor
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Enhanced Info Section */}
                      <div className="px-3 pb-3 flex flex-col gap-2 border-t" style={{ borderTopColor: 'var(--border-color)' }}>
                        {/* Fields Section */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs font-medium flex-shrink-0" style={{ color: 'var(--subtle-text)' }}>Fields:</span>
                          <div className="flex items-center gap-1 flex-wrap justify-end flex-1">
                            {visibleFields.map((field) => (
                              <span key={field} className="inline-flex items-center px-1.5 py-0.5 rounded-lg text-[10px] font-medium" style={{ backgroundColor: 'var(--gray-200)', color: 'var(--bold-text)' }}>
                                {field}
                              </span>
                            ))}
                            {hiddenFieldsCount > 0 && (
                              <span
                                className="inline-flex items-center px-1.5 py-0.5 rounded-lg text-[10px] font-semibold text-white cursor-pointer relative"
                                style={{ backgroundColor: 'var(--verification-blue)' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowFieldsTooltip(showFieldsTooltip === monitor.id ? null : monitor.id);
                                }}
                              >
                                +{hiddenFieldsCount}
                                {showFieldsTooltip === monitor.id && (
                                  <div
                                    className="absolute bottom-full right-0 mb-2 px-2 py-1.5 rounded text-[11px] whitespace-nowrap z-50"
                                    style={{
                                      backgroundColor: 'var(--dark-text)',
                                      color: 'white',
                                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                                    }}
                                  >
                                    {monitor.fields.join(', ')}
                                    <div className="absolute top-full right-3 border-4 border-transparent" style={{ borderTopColor: 'var(--dark-text)' }}></div>
                                  </div>
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Usage Section */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs font-medium flex-shrink-0" style={{ color: 'var(--subtle-text)' }}>Usage:</span>
                          <div className="flex items-center gap-2 flex-1 justify-end">
                            <div className="w-[60px] h-1.5 rounded-full relative cursor-help" style={{ backgroundColor: 'var(--gray-200)' }}>
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${usagePercent}%`,
                                  backgroundColor: 'var(--success-green)'
                                }}
                              />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50" style={{ backgroundColor: 'var(--dark-text)', color: 'white' }}>
                                {formatNumber(monitor.usage.used)}/{formatNumber(monitor.usage.total)} checks used
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-2 border-transparent" style={{ borderTopColor: 'var(--dark-text)' }}></div>
                              </div>
                            </div>
                            <span className="text-[10px]" style={{ color: 'var(--subtle-text)' }}>{usagePercent}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      <div 
                        className="overflow-hidden transition-all duration-400 ease-in-out"
                        style={{ 
                          maxHeight: isExpanded ? '1000px' : '0',
                          transition: 'max-height 0.4s ease-in-out'
                        }}
                      >
                        <div className="px-3 pb-3 border-t" style={{ borderTopColor: 'var(--border-color)', backgroundColor: 'var(--gray-50)' }}>
                          {monitor.details.map((detail, idx) => (
                            <div key={idx} className={`grid grid-cols-[1fr_1.5fr_auto] items-center gap-3 py-2.5 ${idx < monitor.details.length - 1 ? 'border-b' : ''}`} style={{ borderBottomColor: 'var(--border-color)' }}>
                              <div className="font-medium text-xs text-center px-2 py-1 rounded-md" style={{ backgroundColor: 'var(--gray-200)', color: 'var(--bold-text)' }}>
                                {detail.field}
                              </div>
                              <div
                                className="text-xs truncate cursor-pointer"
                                style={{ color: 'var(--text-default)' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(detail.currentValueFull);
                                }}
                              >
                                {detail.currentValue}
                                {detail.unreadCount > 0 && (
                                  <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-4.5 rounded-full text-[11px] font-semibold px-1.5 text-white" style={{ backgroundColor: 'var(--verification-blue)' }}>
                                    {detail.unreadCount}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <button
                                  className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all"
                                  style={{ backgroundColor: 'var(--apply-button-bg)', color: 'var(--header-green)' }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openMobileHistory('field', monitor.id, detail.field);
                                  }}
                                  onTouchStart={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--apply-button-hover)';
                                  }}
                                  onTouchEnd={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--apply-button-bg)';
                                  }}
                                >
                                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.1282 5.53408C15.6009 4.20127 13.6364 3.47739 11.6095 3.50054C9.58258 3.52369 7.63513 4.29225 6.1387 5.6596C4.64227 7.02694 3.70161 8.89735 3.4962 10.914C3.45422 11.326 3.08614 11.6261 2.67405 11.5841C2.26197 11.5421 1.96194 11.174 2.00392 10.762C2.24668 8.37868 3.35837 6.1682 5.12688 4.55225C6.89539 2.9363 9.19692 2.028 11.5924 2.00064C13.9878 1.97328 16.3095 2.82877 18.1145 4.40391C19.9194 5.97904 21.0813 8.16356 21.3784 10.5407C21.6756 12.9178 21.0872 15.3211 19.7255 17.292C18.3638 19.263 16.3241 20.6637 13.9956 21.2268C11.6672 21.7899 9.21286 21.4761 7.101 20.3452C5.62665 19.5557 4.39125 18.4065 3.50006 17.019V19.838C3.50006 20.2522 3.16427 20.588 2.75006 20.588C2.33584 20.588 2.00006 20.2522 2.00006 19.838V14.838C2.00006 14.4237 2.33584 14.088 2.75006 14.088H7.75006C8.16427 14.088 8.50006 14.4237 8.50006 14.838C8.50006 15.2522 8.16427 15.588 7.75006 15.588H4.40079C5.1641 17.0404 6.34792 18.2404 7.80911 19.0229C9.59607 19.9798 11.6728 20.2453 13.643 19.7688C15.6133 19.2923 17.3392 18.1072 18.4914 16.4394C19.6436 14.7717 20.1414 12.7381 19.89 10.7267C19.6386 8.71532 18.6555 6.86688 17.1282 5.53408ZM11.7003 7.08789C12.1145 7.08789 12.4503 7.42368 12.4503 7.83789V11.5272L14.2306 13.3076C14.5235 13.6005 14.5235 14.0753 14.2306 14.3682C13.9377 14.6611 13.4628 14.6611 13.1699 14.3682L11.1699 12.3682C11.0293 12.2276 10.9503 12.0368 10.9503 11.8379V7.83789C10.9503 7.42368 11.286 7.08789 11.7003 7.08789Z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterDrawerOpen && (
          <>
            <div
              className="fixed inset-0 z-[2500] transition-all duration-300"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={() => setMobileFilterDrawerOpen(false)}
            />
            <div
              className="fixed bottom-0 left-0 w-full max-h-[92%] rounded-t-[20px] z-[3000] transition-all duration-300 flex flex-col"
              style={{
                backgroundColor: 'var(--surface-color)',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.15)',
                transform: mobileFilterDrawerOpen ? 'translateY(0)' : 'translateY(100%)'
              }}
            >
              <div className="p-4 border-b flex justify-between items-center flex-shrink-0" style={{ borderBottomColor: 'var(--border-color)' }}>
                <div className="text-lg font-semibold" style={{ color: 'var(--bold-text)' }}>Filters & Sort</div>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                  style={{ color: 'var(--subtle-text)' }}
                  onClick={() => setMobileFilterDrawerOpen(false)}
                  onTouchStart={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto flex-1">
                {/* Sort By Section */}
                <div className="p-5 border-b" style={{ borderBottomColor: 'var(--border-color)' }}>
                  <div className="mb-3">
                    <h3 className="text-base font-semibold" style={{ color: 'var(--bold-text)' }}>Sort By</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {['name', 'nameDesc', 'lastModified', 'mostActive'].map((value) => (
                      <label key={value} className="flex items-center cursor-pointer py-2" onClick={() => setMobileSortBy(value)}>
                        <input 
                          type="radio" 
                          name="mobileSortBy" 
                          value={value} 
                          checked={mobileSortBy === value}
                          onChange={() => setMobileSortBy(value)}
                          className="hidden" 
                        />
                        <span className="relative pl-7 text-[15px]" style={{ color: 'var(--text-default)' }}>
                          <span 
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full border-2 transition-colors" 
                            style={{ borderColor: mobileSortBy === value ? 'var(--active-green)' : 'var(--gray-300)' }}
                          ></span>
                          {mobileSortBy === value && (
                            <span 
                              className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full transition-all" 
                              style={{ backgroundColor: 'var(--active-green)' }}
                            ></span>
                          )}
                          {value === 'name' && 'Name (A-Z)'}
                          {value === 'nameDesc' && 'Name (Z-A)'}
                          {value === 'lastModified' && 'Last Modified'}
                          {value === 'mostActive' && 'Most Active'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Section */}
                <div className="p-5 border-b" style={{ borderBottomColor: 'var(--border-color)' }}>
                  <div className="mb-3">
                    <h3 className="text-base font-semibold" style={{ color: 'var(--bold-text)' }}>Status</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { value: 'all', label: 'All Monitors' },
                      { value: 'active', label: 'Active Only' },
                      { value: 'paused', label: 'Paused Only' },
                      { value: 'error', label: 'With Errors' }
                    ].map(({ value, label }) => (
                      <label key={value} className="flex items-center cursor-pointer py-2" onClick={() => setMobileStatusFilter(value)}>
                        <input 
                          type="radio" 
                          name="mobileStatusFilter" 
                          value={value} 
                          checked={mobileStatusFilter === value}
                          onChange={() => setMobileStatusFilter(value)}
                          className="hidden" 
                        />
                        <span className="relative pl-7 text-[15px]" style={{ color: 'var(--text-default)' }}>
                          <span 
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full border-2 transition-colors" 
                            style={{ borderColor: mobileStatusFilter === value ? 'var(--active-green)' : 'var(--gray-300)' }}
                          ></span>
                          {mobileStatusFilter === value && (
                            <span 
                              className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full transition-all" 
                              style={{ backgroundColor: 'var(--active-green)' }}
                            ></span>
                          )}
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Country Section */}
                <div className="p-5 border-b" style={{ borderBottomColor: 'var(--border-color)' }}>
                  <div className="mb-3">
                    <h3 className="text-base font-semibold" style={{ color: 'var(--bold-text)' }}>Country</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { value: 'all', label: 'All Countries' },
                      { value: 'us', label: 'United States' },
                      { value: 'ca', label: 'Canada' },
                      { value: 'uk', label: 'United Kingdom' }
                    ].map(({ value, label }) => (
                      <label key={value} className="flex items-center cursor-pointer py-2" onClick={() => setMobileCountryFilter(value)}>
                        <input 
                          type="radio" 
                          name="mobileCountryFilter" 
                          value={value} 
                          checked={mobileCountryFilter === value}
                          onChange={() => setMobileCountryFilter(value)}
                          className="hidden" 
                        />
                        <span className="relative pl-7 text-[15px]" style={{ color: 'var(--text-default)' }}>
                          <span 
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full border-2 transition-colors" 
                            style={{ borderColor: mobileCountryFilter === value ? 'var(--active-green)' : 'var(--gray-300)' }}
                          ></span>
                          {mobileCountryFilter === value && (
                            <span 
                              className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full transition-all" 
                              style={{ backgroundColor: 'var(--active-green)' }}
                            ></span>
                          )}
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bulk Actions Section */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-base font-semibold" style={{ color: 'var(--bold-text)' }}>Bulk Actions</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      className="flex items-center gap-2.5 px-4 py-3 border rounded-lg text-sm transition-colors"
                      style={{
                        borderColor: 'var(--border-color)',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-default)'
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      Pause Selected
                    </button>
                    <button
                      className="flex items-center gap-2.5 px-4 py-3 border rounded-lg text-sm transition-colors"
                      style={{
                        borderColor: 'var(--border-color)',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-default)'
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Resume Selected
                    </button>
                    <button
                      className="flex items-center gap-2.5 px-4 py-3 border rounded-lg text-sm transition-colors"
                      style={{
                        borderColor: 'var(--border-color)',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-default)'
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Export Selected
                    </button>
                    <button
                      className="flex items-center gap-2.5 px-4 py-3 border rounded-lg text-sm transition-colors"
                      style={{
                        borderColor: 'var(--error-red)',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--error-red)'
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.backgroundColor = '#fef2f2';
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      Delete Selected
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t flex gap-3 flex-shrink-0" style={{ borderTopColor: 'var(--border-color)' }}>
                <button
                  className="flex-1 py-3 rounded-lg text-[15px] font-medium transition-colors"
                  style={{ backgroundColor: 'var(--gray-200)', color: 'var(--bold-text)' }}
                  onClick={() => {
                    setMobileSortBy('lastModified');
                    setMobileStatusFilter('all');
                    setMobileCountryFilter('all');
                    setFilterCount(0);
                    setMobileFilterDrawerOpen(false);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000);
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--gray-300)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--gray-200)';
                  }}
                >
                  Reset All
                </button>
                <button
                  className="flex-1 py-3 rounded-lg text-[15px] font-medium text-white transition-colors"
                  style={{ backgroundColor: 'var(--header-green)' }}
                  onClick={() => {
                    let count = 0;
                    if (mobileSortBy !== 'lastModified') count++;
                    if (mobileStatusFilter !== 'all') count++;
                    if (mobileCountryFilter !== 'all') count++;
                    
                    setFilterCount(count);
                    setMobileFilterDrawerOpen(false);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000);
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--active-green)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--header-green)';
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </>
        )}

        {/* Mobile History Drawer */}
        {mobileHistoryDrawerOpen && mobileHistoryData && (
          <>
            <div
              className="fixed inset-0 z-[2500] transition-all duration-300"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={closeMobileHistory}
            />
            <div
              className="fixed bottom-0 left-0 w-full max-h-[92%] rounded-t-[20px] z-[3000] transition-all duration-300 flex flex-col"
              style={{
                backgroundColor: 'var(--surface-color)',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.15)',
                transform: mobileHistoryDrawerOpen ? 'translateY(0)' : 'translateY(100%)'
              }}
            >
              <div className="p-4 border-b flex justify-between items-center flex-shrink-0" style={{ borderBottomColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2.5">
                  {mobileHistoryType === 'page' || mobileHistoryType === 'item' ? (
                    <>
                      <img
                        src={monitors.find(m => m.id === mobileHistoryData.monitorId)?.item.image}
                        alt=""
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <span className="text-lg font-semibold" style={{ color: 'var(--bold-text)' }}>
                        {mobileHistoryType === 'page' ? 'Page History' : monitors.find(m => m.id === mobileHistoryData.monitorId)?.item.title}
                      </span>
                    </>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg font-semibold" style={{ color: 'var(--bold-text)' }}>History for</span>
                      <span className="px-3 py-1.5 rounded-lg font-semibold text-sm" style={{ backgroundColor: 'var(--apply-button-bg)', color: 'var(--header-green)' }}>
                        {mobileHistoryData.fieldName === 'Monitor' ? monitors.find(m => m.id === mobileHistoryData.monitorId)?.name || 'Monitor' : (mobileHistoryData.fieldName || '').toLowerCase()}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                  style={{ color: 'var(--subtle-text)' }}
                  onClick={closeMobileHistory}
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-4">
                {(() => {
                  const historyData = getMobileHistoryData();
                  const filteredChanges = getFilteredHistoryChanges();
                  
                  if (!historyData) {
                    return <div className="text-sm text-center py-8" style={{ color: 'var(--subtle-text)' }}>No history available.</div>;
                  }
                  
                  return (
                    <>
                      {/* Stats */}
                      {(mobileHistoryType === 'page' || mobileHistoryType === 'field') && (
                        <div className={`grid ${mobileHistoryType === 'page' ? 'grid-cols-2' : 'grid-cols-2'} gap-3 mb-5`}>
                          {historyData.stats.map((stat: { label: string; value: string }, idx: number) => {
                            const isDecrease = stat.value.startsWith('-');
                            const isIncrease = stat.value.startsWith('+');
                            return (
                              <div key={idx} className={`${mobileHistoryType === 'page' ? 'bg-[var(--gray-50)]' : 'bg-[var(--gray-50)]'} rounded-lg p-3 text-center`}>
                                <h4 className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--subtle-text)' }}>{stat.label}</h4>
                                <div 
                                  className={`text-base font-semibold ${isDecrease ? 'text-[var(--error-red)]' : isIncrease ? 'text-[var(--success-green)]' : ''}`}
                                  style={{ color: isDecrease ? 'var(--error-red)' : isIncrease ? 'var(--success-green)' : 'var(--bold-text)' }}
                                >
                                  {stat.value}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {/* Filters */}
                      {(mobileHistoryType === 'page' || mobileHistoryType === 'field') && (
                        <div className="pb-4 border-b mb-4" style={{ borderBottomColor: 'var(--border-color)' }}>
                          {/* Search */}
                          <div className="relative mb-3">
                            <svg 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                              style={{ color: 'var(--subtle-text)' }}
                            >
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                              type="text"
                              placeholder="Search changes..."
                              value={mobileHistorySearch}
                              onChange={(e) => setMobileHistorySearch(e.target.value)}
                              className="w-full pl-8 pr-3 py-2 rounded-md text-sm"
                              style={{
                                borderColor: 'var(--border-color)',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                backgroundColor: 'var(--surface-color)',
                                color: 'var(--text-default)'
                              }}
                            />
                          </div>
                          
                          {/* Filter Buttons */}
                          <div className="flex gap-2 flex-wrap">
                            {mobileHistoryType === 'page' && (
                              <button
                                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                                style={{
                                  backgroundColor: 'white',
                                  borderColor: 'var(--border-color)',
                                  borderWidth: '1px',
                                  borderStyle: 'solid',
                                  color: 'var(--text-default)'
                                }}
                                onTouchStart={(e) => {
                                  e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                }}
                                onTouchEnd={(e) => {
                                  e.currentTarget.style.backgroundColor = 'white';
                                }}
                              >
                                All Fields
                              </button>
                            )}
                            <div className="relative">
                              <button
                                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
                                style={{
                                  backgroundColor: 'white',
                                  borderColor: 'var(--border-color)',
                                  borderWidth: '1px',
                                  borderStyle: 'solid',
                                  color: 'var(--text-default)'
                                }}
                                onClick={() => setMobileHistoryShowDateDropdown(!mobileHistoryShowDateDropdown)}
                                onTouchStart={(e) => {
                                  e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                }}
                                onTouchEnd={(e) => {
                                  e.currentTarget.style.backgroundColor = 'white';
                                }}
                              >
                                {mobileHistoryDateFilter}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </button>
                              {mobileHistoryShowDateDropdown && (
                                <div 
                                  className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg min-w-[160px] z-50 border"
                                  style={{ borderColor: 'var(--border-color)' }}
                                >
                                  {['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'].map((option) => (
                                    <button
                                      key={option}
                                      className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--gray-50)] transition-colors first:rounded-t-lg last:rounded-b-lg"
                                      style={{ color: 'var(--text-default)' }}
                                      onClick={() => {
                                        setMobileHistoryDateFilter(option);
                                        setMobileHistoryShowDateDropdown(false);
                                      }}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs" style={{ color: 'var(--text-default)' }}>Alerts Only</span>
                              <div
                                className={`relative w-7 h-4 rounded-full cursor-pointer transition-colors ${mobileHistoryAlertsOnly ? 'bg-[var(--success-green)]' : 'bg-[var(--gray-300)]'}`}
                                onClick={() => setMobileHistoryAlertsOnly(!mobileHistoryAlertsOnly)}
                              >
                                <div
                                  className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform"
                                  style={{
                                    transform: mobileHistoryAlertsOnly ? 'translateX(12px)' : 'translateX(2px)',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* History List */}
                      <div className="flex flex-col gap-2">
                        {filteredChanges.length === 0 ? (
                          <div className="text-center py-8 text-sm" style={{ color: 'var(--subtle-text)' }}>No changes found matching your criteria.</div>
                        ) : (
                          filteredChanges.map((change: { id: string; date: string; field?: string; prev: string; new: string; mag: string; alert: boolean }) => {
                            const magClass = change.mag.startsWith('+') ? 'increase' : (change.mag.startsWith('-') ? 'decrease' : 'neutral');
                            return (
                              <div
                                key={change.id}
                                className="bg-white rounded-lg p-3 text-sm border cursor-pointer transition-colors"
                                style={{
                                  borderColor: 'var(--border-color)',
                                  backgroundColor: 'var(--surface-color)'
                                }}
                                onClick={() => copyToClipboard(change.id)}
                                onTouchStart={(e) => {
                                  e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                }}
                                onTouchEnd={(e) => {
                                  e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                                }}
                              >
                                <div className="flex justify-between items-start mb-2" style={{ color: 'var(--subtle-text)' }}>
                                  <span className="text-xs font-medium font-mono">{change.id} • {change.date}</span>
                                  {change.alert && (
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" style={{ color: 'var(--success-green)' }}>
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                  )}
                                </div>
                                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                                  {change.field && (
                                    <>
                                      <div className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--subtle-text)' }}>Field</div>
                                      <div className="text-xs font-medium" style={{ color: 'var(--bold-text)' }}>
                                        <span className="px-1.5 py-0.5 rounded bg-[var(--gray-100)]">{change.field}</span>
                                      </div>
                                    </>
                                  )}
                                  <div className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--subtle-text)' }}>Previous</div>
                                  <div className="text-xs font-medium truncate" style={{ color: 'var(--bold-text)' }}>{change.prev}</div>
                                  <div className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--subtle-text)' }}>New</div>
                                  <div className="text-xs font-medium truncate" style={{ color: 'var(--bold-text)' }}>{change.new}</div>
                                </div>
                                <div className="mt-2 flex justify-between items-center">
                                  <span 
                                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                      magClass === 'increase' 
                                        ? 'text-[var(--success-green)] bg-[var(--apply-button-bg)]' 
                                        : magClass === 'decrease'
                                        ? 'text-[var(--error-red)] bg-[#fef2f2]'
                                        : 'text-[var(--subtle-text)] bg-[var(--gray-100)]'
                                    }`}
                                  >
                                    {change.mag}
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
              {(mobileHistoryType === 'page' || mobileHistoryType === 'field') && (
                <div className="p-4 border-t flex gap-3 flex-shrink-0" style={{ borderTopColor: 'var(--border-color)' }}>
                  <button
                    className="flex-1 py-3 rounded-lg text-[15px] font-medium transition-colors"
                    style={{ backgroundColor: 'var(--gray-200)', color: 'var(--bold-text)' }}
                  >
                    Export
                  </button>
                  <button
                    className="flex-1 py-3 rounded-lg text-[15px] font-medium text-white transition-colors"
                    style={{ backgroundColor: 'var(--header-green)' }}
                    onClick={closeMobileHistory}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Mobile Toast */}
        <div
          className={`fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg text-sm font-medium text-white z-[2000] transition-all duration-300 flex items-center gap-2 min-w-[280px] max-w-[calc(100%-40px)] ${
            showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
          }`}
          style={{ backgroundColor: 'var(--success-green)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Filters applied successfully!
        </div>

        {/* New Monitor Modal */}
        <NewMonitorModal
          isOpen={isNewMonitorModalOpen}
          onClose={() => setIsNewMonitorModalOpen(false)}
        />

        {/* Field History Modal */}
        {selectedFieldHistory && (
          <FieldHistoryModal
            isOpen={fieldHistoryModalOpen}
            onClose={() => {
              setFieldHistoryModalOpen(false);
              setSelectedFieldHistory(null);
            }}
            fieldName={selectedFieldHistory.fieldName}
            monitorId={selectedFieldHistory.monitorId}
            monitorName={monitors.find(m => m.id === selectedFieldHistory.monitorId)?.name}
            onViewMonitorHistory={() => {
              setFieldHistoryModalOpen(false);
              setSelectedFieldHistory({ 
                monitorId: selectedFieldHistory.monitorId, 
                fieldName: 'Monitor'
              });
              setFieldHistoryModalOpen(true);
            }}
          />
        )}
      </div>
    );
  }

  // Desktop version (existing code)
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="w-full max-w-[1235px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--bold-text)' }}>Monitors</h1>
          <button 
            onClick={() => setIsNewMonitorModalOpen(true)}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            style={{
              borderColor: 'var(--active-green)',
              backgroundColor: 'var(--apply-button-bg)',
              color: 'var(--header-green)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--apply-button-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--apply-button-bg)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-4 h-4">
              <path fill="currentColor" d="M9 4H7V7H4V9H7V12H9V9H12V7H9V4Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
            New Monitor
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-xl p-5 shadow-sm flex items-center" style={{ backgroundColor: 'var(--surface-color)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6" style={{ color: 'var(--header-green)' }}>
                <path d="M12 2C6.579 2 2 6.58 2 12s4.579 10 10 10 10-4.58 10-10S17.421 2 12 2zm0 18c-4.337 0-8-3.664-8-8 0-3.998 3.115-7.417 7-7.927V6.09C8.167 6.569 6 9.033 6 12c0 3.309 2.691 6 6 6 1.595 0 3.1-.626 4.237-1.763l-1.414-1.415A3.97 3.97 0 0 1 12 16c-2.206 0-4-1.794-4-4 0-1.858 1.279-3.411 3-3.858v2.146c-.59.353-1 .993-1 1.712 0 1.081.919 2 2 2s2-.919 2-2c0-.719-.41-1.359-1-1.712V4.073c3.885.51 7 3.929 7 7.927 0 4.336-3.663 8-8 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Total Monitors</h3>
              <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{formatNumber(mockStats.total)}</div>
            </div>
          </div>

          <div className="rounded-xl p-5 shadow-sm flex items-center" style={{ backgroundColor: 'var(--surface-color)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" style={{ color: 'var(--header-green)' }}>
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Active</h3>
              <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{formatNumber(mockStats.active)}</div>
            </div>
          </div>

          <div className="rounded-xl p-5 shadow-sm flex items-center" style={{ backgroundColor: 'var(--surface-color)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" style={{ color: 'var(--header-green)' }}>
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Unread Changes</h3>
              <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{formatNumber(mockStats.unreadChanges)}</div>
            </div>
          </div>

          <div className="rounded-xl p-5 shadow-sm flex items-center" style={{ backgroundColor: 'var(--surface-color)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" style={{ color: 'var(--header-green)' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Issues</h3>
              <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{formatNumber(mockStats.issues)}</div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-xl shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--surface-color)' }}>
           {/* Filters Row */}
           <div className="flex justify-between items-center p-4 overflow-visible max-md:flex-col max-md:items-stretch max-md:gap-3" style={{ borderBottomColor: 'var(--border-color)', borderBottomWidth: '1px', borderBottomStyle: 'solid' }}>
             <div className="relative w-full md:w-80 overflow-visible">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search monitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-default)',
                  backgroundColor: 'var(--surface-color)',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--header-green)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(var(--header-green-rgb, 1, 104, 83), 0.2)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div className="flex gap-3 overflow-visible flex-wrap md:flex-nowrap">
              {/* Sort Dropdown */}
              <div className="relative overflow-visible">
                <button
                  onClick={() => toggleDropdown('sort')}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 relative overflow-visible"
                  style={{
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--surface-color)',
                    color: 'var(--text-default)',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                  }}
                >
                  <svg viewBox="0 0 16 16" strokeLinejoin="round" fill="currentColor" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                    <path d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z" />
                  </svg>
                  Sort
                </button>
                {openDropdown === 'sort' && (
                  <div className="absolute top-full right-0 mt-2 rounded-lg shadow-lg min-w-[180px] z-10 p-2" style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                    <a href="#" className="block px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>Name (A-Z)</a>
                    <a href="#" className="block px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>Name (Z-A)</a>
                    <a href="#" className="block px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>Last Modified</a>
                    <a href="#" className="block px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>Most Active</a>
                    <a href="#" className="block px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>Status</a>
                  </div>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="relative overflow-visible">
                <button
                  onClick={() => toggleDropdown('status')}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 relative overflow-visible"
                  style={{
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--surface-color)',
                    color: 'var(--text-default)',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                  }}
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
                  </svg>
                  Status
                </button>
                {openDropdown === 'status' && (
                  <div className="absolute top-full right-0 mt-2 rounded-lg shadow-lg min-w-[180px] z-10 p-2" style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                    <a href="#" className="block px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>All</a>
                    <a href="#" className="block px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>Active</a>
                    <a href="#" className="block px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>Paused</a>
                    <a href="#" className="block px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>Error</a>
                  </div>
                )}
              </div>

              {/* Bulk Actions Dropdown */}
              <div className="relative overflow-visible">
                <button
                  onClick={() => toggleDropdown('bulk')}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors relative overflow-visible"
                  style={{
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--surface-color)',
                    color: 'var(--text-default)',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                  }}
                >
                  Bulk Actions
                </button>
                {openDropdown === 'bulk' && (
                  <div className="absolute top-full right-0 mt-2 rounded-lg shadow-lg min-w-[180px] z-10 p-2" style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                    <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      Pause Selected
                    </a>
                    <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Resume Selected
                    </a>
                    <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Export Selected
                    </a>
                    <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-md transition-colors" style={{ color: 'var(--text-default)' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.backgroundColor = '#ff4d4f'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-default)'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      Delete Selected
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full min-w-[720px] md:min-w-0 overflow-visible">
              <thead className="overflow-visible">
                <tr className="overflow-visible">
                  <th className="px-4 py-3 text-left overflow-visible" style={{ backgroundColor: 'var(--gray-100)' }}>
                    <div
                      onClick={toggleSelectAll}
                      className="w-[18px] h-[18px] border-2 rounded cursor-pointer transition-all relative"
                      style={{
                        backgroundColor: monitors.length > 0 && selectedMonitors.size === monitors.length ? 'var(--active-green)' : 'var(--surface-color)',
                        borderColor: monitors.length > 0 && selectedMonitors.size === monitors.length ? 'var(--active-green)' : 'var(--border-color)'
                      }}
                    >
                      {monitors.length > 0 && selectedMonitors.size === monitors.length && (
                        <div className="absolute left-[4px] top-[1px] w-[5px] h-[10px] border-white border-r-2 border-b-2 rotate-45" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 overflow-visible" style={{ backgroundColor: 'var(--gray-100)' }}></th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider overflow-visible" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--subtle-text)' }}>Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider overflow-visible" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--subtle-text)' }}>Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider overflow-visible" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--subtle-text)' }}>Country</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider overflow-visible" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--subtle-text)' }}>Interval</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider overflow-visible" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--subtle-text)' }}>Last</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider overflow-visible" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--subtle-text)' }}>Fields</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider overflow-visible" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--subtle-text)' }}>Usage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider overflow-visible" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--subtle-text)' }}>Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider overflow-visible" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--subtle-text)' }}>Alerts</th>
                  <th className="px-4 py-3 overflow-visible" style={{ backgroundColor: 'var(--gray-100)' }}></th>
                </tr>
              </thead>
              <tbody className="overflow-visible">
                {loading ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center" style={{ color: 'var(--subtle-text)' }}>
                      Loading monitors...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center text-red-600">
                      Error: {error}
                    </td>
                  </tr>
                ) : monitors.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center" style={{ color: 'var(--subtle-text)' }}>
                      No monitors found. Create your first monitor to get started.
                    </td>
                  </tr>
                ) : (
                 monitors
                   .filter((monitor) => {
                     if (!searchQuery) return true;
                     const query = searchQuery.toLowerCase();
                     return (
                       monitor.name.toLowerCase().includes(query) ||
                       monitor.item.title.toLowerCase().includes(query) ||
                       monitor.item.id.toLowerCase().includes(query) ||
                       monitor.country.site.toLowerCase().includes(query)
                     );
                   })
                   .map((monitor) => {
                   const { visible: visibleFields, hidden: hiddenFieldsCount } = getVisibleFields(monitor.fields);
                   const isExpanded = expandedMonitor === monitor.id;
 
                   return (
                     <Fragment key={monitor.id}>
                       <tr
                         className="transition-colors border-b relative overflow-visible"
                         style={{
                           borderBottomColor: 'var(--border-color)',
                           borderBottomWidth: '1px',
                           borderBottomStyle: 'solid',
                           backgroundColor: isExpanded ? 'var(--gray-100)' : 'var(--surface-color)'
                         }}
                         onMouseEnter={(e) => {
                           if (!isExpanded) {
                             e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                           }
                         }}
                         onMouseLeave={(e) => {
                           if (!isExpanded) {
                             e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                           }
                         }}
                       >
                        <td className="px-4 py-4">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelectMonitor(monitor.id);
                            }}
                            className="w-[18px] h-[18px] border-2 rounded cursor-pointer transition-all relative"
                            style={{
                              backgroundColor: selectedMonitors.has(monitor.id) ? 'var(--active-green)' : 'var(--surface-color)',
                              borderColor: selectedMonitors.has(monitor.id) ? 'var(--active-green)' : 'var(--border-color)'
                            }}
                          >
                            {selectedMonitors.has(monitor.id) && (
                              <div className="absolute left-[4px] top-[1px] w-[5px] h-[10px] border-white border-r-2 border-b-2 rotate-45" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => toggleExpand(monitor.id)}
                            className="w-8 h-8 rounded-md flex items-center justify-center transition-colors"
                            style={{
                              backgroundColor: 'var(--gray-200)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--gray-300)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--gray-200)';
                            }}
                          >
                            <svg
                              height="16"
                              aria-hidden="true"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              fill="none"
                              className={`text-[#5F5F5F] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            >
                              <path d="M19 9l-7 7-7-7" strokeLinejoin="round" strokeLinecap="round" />
                            </svg>
                          </button>
                        </td>
                         <td className="px-4 py-4 overflow-visible">
                           <div className="text-[15px] max-w-[140px] truncate font-semibold" style={{ color: 'var(--bold-text)' }} title={monitor.name}>
                             {truncateText(monitor.name, 15)}
                           </div>
                         </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                              <img src={monitor.item.image} alt={monitor.item.title} className="w-full h-full object-cover" />
                            </div>
                             <div className="flex flex-col overflow-hidden">
                               <div className="font-semibold text-sm max-w-[180px] truncate" style={{ color: 'var(--bold-text)' }} title={monitor.item.title}>
                                 {monitor.item.title}
                               </div>
                               <div className="text-xs truncate" style={{ color: 'var(--subtle-text)' }}>{monitor.item.id}</div>
                             </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="relative group cursor-help">
                            <img src={monitor.country.flag} alt={monitor.country.code} className="w-6 h-[18px] rounded-sm object-cover" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1B1B1B] text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none">
                              Site: {monitor.country.site}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-medium bg-[#EBFCF4] text-[#016853]">
                            {monitor.interval}
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <div 
                            ref={getLastCheckRef(monitor.id)}
                            className="relative text-xs cursor-help text-[#4A4A4A]"
                            onMouseEnter={() => setHoveredLastCheck(monitor.id)}
                            onMouseLeave={() => setHoveredLastCheck(null)}
                          >
                            {monitor.lastCheck}
                            <TooltipPortal 
                              isOpen={hoveredLastCheck === monitor.id}
                              targetRef={getLastCheckRef(monitor.id)}
                              position="top"
                            >
                              <div className="px-4 py-3 bg-[#1B1B1B] text-white text-xs rounded-md whitespace-pre-line leading-relaxed min-w-[250px] max-w-[400px] shadow-lg">
                              {monitor.lastCheckTooltip}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1B1B1B]"></div>
                            </div>
                            </TooltipPortal>
                          </div>
                        </td>
                         <td className="px-4 py-4 overflow-visible">
                           <div 
                             ref={getFieldsRef(monitor.id)}
                             className="flex items-center gap-1.5 max-w-[130px] relative"
                             onMouseEnter={() => hiddenFieldsCount > 0 && setShowFieldsTooltip(monitor.id)}
                             onMouseLeave={() => setShowFieldsTooltip(null)}
                           >
                            {visibleFields.map((field) => (
                              <span key={field} className="inline-flex items-center px-2 py-0.5 rounded-xl text-[11px] font-medium bg-[#f3f4f6] text-[#374151]">
                                {field}
                              </span>
                            ))}
                            {hiddenFieldsCount > 0 && (
                              <>
                                <span 
                                  className="inline-flex items-center px-2 py-0.5 rounded-xl text-[11px] font-medium bg-[#1D77BD] text-white hover:bg-[#1564cc] transition-colors cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFieldsTooltip(showFieldsTooltip === monitor.id ? null : monitor.id);
                                  }}
                                >
                                  +{hiddenFieldsCount}
                                </span>
                                <TooltipPortal 
                                  isOpen={showFieldsTooltip === monitor.id}
                                  targetRef={getFieldsRef(monitor.id)}
                                  position="top"
                                >
                                  <div className="px-4 py-4 bg-[#1B1B1B] text-white text-xs rounded-lg min-w-[250px] max-w-[400px] shadow-lg">
                                    <div className="flex flex-col gap-2 items-start">
                                    {monitor.fields.map((field) => (
                                        <span key={field} className="inline-flex items-center px-2 py-1 rounded-xl text-[11px] font-medium bg-[#f3f4f6] text-[#374151] w-full justify-start">
                                        {field}
                                      </span>
                                    ))}
                                  </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1B1B1B]"></div>
                                </div>
                                </TooltipPortal>
                              </>
                            )}
                          </div>
                        </td>
                         <td className="px-4 py-4 overflow-visible">
                           <div className="flex items-center gap-2">
                             <div className="relative flex-grow h-1.5 bg-[#e5e7eb] rounded-full min-w-[60px] group cursor-help">
                              <div
                                className="h-full bg-[#089E68] rounded-full transition-all"
                                style={{ width: `${monitor.usage.percentage}%` }}
                              />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1B1B1B] text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none">
                                {formatNumber(monitor.usage.used)}/{formatNumber(monitor.usage.total)} checks used
                              </div>
                            </div>
                          </div>
                        </td>
                         <td className="px-4 py-4 overflow-visible">
                           <div className="flex items-center gap-2">
                             <div
                               onClick={() => handleToggleStatus(monitor.id)}
                               className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${
                                 monitor.isActive ? 'bg-[#089E68]' : 'bg-[#d1d5db]'
                               }`}
                             >
                               <div
                                 className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                   monitor.isActive ? 'translate-x-5' : 'translate-x-0.5'
                                 }`}
                               />
                             </div>
                           </div>
                         </td>
                         <td className="px-4 py-4 overflow-visible">
                           <div className="flex items-center gap-1">
                             {monitor.alerts.slice(0, 2).map((alert) => (
                              <div key={alert} className="w-6 h-6 rounded bg-[#f3f4f6] flex items-center justify-center border-2 border-white -mr-1 relative group cursor-help">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#5F5F5F]">
                                  {alert === 'Email' ? (
                                    <>
                                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                      <polyline points="22 6 12 13 2 6" />
                                    </>
                                  ) : (
                                    <>
                                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                      <line x1="8" y1="21" x2="16" y2="21" />
                                      <line x1="12" y1="17" x2="12" y2="21" />
                                    </>
                                  )}
                                </svg>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1B1B1B] text-white text-[11px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none">
                                  {alert}
                                </div>
                              </div>
                            ))}
                             {monitor.alerts.length > 2 && (
                               <span className="inline-flex items-center px-1.5 py-0.5 rounded-[10px] text-[10px] font-semibold bg-[#1D77BD] text-white ml-1.5 relative group cursor-help">
                                 +{monitor.alerts.length - 2}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1B1B1B] text-white text-[11px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none">
                                  {monitor.alerts.join(', ')}
                                </div>
                              </span>
                            )}
                          </div>
                        </td>
                         <td className="px-3 py-3">
                           <div className="relative">
                            <button
                              ref={getButtonRef(`options-${monitor.id}`)}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(`options-${monitor.id}`);
                              }}
                              className="w-9 h-9 flex items-center justify-center transition-all"
                              style={{
                                backgroundColor: 'transparent'
                              }}
                            >
                             <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: '#4A4A4A' }}>
                               <circle cx="5" cy="12" r="1.5"/>
                               <circle cx="12" cy="12" r="1.5"/>
                               <circle cx="19" cy="12" r="1.5"/>
                             </svg>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Details Row */}
                      {isExpanded && (
                        <tr className="bg-[#f9fafb] border-b border-[#e5e7eb] relative overflow-visible">
                          <td colSpan={12} className="px-0 py-0 overflow-visible">
                            <div className="mx-12 overflow-visible">
                              <table className="w-full overflow-visible">
                                <thead>
                                  <tr>
                                    <th className="bg-[#f3f4f6] text-[#5F5F5F] text-left border-b border-[#e5e7eb] overflow-visible" style={{ fontSize: "11px", padding: "10px 12px" }}>Field</th>
                                    <th className="bg-[#f3f4f6] text-[#5F5F5F] text-left border-b border-[#e5e7eb] overflow-visible" style={{ fontSize: "11px", padding: "10px 12px" }}>Type</th>
                                    <th className="bg-[#f3f4f6] text-[#5F5F5F] text-left border-b border-[#e5e7eb] overflow-visible" style={{ fontSize: "11px", padding: "10px 12px" }}>Current Value</th>
                                    <th className="bg-[#f3f4f6] text-[#5F5F5F] text-left border-b border-[#e5e7eb] overflow-visible" style={{ fontSize: "11px", padding: "10px 12px" }}>Previous</th>
                                    <th className="bg-[#f3f4f6] text-[#5F5F5F] text-left border-b border-[#e5e7eb] overflow-visible" style={{ fontSize: "11px", padding: "10px 12px" }}>Magnitude</th>
                                    <th className="bg-[#f3f4f6] text-[#5F5F5F] text-left border-b border-[#e5e7eb] overflow-visible" style={{ fontSize: "11px", padding: "10px 12px" }}>Modified</th>
                                    <th className="bg-[#f3f4f6] text-[#5F5F5F] text-left border-b border-[#e5e7eb] overflow-visible" style={{ fontSize: "11px", padding: "10px 12px" }}>Unread</th>
                                    <th className="bg-[#f3f4f6] text-[#5F5F5F] text-left border-b border-[#e5e7eb] overflow-visible" style={{ fontSize: "11px", padding: "10px 12px" }}>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {monitor.details.map((detail, idx) => (
                                    <tr key={idx} style={{ borderBottom: idx === monitor.details.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                                      <td className="bg-[#f9fafb] overflow-visible" style={{ padding: "12px", fontSize: "13px" }}>
                                        <span className="inline-flex items-center bg-[#f3f4f6] text-[#464646] font-medium relative group cursor-help" style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "12px", fontFamily: "monospace" }}>
                                          {detail.field}
                                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1B1B1B] text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-pre-line pointer-events-none" style={{ fontSize: "11px" }}>
                                            Triggers:{'\n'}
                                            {detail.triggers.join('\n')}
                                          </div>
                                        </span>
                                      </td>
                                      <td className="bg-[#f9fafb] overflow-visible" style={{ padding: "12px", fontSize: "13px" }}>
                                        <div className="text-[#4A4A4A] max-w-[120px] truncate" style={{ fontSize: "12px" }}>{detail.type}</div>
                                      </td>
                                      <td className="bg-[#f9fafb] overflow-visible" style={{ padding: "12px", fontSize: "13px" }}>
                                        <span
                                          onClick={() => copyToClipboard(detail.currentValueFull)}
                                          className="font-mono text-[#4A4A4A] cursor-pointer rounded hover:bg-[#f3f4f6] transition-colors max-w-[120px] truncate inline-block"
                                          style={{ fontSize: "12px", padding: "4px 8px" }}
                                          title={detail.currentValueFull}
                                        >
                                          {detail.currentValue}
                                        </span>
                                      </td>
                                      <td className="bg-[#f9fafb] overflow-visible" style={{ padding: "12px", fontSize: "13px" }}>
                                        <span
                                          onClick={() => copyToClipboard(detail.previousValueFull)}
                                          className="font-mono text-[#4A4A4A] cursor-pointer rounded hover:bg-[#f3f4f6] transition-colors max-w-[120px] truncate inline-block"
                                          style={{ fontSize: "12px", padding: "4px 8px" }}
                                          title={detail.previousValueFull}
                                        >
                                          {detail.previousValue}
                                        </span>
                                      </td>
                                      <td className="bg-[#f9fafb] overflow-visible" style={{ padding: "12px", fontSize: "13px" }}>
                                        <div className="flex items-center gap-2 min-w-[80px]">
                                          <div className="flex-grow h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden min-w-[40px]">
                                            <div
                                              className="h-full bg-[#089E68] rounded-full transition-all"
                                              style={{ width: `${detail.magnitude}%` }}
                                            />
                                          </div>
                                          <span className="text-[#5F5F5F] whitespace-nowrap" style={{ fontSize: "11px" }}>{detail.magnitude}%</span>
                                        </div>
                                      </td>
                                      <td className="bg-[#f9fafb] overflow-visible" style={{ padding: "12px", fontSize: "13px" }}>
                                        <div className="flex items-center gap-1 text-[#5F5F5F]" style={{ fontSize: "12px" }}>
                                          <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: "12px", height: "12px" }}>
                                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-6a1 1 0 10-2 0v3a1 1 0 002 0V8zm-1-4a1 1 0 100 2 1 1 0 000-2z" />
                                          </svg>
                                          {detail.modified}
                                        </div>
                                      </td>
                                      <td className="bg-[#f9fafb] px-3 py-3 overflow-visible">
                                        <div className="flex items-center justify-center">
                                          <div className="inline-flex items-center justify-center min-w-[24px] h-6 bg-[#1D77BD] text-white rounded-full text-xs font-semibold px-1.5 hover:bg-[#1564cc] hover:scale-105 transition-all">
                                            {detail.unreadCount}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="bg-[#f9fafb] overflow-visible" style={{ padding: "12px", fontSize: "13px" }}>
                                        <div className="flex items-center" style={{ gap: "8px" }}>
                                          <div 
                                            className="rounded-full bg-[#EBFCF4] flex items-center justify-center cursor-pointer hover:-translate-y-0.5 hover:bg-[#D7F7E9] transition-all relative group"
                                            style={{ width: "28px", height: "28px" }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedFieldHistory({ monitorId: monitor.id, fieldName: detail.field });
                                              setFieldHistoryModalOpen(true);
                                            }}
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="text-[#016853]" style={{ width: "14px", height: "14px" }}>
                                              <path
                                                fill="currentColor"
                                                d="M17.1282 5.53408C15.6009 4.20127 13.6364 3.47739 11.6095 3.50054C9.58258 3.52369 7.63513 4.29225 6.1387 5.6596C4.64227 7.02694 3.70161 8.89735 3.4962 10.914C3.45422 11.326 3.08614 11.6261 2.67405 11.5841C2.26197 11.5421 1.96194 11.174 2.00392 10.762C2.24668 8.37868 3.35837 6.1682 5.12688 4.55225C6.89539 2.9363 9.19692 2.028 11.5924 2.00064C13.9878 1.97328 16.3095 2.82877 18.1145 4.40391C19.9194 5.97904 21.0813 8.16356 21.3784 10.5407C21.6756 12.9178 21.0872 15.3211 19.7255 17.292C18.3638 19.263 16.3241 20.6637 13.9956 21.2268C11.6672 21.7899 9.21286 21.4761 7.101 20.3452C5.62665 19.5557 4.39125 18.4065 3.50006 17.019V19.838C3.50006 20.2522 3.16427 20.588 2.75006 20.588C2.33584 20.588 2.00006 20.2522 2.00006 19.838V14.838C2.00006 14.4237 2.33584 14.088 2.75006 14.088H3.23256C3.24421 14.0877 3.25584 14.0877 3.26743 14.088H7.75006C8.16427 14.088 8.50006 14.4237 8.50006 14.838C8.50006 15.2522 8.16427 15.588 7.75006 15.588H4.40079C5.1641 17.0404 6.34792 18.2404 7.80911 19.0229C9.59607 19.9798 11.6728 20.2453 13.643 19.7688C15.6133 19.2923 17.3392 18.1072 18.4914 16.4394C19.6436 14.7717 20.1414 12.7381 19.89 10.7267C19.6386 8.71532 18.6555 6.86688 17.1282 5.53408ZM11.7003 7.08789C12.1145 7.08789 12.4503 7.42368 12.4503 7.83789V11.5272L14.2306 13.3076C14.5235 13.6005 14.5235 14.0753 14.2306 14.3682C13.9377 14.6611 13.4628 14.6611 13.1699 14.3682L11.1699 12.3682C11.0293 12.2276 10.9503 12.0368 10.9503 11.8379V7.83789C10.9503 7.42368 11.286 7.08789 11.7003 7.08789Z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                              />
                                            </svg>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-[#1B1B1B] text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none z-10" style={{ fontSize: "11px" }}>
                                              View History
                                            </div>
                                          </div>
                                          <div className="rounded-full bg-[#EBFCF4] flex items-center justify-center cursor-pointer hover:-translate-y-0.5 hover:bg-[#D7F7E9] transition-all relative group" style={{ width: "28px", height: "28px" }}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#016853]" style={{ width: "14px", height: "14px" }}>
                                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-[#1B1B1B] text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none z-10" style={{ fontSize: "11px" }}>
                                              Modify/Edit
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                         </tr>
                       )}
                     </Fragment>
                   );
                 })
                )}
               </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-5 right-5 bg-[#089E68] text-white px-5 py-3 rounded-lg text-sm z-50 transition-all ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
        }`}
      >
        Copied to clipboard!
      </div>

      {/* Click outside handler for dropdowns and tooltips */}
      {(openDropdown || showFieldsTooltip) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => {
            setOpenDropdown(null);
            setShowFieldsTooltip(null);
          }} 
        />
      )}

      {/* Dropdown Portal */}
      {monitors.map((monitor) => (
        <DropdownPortal
          key={`portal-${monitor.id}`}
          isOpen={openDropdown === `options-${monitor.id}`}
          buttonRef={getButtonRef(`options-${monitor.id}`)}
        >
          {/* View History */}
          <div
            className="flex items-center px-3.5 py-2.5 rounded-lg cursor-pointer transition-all"
            style={{ color: 'var(--text-default)' }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFieldHistory({ monitorId: monitor.id, fieldName: monitor.name });
              setFieldHistoryModalOpen(true);
              toggleDropdown(`options-${monitor.id}`);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F6F8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div className="w-[18px] h-[18px] mr-3 flex items-center justify-center" style={{ color: 'var(--subtle-text)' }}>
              <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-full h-full">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="text-sm font-medium flex-grow" style={{ color: 'var(--text-default)' }}>View History</span>
          </div>

          {/* Edit Monitor */}
          <div
            className="flex items-center px-3.5 py-2.5 rounded-lg cursor-pointer transition-all"
            style={{ color: 'var(--text-default)' }}
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Open edit monitor modal
              toggleDropdown(`options-${monitor.id}`);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F6F8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div className="w-[18px] h-[18px] mr-3 flex items-center justify-center" style={{ color: 'var(--subtle-text)' }}>
              <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-full h-full">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            </div>
            <span className="text-sm font-medium flex-grow" style={{ color: 'var(--text-default)' }}>Edit Monitor</span>
          </div>

          {/* Pause/Resume Monitor */}
          <div
            className="flex items-center px-3.5 py-2.5 rounded-lg cursor-pointer transition-all"
            style={{ color: 'var(--text-default)' }}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleStatus(monitor.id);
              toggleDropdown(`options-${monitor.id}`);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F6F8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div className="w-[18px] h-[18px] mr-3 flex items-center justify-center" style={{ color: 'var(--subtle-text)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
            </div>
            <span className="text-sm font-medium flex-grow" style={{ color: 'var(--text-default)' }}>{monitor.isActive ? 'Pause Monitor' : 'Resume Monitor'}</span>
          </div>

          {/* Export */}
          <div
            className="flex items-center px-3.5 py-2.5 rounded-lg cursor-pointer transition-all"
            style={{ color: 'var(--text-default)' }}
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Export monitor
              toggleDropdown(`options-${monitor.id}`);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F6F8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div className="w-[18px] h-[18px] mr-3 flex items-center justify-center" style={{ color: 'var(--subtle-text)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            </div>
            <span className="text-sm font-medium flex-grow" style={{ color: 'var(--text-default)' }}>Export</span>
          </div>

          {/* Divider */}
          <div className="h-px my-1.5 mx-2" style={{ backgroundColor: '#E1E7EE' }} />

          {/* Delete */}
          <div
            className="flex items-center px-3.5 py-2.5 rounded-lg cursor-pointer transition-all"
            style={{ color: 'var(--text-default)' }}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteMonitor(monitor.id);
              toggleDropdown(`options-${monitor.id}`);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFF1F0';
              const icon = e.currentTarget.querySelector('div');
              const text = e.currentTarget.querySelector('span');
              if (icon) icon.style.color = '#CF1322';
              if (text) text.style.color = '#CF1322';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              const icon = e.currentTarget.querySelector('div');
              const text = e.currentTarget.querySelector('span');
              if (icon) icon.style.color = 'var(--subtle-text)';
              if (text) text.style.color = 'var(--text-default)';
            }}
          >
            <div className="w-[18px] h-[18px] mr-3 flex items-center justify-center" style={{ color: 'var(--subtle-text)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            </div>
            <span className="text-sm font-medium flex-grow" style={{ color: 'var(--text-default)' }}>Delete</span>
          </div>
        </DropdownPortal>
      ))}

      {/* New Monitor Modal */}
      <NewMonitorModal
        isOpen={isNewMonitorModalOpen}
        onClose={() => setIsNewMonitorModalOpen(false)}
      />

      {/* Field History Modal */}
      {selectedFieldHistory && (() => {
        const monitor = monitors.find(m => m.id === selectedFieldHistory.monitorId);
        const isPageHistory = selectedFieldHistory.fieldName === monitor?.name;
        
        if (isPageHistory && monitor) {
          return (
            <PageHistoryModal
              isOpen={fieldHistoryModalOpen}
              onClose={() => {
                setFieldHistoryModalOpen(false);
                setSelectedFieldHistory(null);
              }}
              monitorId={selectedFieldHistory.monitorId}
              itemImage={monitor.item.image}
              itemTitle={monitor.item.title}
            />
          );
        }
        
        return (
          <FieldHistoryModal
            isOpen={fieldHistoryModalOpen}
            onClose={() => {
              setFieldHistoryModalOpen(false);
              setSelectedFieldHistory(null);
            }}
            fieldName={selectedFieldHistory.fieldName}
            monitorId={selectedFieldHistory.monitorId}
            monitorName={monitor?.name}
            onViewMonitorHistory={() => {
              // Close field history modal and open monitor history (using same modal for monitor)
              setFieldHistoryModalOpen(false);
              // Open monitor history - reuse FieldHistoryModal but for the entire monitor
              const monitor = monitors.find(m => m.id === selectedFieldHistory.monitorId);
              setSelectedFieldHistory({ 
                monitorId: selectedFieldHistory.monitorId, 
                fieldName: monitor?.name || 'Monitor' // Use monitor name for full monitor history
              });
              setFieldHistoryModalOpen(true);
            }}
          />
        );
      })()}
    </div>
  );
}

