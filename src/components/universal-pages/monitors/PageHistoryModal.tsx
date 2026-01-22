'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { mockPageHistoryData } from '@/mocks/monitors';

interface PageHistoryChange {
  id: string;
  date: string;
  fullDate?: string;
  field: string;
  prev: string;
  new: string;
  mag: string;
  alert: boolean;
}

interface PageHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  monitorId: string;
  itemImage: string;
  itemTitle: string;
  historyData?: {
    changes: PageHistoryChange[];
    stats: Array<{
      label: string;
      value: string;
    }>;
  };
}

export default function PageHistoryModal({
  isOpen,
  onClose,
  monitorId,
  itemImage,
  itemTitle,
  historyData
}: PageHistoryModalProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [alertsOnly, setAlertsOnly] = useState(false);
  const [dateFilter, setDateFilter] = useState('All Time');
  const [fieldFilter, setFieldFilter] = useState('All Fields');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showFieldDropdown, setShowFieldDropdown] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const fieldDropdownRef = useRef<HTMLDivElement>(null);

  const pageData = historyData || mockPageHistoryData[monitorId] || {
    changes: [],
    stats: [
      { label: 'Total Changes', value: '0' },
      { label: 'Alerts Triggered', value: '0' },
      { label: 'Most Active Field', value: '-' },
      { label: 'Last Alert', value: '-' }
    ]
  };

  const allFields = ['All Fields', ...new Set(pageData.changes.map(c => c.field))];

  const filteredChanges = pageData.changes.filter(change => {
    const matchesSearch = !searchQuery ||
      change.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.prev.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.new.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAlerts = !alertsOnly || change.alert;
    const matchesField = fieldFilter === 'All Fields' || change.field === fieldFilter;
    return matchesSearch && matchesAlerts && matchesField;
  });

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
      if (fieldDropdownRef.current && !fieldDropdownRef.current.contains(e.target as Node)) {
        setShowFieldDropdown(false);
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getStatsValue = (label: string) => {
    const stat = pageData.stats.find(s => s.label === label);
    return stat?.value || '0';
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
          <div className="flex justify-between items-center px-6 py-5 border-b flex-shrink-0" style={{ borderBottomColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-3">
              <Image
                src={itemImage}
                alt={itemTitle}
                width={80}
                height={40}
                className="rounded-md object-cover"
                style={{ width: '80px', height: '40px' }}
              />
              <h1 className="text-2xl font-medium" style={{ color: 'var(--text-default)' }}>{itemTitle}</h1>
            </div>
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

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
              <div className="bg-white rounded-xl p-5 shadow-sm flex items-center border" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Total Changes</h3>
                  <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{getStatsValue('Total Changes')}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm flex items-center border" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Alerts Triggered</h3>
                  <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{getStatsValue('Alerts Triggered')}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm flex items-center border" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Most Active Field</h3>
                  <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{getStatsValue('Most Active Field')}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm flex items-center border" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--apply-button-bg)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--subtle-text)' }}>Last Alert</h3>
                  <div className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>{getStatsValue('Last Alert')}</div>
                </div>
              </div>
            </div>

            {/* Filters Row */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border mb-6" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 p-5 border-b" style={{ borderBottomColor: 'var(--border-color)' }}>
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm font-medium focus:outline-none"
                    style={{
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-default)',
                      backgroundColor: 'white',
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
                  <div className="relative" ref={fieldDropdownRef}>
                    <button
                      onClick={() => {
                        setShowFieldDropdown(!showFieldDropdown);
                        setShowDateDropdown(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: 'var(--subtle-text)' }}>
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                      {fieldFilter}
                    </button>
                    {showFieldDropdown && (
                      <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg min-w-[180px] z-50 p-2 border" style={{ borderColor: 'var(--border-color)' }}>
                        {allFields.map((field) => (
                          <div
                            key={field}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-md cursor-pointer transition-colors"
                            style={{ color: 'var(--text-default)' }}
                            onClick={() => {
                              setFieldFilter(field);
                              setShowFieldDropdown(false);
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            {field}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={dateDropdownRef}>
                    <button
                      onClick={() => {
                        setShowDateDropdown(!showDateDropdown);
                        setShowFieldDropdown(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
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

                  <div className="flex items-center gap-3 px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'white' }}>
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
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: 'var(--header-bg)' }}>
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
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '13%' }}>Date & Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '10%' }}>Field</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '20%' }}>Previous Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '20%' }}>New Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '12%' }}>Magnitude</th>
                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--subtle-text)', width: '8%' }}>Alert Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChanges.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center" style={{ color: 'var(--subtle-text)', fontStyle: 'italic', backgroundColor: 'white' }}>
                        No changes found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredChanges.map((change, idx) => {
                      const magClass = change.mag.startsWith('+') ? 'increase' : change.mag.startsWith('-') ? 'decrease' : 'neutral';
                      return (
                        <tr
                          key={change.id}
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
                            <span className="text-sm" style={{ color: 'var(--subtle-text)', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif" }}>{change.id}</span>
                          </td>
                          <td
                            className="px-4 py-4 cursor-pointer relative group"
                            style={{ color: 'var(--text-default)', fontSize: '14px' }}
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
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--bold-text)', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif" }}>
                              {change.field}
                            </span>
                          </td>
                          <td
                            className="px-4 py-4 cursor-pointer"
                            onClick={() => copyToClipboard(change.prev)}
                            onMouseEnter={(e) => {
                              const span = e.currentTarget.querySelector('span');
                              if (span) span.style.color = 'var(--link-text)';
                            }}
                            onMouseLeave={(e) => {
                              const span = e.currentTarget.querySelector('span');
                              if (span) span.style.color = 'var(--text-default)';
                            }}
                          >
                            <span className="text-sm inline-block max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: 'var(--text-default)', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif", verticalAlign: 'middle' }}>
                              {change.prev}
                            </span>
                          </td>
                          <td
                            className="px-4 py-4 cursor-pointer"
                            onClick={() => copyToClipboard(change.new)}
                            onMouseEnter={(e) => {
                              const span = e.currentTarget.querySelector('span');
                              if (span) span.style.color = 'var(--link-text)';
                            }}
                            onMouseLeave={(e) => {
                              const span = e.currentTarget.querySelector('span');
                              if (span) span.style.color = 'var(--text-default)';
                            }}
                          >
                            <span className="text-sm inline-block max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: 'var(--text-default)', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif", verticalAlign: 'middle' }}>
                              {change.new}
                            </span>
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
          Copied to clipboard!
        </div>
      )}
    </>,
    document.body
  );
}

