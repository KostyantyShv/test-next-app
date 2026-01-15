'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface FieldHistoryChange {
  id: string;
  date: string;
  fullDate?: string;
  prev: string;
  new: string;
  mag: string;
  alert: boolean;
}

interface FieldHistoryStats {
  totalChanges: number;
  netChange: string;
  alertsTriggered: number;
  lastAlert: string;
}

interface FieldHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldName: string;
  monitorId: string;
  monitorName?: string;
  historyData?: {
    changes: FieldHistoryChange[];
    stats: FieldHistoryStats;
  };
  onViewMonitorHistory?: () => void;
}

export default function FieldHistoryModal({
  isOpen,
  onClose,
  fieldName,
  monitorId,
  monitorName,
  historyData,
  onViewMonitorHistory
}: FieldHistoryModalProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [alertsOnly, setAlertsOnly] = useState(false);
  const [dateFilter, setDateFilter] = useState('All Time');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [copyToastMessage, setCopyToastMessage] = useState('');
  const dateDropdownRef = useRef<HTMLDivElement>(null);

  // Mock data if not provided
  const defaultHistoryData = {
    changes: [
      { id: 'CHG-49182Z', date: '5 min ago', fullDate: 'Friday, December 25, 2025 at 4:33:16 PM', prev: '$39.99', new: '$29.99', mag: '-$10.00 (25%)', alert: true },
      { id: 'CHG-49033X', date: '1 day ago', fullDate: 'Thursday, December 24, 2025 at 3:05:18 PM', prev: '$39.50', new: '$39.99', mag: '+$0.49 (1.2%)', alert: false },
      { id: 'CHG-48945B', date: '2 days ago', fullDate: 'Wednesday, December 23, 2025 at 2:41:05 PM', prev: '$41.99', new: '$39.50', mag: '-$2.49 (5.9%)', alert: true },
      { id: 'CHG-48720K', date: '3 days ago', fullDate: 'Tuesday, December 22, 2025 at 9:15:10 AM', prev: '$40.99', new: '$41.99', mag: '+$1.00 (2.4%)', alert: false },
      { id: 'CHG-48456M', date: '4 days ago', fullDate: 'Monday, December 21, 2025 at 6:22:34 PM', prev: '$42.99', new: '$40.99', mag: '-$2.00 (4.7%)', alert: true },
      { id: 'CHG-48223P', date: '5 days ago', fullDate: 'Sunday, December 20, 2025 at 11:45:12 AM', prev: '$44.99', new: '$42.99', mag: '-$2.00 (4.4%)', alert: false },
    ],
    stats: {
      totalChanges: 128,
      netChange: '-$10.00',
      alertsTriggered: 15,
      lastAlert: '5 min ago'
    }
  };

  const data = historyData || defaultHistoryData;

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(e.target as Node)) {
        setShowDateDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleSelectAll = () => {
    if (selectedRows.size === filteredChanges.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredChanges.map(c => c.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const filteredChanges = data.changes.filter(change => {
    const matchesSearch = !searchQuery || 
      change.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.prev.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.new.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAlerts = !alertsOnly || change.alert;
    return matchesSearch && matchesAlerts;
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyToastMessage('Copied to clipboard!');
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2500);
    } catch (err) {
      setCopyToastMessage('Copy failed!');
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2500);
    }
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (!isOpen || typeof window === 'undefined') return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[2500] transition-all duration-300 flex items-center justify-center"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden'
        }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl shadow-lg w-[95%] max-w-[1200px] max-h-[90vh] flex flex-col transform transition-transform duration-300"
          style={{
            transform: isOpen ? 'scale(1)' : 'scale(0.95)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b flex-shrink-0" style={{ borderBottomColor: 'var(--border-color)' }}>
            <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--header-green)' }}>
              History for <span className="px-2.5 py-1 rounded-md font-semibold text-sm" style={{ backgroundColor: 'var(--apply-button-bg)', color: 'var(--header-green)' }}>{fieldName.toLowerCase()}</span>
            </h2>
            <div className="flex items-center gap-2">
              {onViewMonitorHistory && (
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--surface-color)',
                    color: 'var(--text-default)',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewMonitorHistory();
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                  }}
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View History
                </button>
              )}
              <button
                className="w-8 h-8 rounded-md flex items-center justify-center transition-colors"
                style={{ color: 'var(--subtle-text)' }}
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4.5 h-4.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 shadow-sm flex items-center border" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" style={{ color: 'var(--header-green)' }}>
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Total Changes</h3>
                  <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{formatNumber(data.stats.totalChanges)}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm flex items-center border" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" style={{ color: 'var(--header-green)' }}>
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Net Change</h3>
                  <div 
                    className="text-xl font-semibold" 
                    style={{ 
                      color: data.stats.netChange.trim().startsWith('-') 
                        ? '#D92D20' 
                        : data.stats.netChange.trim().startsWith('+') 
                        ? 'var(--success-green)' 
                        : 'var(--bold-text)' 
                    }}
                  >
                    {data.stats.netChange}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm flex items-center border" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" style={{ color: 'var(--header-green)' }}>
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Alerts Triggered</h3>
                  <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{formatNumber(data.stats.alertsTriggered)}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm flex items-center border" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" style={{ color: 'var(--header-green)' }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Last Alert</h3>
                  <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{data.stats.lastAlert}</div>
                </div>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 pb-5 mb-5 border-b" style={{ borderBottomColor: 'var(--border-color)' }}>
              <div className="relative w-full md:w-80">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search values, change IDs..."
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
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--active-green)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(11, 99, 51, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div className="flex gap-3 items-center justify-end md:justify-start">
                <div className="relative" ref={dateDropdownRef}>
                  <button
                    onClick={() => setShowDateDropdown(!showDateDropdown)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-default)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {dateFilter}
                  </button>
                  {showDateDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg min-w-[180px] z-50 p-2 border" style={{ borderColor: 'var(--border-color)' }}>
                      {['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'].map((option) => (
                        <div
                          key={option}
                          className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-md cursor-pointer transition-colors"
                          style={{ color: 'var(--text-default)' }}
                          onClick={() => {
                            setDateFilter(option);
                            setShowDateDropdown(false);
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-default)' }}>Alerts Only</span>
                  <div
                    className="relative w-11 h-6 rounded-full cursor-pointer transition-colors"
                    style={{
                      backgroundColor: alertsOnly ? 'var(--success-green)' : 'var(--gray-300)'
                    }}
                    onClick={() => setAlertsOnly(!alertsOnly)}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform"
                      style={{
                        transform: alertsOnly ? 'translateX(20px)' : 'translateX(2px)',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: 'var(--gray-100)' }}>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '5%' }}>
                      <div
                        className="w-[18px] h-[18px] border-2 rounded cursor-pointer transition-all relative"
                        style={{
                          backgroundColor: selectedRows.size === filteredChanges.length && filteredChanges.length > 0 ? 'var(--active-green)' : 'white',
                          borderColor: selectedRows.size === filteredChanges.length && filteredChanges.length > 0 ? 'var(--active-green)' : 'var(--border-color)'
                        }}
                        onClick={toggleSelectAll}
                      >
                        {selectedRows.size === filteredChanges.length && filteredChanges.length > 0 && (
                          <div className="absolute left-[4px] top-[1px] w-[5px] h-[10px] border-white border-r-2 border-b-2 rotate-45" />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '12%' }}>Change ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '15%' }}>Date & Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '20%' }}>Previous Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '20%' }}>New Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '18%' }}>Magnitude</th>
                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '10%' }}>Alert Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChanges.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center" style={{ color: 'var(--subtle-text)', fontStyle: 'italic' }}>
                        No changes found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredChanges.map((change, idx) => {
                      const magClass = change.mag.startsWith('+') ? 'increase' : change.mag.startsWith('-') ? 'decrease' : 'neutral';
                      return (
                        <tr
                          key={change.id}
                          className={idx % 2 === 0 ? '' : ''}
                          style={{
                            backgroundColor: idx % 2 === 0 ? 'white' : 'rgba(248, 249, 250, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = idx % 2 === 0 ? 'white' : 'rgba(248, 249, 250, 0.3)';
                          }}
                        >
                          <td className="px-4 py-4">
                            <div
                              className="w-[18px] h-[18px] border-2 rounded cursor-pointer transition-all relative"
                              style={{
                                backgroundColor: selectedRows.has(change.id) ? 'var(--active-green)' : 'white',
                                borderColor: selectedRows.has(change.id) ? 'var(--active-green)' : 'var(--border-color)'
                              }}
                              onClick={() => toggleSelectRow(change.id)}
                            >
                              {selectedRows.has(change.id) && (
                                <div className="absolute left-[4px] top-[1px] w-[5px] h-[10px] border-white border-r-2 border-b-2 rotate-45" />
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="font-mono text-sm" style={{ color: 'var(--subtle-text)' }}>{change.id}</span>
                          </td>
                          <td
                            className="px-4 py-4 cursor-pointer relative group"
                            style={{ color: 'var(--text-default)' }}
                            onClick={() => change.fullDate && copyToClipboard(change.fullDate)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--link-text)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--text-default)';
                            }}
                          >
                            {change.date}
                            {change.fullDate && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1B1B1B] text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none z-50">
                                {change.fullDate}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1B1B1B]"></div>
                              </div>
                            )}
                          </td>
                          <td
                            className="px-4 py-4 cursor-pointer"
                            onClick={() => copyToClipboard(change.prev)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--link-text)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--text-default)';
                            }}
                          >
                            <span className="font-mono text-sm inline-block max-w-[150px] truncate" style={{ color: 'var(--subtle-text)' }}>{change.prev}</span>
                          </td>
                          <td
                            className="px-4 py-4 cursor-pointer"
                            onClick={() => copyToClipboard(change.new)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--link-text)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--text-default)';
                            }}
                          >
                            <span className="font-mono text-sm inline-block max-w-[150px] truncate" style={{ color: 'var(--subtle-text)' }}>{change.new}</span>
                          </td>
                          <td className="px-4 py-4 relative group">
                            <span
                              className="font-semibold text-[13px] px-2.5 py-1 rounded-md inline-block"
                              style={{
                                color: magClass === 'increase' ? 'var(--success-green)' : magClass === 'decrease' ? '#D92D20' : 'var(--subtle-text)',
                                backgroundColor: magClass === 'increase' ? 'var(--apply-button-bg)' : magClass === 'decrease' ? '#fef2f2' : 'var(--gray-100)'
                              }}
                            >
                              {change.mag}
                            </span>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1B1B1B] text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none z-50">
                              {`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} ${change.mag}`}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1B1B1B]"></div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            {change.alert && (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mx-auto" style={{ color: 'var(--success-green)' }}>
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                              </svg>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t flex justify-end gap-3 flex-shrink-0" style={{ borderTopColor: 'var(--border-color)', backgroundColor: 'var(--gray-100)' }}>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'white',
                color: 'var(--text-default)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Selected
            </button>
            <button
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: 'var(--header-green)' }}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--active-green)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--header-green)';
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {/* Copy Toast */}
      {showCopyToast && (
        <div
          className="fixed bottom-5 right-5 px-5 py-3 rounded-lg text-sm font-medium text-white z-[3000] flex items-center gap-2.5 shadow-lg transition-all"
          style={{
            backgroundColor: 'var(--success-green)',
            opacity: showCopyToast ? 1 : 0,
            transform: showCopyToast ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          {copyToastMessage}
        </div>
      )}
    </>,
    document.body
  );
}

