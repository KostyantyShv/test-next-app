'use client';

import { Fragment, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMonitors, type Monitor, type MonitorDetail } from '@/hooks/useMonitors.hook';
import NewMonitorModal from './NewMonitorModal';


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
    top: buttonRect.bottom + 8,
    left: buttonRect.right - 180, // min-width is 180px
    zIndex: 1000,
  };

  return createPortal(
    <div style={style} className="bg-white rounded-lg shadow-lg min-w-[180px] p-2 border border-[#eaeaea]">
      {children}
    </div>,
    document.body
  );
}

export default function Monitors() {
  const { monitors, loading, error, toggleMonitorStatus, deleteMonitor } = useMonitors();
  const [selectedMonitors, setSelectedMonitors] = useState<Set<string>>(new Set());
  const [expandedMonitor, setExpandedMonitor] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [buttonRefs, setButtonRefs] = useState<Record<string, React.RefObject<HTMLButtonElement | null>>>({});
  const [isNewMonitorModalOpen, setIsNewMonitorModalOpen] = useState(false);

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength - 2) + '..' : text;
  };

  const getVisibleFields = (fields: string[]) => {
    const visible = fields.slice(0, 1);
    const hidden = fields.length - visible.length;
    return { visible, hidden };
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="w-full max-w-[1400px] mx-auto max-md:max-w-[390px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#464646]">Monitors</h1>
          <button 
            onClick={() => setIsNewMonitorModalOpen(true)}
            className="px-5 py-2.5 rounded-lg text-sm font-medium border border-[#0B6333] bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9] transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-4 h-4">
              <path fill="currentColor" d="M9 4H7V7H4V9H7V12H9V9H12V7H9V4Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
            New Monitor
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center">
            <div className="w-12 h-12 rounded-full bg-[#EBFCF4] flex items-center justify-center mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-[#016853]">
                <path d="M12 2C6.579 2 2 6.58 2 12s4.579 10 10 10 10-4.58 10-10S17.421 2 12 2zm0 18c-4.337 0-8-3.664-8-8 0-3.998 3.115-7.417 7-7.927V6.09C8.167 6.569 6 9.033 6 12c0 3.309 2.691 6 6 6 1.595 0 3.1-.626 4.237-1.763l-1.414-1.415A3.97 3.97 0 0 1 12 16c-2.206 0-4-1.794-4-4 0-1.858 1.279-3.411 3-3.858v2.146c-.59.353-1 .993-1 1.712 0 1.081.919 2 2 2s2-.919 2-2c0-.719-.41-1.359-1-1.712V4.073c3.885.51 7 3.929 7 7.927 0 4.336-3.663 8-8 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm text-[#5F5F5F] font-medium mb-1">Total Monitors</h3>
              <div className="text-xl font-semibold text-[#464646]">{monitors.length}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center">
            <div className="w-12 h-12 rounded-full bg-[#EBFCF4] flex items-center justify-center mr-4 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#016853]">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm text-[#5F5F5F] font-medium mb-1">Active</h3>
              <div className="text-xl font-semibold text-[#464646]">{monitors.filter(m => m.isActive).length}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center">
            <div className="w-12 h-12 rounded-full bg-[#EBFCF4] flex items-center justify-center mr-4 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#016853]">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm text-[#5F5F5F] font-medium mb-1">Unread Changes</h3>
              <div className="text-xl font-semibold text-[#464646]">{monitors.reduce((sum, m) => sum + m.unreadCount, 0)}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center">
            <div className="w-12 h-12 rounded-full bg-[#EBFCF4] flex items-center justify-center mr-4 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#016853]">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm text-[#5F5F5F] font-medium mb-1">Issues</h3>
              <div className="text-xl font-semibold text-[#464646]">{monitors.filter(m => !m.isActive).length}</div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
           {/* Filters Row */}
           <div className="flex justify-between items-center p-4 border-b border-[#eaeaea] overflow-visible max-md:flex-col max-md:items-stretch max-md:gap-3">
             <div className="relative w-full md:w-80 overflow-visible">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F5F5F]">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search monitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#eaeaea] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#016853]/20"
              />
            </div>

            <div className="flex gap-3 overflow-visible flex-wrap md:flex-nowrap">
              {/* Sort Dropdown */}
              <div className="relative overflow-visible">
                <button
                  onClick={() => toggleDropdown('sort')}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-[#eaeaea] bg-white text-[#4A4A4A] hover:bg-[#f9fafb] transition-colors flex items-center gap-2 relative overflow-visible"
                >
                  <svg viewBox="0 0 16 16" strokeLinejoin="round" fill="currentColor" className="w-4 h-4 text-[#5F5F5F]">
                    <path d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z" />
                  </svg>
                  Sort
                </button>
                {openDropdown === 'sort' && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg min-w-[180px] z-10 p-2 border border-[#eaeaea]">
                    <a href="#" className="block px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">Name (A-Z)</a>
                    <a href="#" className="block px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">Name (Z-A)</a>
                    <a href="#" className="block px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">Last Modified</a>
                    <a href="#" className="block px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">Most Active</a>
                    <a href="#" className="block px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">Status</a>
                  </div>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="relative overflow-visible">
                <button
                  onClick={() => toggleDropdown('status')}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-[#eaeaea] bg-white text-[#4A4A4A] hover:bg-[#f9fafb] transition-colors flex items-center gap-2 relative overflow-visible"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[#5F5F5F]">
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
                  </svg>
                  Status
                </button>
                {openDropdown === 'status' && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg min-w-[180px] z-10 p-2 border border-[#eaeaea]">
                    <a href="#" className="block px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">All</a>
                    <a href="#" className="block px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">Active</a>
                    <a href="#" className="block px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">Paused</a>
                    <a href="#" className="block px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">Error</a>
                  </div>
                )}
              </div>

              {/* Bulk Actions Dropdown */}
              <div className="relative overflow-visible">
                <button
                  onClick={() => toggleDropdown('bulk')}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-[#eaeaea] bg-white text-[#4A4A4A] hover:bg-[#f9fafb] transition-colors relative overflow-visible"
                >
                  Bulk Actions
                </button>
                {openDropdown === 'bulk' && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg min-w-[180px] z-10 p-2 border border-[#eaeaea]">
                    <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5F5F5F]">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      Pause Selected
                    </a>
                    <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5F5F5F]">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Resume Selected
                    </a>
                    <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5F5F5F]">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Export Selected
                    </a>
                    <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-white hover:text-white hover:bg-[#ff4d4f] rounded-md transition-colors">
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
                  <th className="bg-[#f8f9fa] px-4 py-3 text-left overflow-visible">
                    <div
                      onClick={toggleSelectAll}
                      className={`w-[18px] h-[18px] border-2 rounded cursor-pointer transition-all ${
                        monitors.length > 0 && selectedMonitors.size === monitors.length
                          ? 'bg-[#0B6333] border-[#0B6333]'
                          : 'bg-white border-[#eaeaea]'
                      } relative`}
                    >
                      {monitors.length > 0 && selectedMonitors.size === monitors.length && (
                        <div className="absolute left-[4px] top-[1px] w-[5px] h-[10px] border-white border-r-2 border-b-2 rotate-45" />
                      )}
                    </div>
                  </th>
                  <th className="bg-[#f8f9fa] px-4 py-3 overflow-visible"></th>
                  <th className="bg-[#f8f9fa] px-4 py-3 text-left text-xs font-medium text-[#5F5F5F] uppercase tracking-wider overflow-visible">Name</th>
                  <th className="bg-[#f8f9fa] px-4 py-3 text-left text-xs font-medium text-[#5F5F5F] uppercase tracking-wider overflow-visible">Item</th>
                  <th className="bg-[#f8f9fa] px-4 py-3 text-left text-xs font-medium text-[#5F5F5F] uppercase tracking-wider overflow-visible">Country</th>
                  <th className="bg-[#f8f9fa] px-4 py-3 text-left text-xs font-medium text-[#5F5F5F] uppercase tracking-wider overflow-visible">Interval</th>
                  <th className="bg-[#f8f9fa] px-4 py-3 text-left text-xs font-medium text-[#5F5F5F] uppercase tracking-wider overflow-visible">Last</th>
                  <th className="bg-[#f8f9fa] px-4 py-3 text-left text-xs font-medium text-[#5F5F5F] uppercase tracking-wider overflow-visible">Fields</th>
                  <th className="bg-[#f8f9fa] px-4 py-3 text-left text-xs font-medium text-[#5F5F5F] uppercase tracking-wider overflow-visible">Usage</th>
                  <th className="bg-[#f8f9fa] px-4 py-3 text-left text-xs font-medium text-[#5F5F5F] uppercase tracking-wider overflow-visible">Status</th>
                  <th className="bg-[#f8f9fa] px-4 py-3 text-left text-xs font-medium text-[#5F5F5F] uppercase tracking-wider overflow-visible">Alerts</th>
                  <th className="bg-[#f8f9fa] px-4 py-3 overflow-visible"></th>
                </tr>
              </thead>
              <tbody className="overflow-visible">
                {loading ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center text-[#5F5F5F]">
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
                    <td colSpan={12} className="px-4 py-8 text-center text-[#5F5F5F]">
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
                         className={`hover:bg-[#f9fafb] transition-colors border-b border-[#eaeaea] relative overflow-visible ${
                           isExpanded ? 'bg-[#f9fafb]' : ''
                         }`}
                       >
                        <td className="px-4 py-4 overflow-visible">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelectMonitor(monitor.id);
                            }}
                            className={`w-[18px] h-[18px] border-2 rounded cursor-pointer transition-all ${
                              selectedMonitors.has(monitor.id)
                                ? 'bg-[#0B6333] border-[#0B6333]'
                                : 'bg-white border-[#eaeaea]'
                            } relative`}
                          >
                            {selectedMonitors.has(monitor.id) && (
                              <div className="absolute left-[4px] top-[1px] w-[5px] h-[10px] border-white border-r-2 border-b-2 rotate-45" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 overflow-visible">
                          <button
                            onClick={() => toggleExpand(monitor.id)}
                            className="w-8 h-8 rounded-md bg-[#F1F3F6] hover:bg-[#e5e7eb] flex items-center justify-center transition-colors"
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
                         <td className="px-3 py-3 overflow-visible">
                           <div className="font-semibold text-[#464646] text-[15px] max-w-[150px] truncate" title={monitor.name}>
                             {truncateText(monitor.name, 20)}
                           </div>
                         </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
                              <img src={monitor.item.image} alt={monitor.item.title} className="w-full h-full object-cover" />
                            </div>
                             <div className="flex flex-col overflow-hidden">
                               <div className="font-semibold text-[#464646] text-sm max-w-[180px] truncate" title={monitor.item.title}>
                                 {monitor.item.title}
                               </div>
                               <div className="text-xs text-[#5F5F5F] truncate">{monitor.item.id}</div>
                             </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="relative group cursor-help">
                            <img src={monitor.country.flag} alt={monitor.country.code} className="w-6 h-[18px] rounded-sm object-cover" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1B1B1B] text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none">
                              Site: {monitor.country.site}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-xl text-xs font-medium bg-[#EBFCF4] text-[#016853]">
                            {monitor.interval}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="relative group cursor-help text-[#4A4A4A]">
                            {monitor.lastCheck}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-[#1B1B1B] text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-pre-line pointer-events-none leading-relaxed">
                              {monitor.lastCheckTooltip}
                            </div>
                          </div>
                        </td>
                         <td className="px-3 py-3 overflow-visible">
                           <div className="flex items-center gap-1.5 max-w-[100px] relative group cursor-pointer">
                            {visibleFields.map((field) => (
                              <span key={field} className="inline-flex items-center px-2 py-0.5 rounded-xl text-[11px] font-medium bg-[#f3f4f6] text-[#374151]">
                                {field}
                              </span>
                            ))}
                            {hiddenFieldsCount > 0 && (
                              <>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-xl text-[11px] font-medium bg-[#1D77BD] text-white hover:bg-[#1564cc] transition-colors">
                                  +{hiddenFieldsCount}
                                </span>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-4 bg-[#1B1B1B] text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[200px] max-w-[300px] pointer-events-none shadow-lg z-20">
                                  <div className="flex flex-col gap-2">
                                    {monitor.fields.map((field) => (
                                      <span key={field} className="inline-flex items-center px-2 py-1 rounded-xl text-[11px] font-medium bg-[#f3f4f6] text-[#374151]">
                                        {field}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                         <td className="px-3 py-3 overflow-visible">
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
                         <td className="px-3 py-3 overflow-visible">
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
                         <td className="px-3 py-3 overflow-visible">
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
                               className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
                             >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-[#5F5F5F]">
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                            </button>
                            {openDropdown === `options-${monitor.id}` && (
                              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg min-w-[180px] z-10 p-2 border border-[#eaeaea]">
                                <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5F5F5F]">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                  Edit
                                </a>
                                <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5F5F5F]">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                  </svg>
                                  {monitor.isActive ? 'Pause' : 'Resume'}
                                </a>
                                <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5F5F5F]">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                  </svg>
                                  Export
                                </a>
                                <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#ff4d4f] hover:text-white rounded-md transition-colors">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  </svg>
                                  Delete
                                </a>
                              </div>
                            )}
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
                                    <th className="bg-[#f3f4f6] text-[11px] text-[#5F5F5F] px-3 py-2.5 text-left border-b border-[#e5e7eb] overflow-visible">Field</th>
                                    <th className="bg-[#f3f4f6] text-[11px] text-[#5F5F5F] px-3 py-2.5 text-left border-b border-[#e5e7eb] overflow-visible">Type</th>
                                    <th className="bg-[#f3f4f6] text-[11px] text-[#5F5F5F] px-3 py-2.5 text-left border-b border-[#e5e7eb] overflow-visible">Current Value</th>
                                    <th className="bg-[#f3f4f6] text-[11px] text-[#5F5F5F] px-3 py-2.5 text-left border-b border-[#e5e7eb] overflow-visible">Previous</th>
                                    <th className="bg-[#f3f4f6] text-[11px] text-[#5F5F5F] px-3 py-2.5 text-left border-b border-[#e5e7eb] overflow-visible">Magnitude</th>
                                    <th className="bg-[#f3f4f6] text-[11px] text-[#5F5F5F] px-3 py-2.5 text-left border-b border-[#e5e7eb] overflow-visible">Modified</th>
                                    <th className="bg-[#f3f4f6] text-[11px] text-[#5F5F5F] px-3 py-2.5 text-left border-b border-[#e5e7eb] overflow-visible">Unread</th>
                                    <th className="bg-[#f3f4f6] text-[11px] text-[#5F5F5F] px-3 py-2.5 text-left border-b border-[#e5e7eb] overflow-visible">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {monitor.details.map((detail, idx) => (
                                    <tr key={idx} className={idx === monitor.details.length - 1 ? '' : 'border-b border-[#e5e7eb]'}>
                                      <td className="bg-[#f9fafb] px-3 py-3 overflow-visible">
                                        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-mono bg-[#f3f4f6] text-[#464646] font-medium relative group cursor-help">
                                          {detail.field}
                                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1B1B1B] text-white text-[11px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-pre-line pointer-events-none">
                                            Triggers:{'\n'}
                                            {detail.triggers.join('\n')}
                                          </div>
                                        </span>
                                      </td>
                                      <td className="bg-[#f9fafb] px-3 py-3 overflow-visible">
                                        <div className="text-xs text-[#4A4A4A] max-w-[120px] truncate">{detail.type}</div>
                                      </td>
                                      <td className="bg-[#f9fafb] px-3 py-3 overflow-visible">
                                        <span
                                          onClick={() => copyToClipboard(detail.currentValueFull)}
                                          className="font-mono text-xs text-[#4A4A4A] cursor-pointer px-2 py-1 rounded hover:bg-[#f3f4f6] transition-colors max-w-[120px] truncate inline-block"
                                          title={detail.currentValueFull}
                                        >
                                          {detail.currentValue}
                                        </span>
                                      </td>
                                      <td className="bg-[#f9fafb] px-3 py-3 overflow-visible">
                                        <span
                                          onClick={() => copyToClipboard(detail.previousValueFull)}
                                          className="font-mono text-xs text-[#4A4A4A] cursor-pointer px-2 py-1 rounded hover:bg-[#f3f4f6] transition-colors max-w-[120px] truncate inline-block"
                                          title={detail.previousValueFull}
                                        >
                                          {detail.previousValue}
                                        </span>
                                      </td>
                                      <td className="bg-[#f9fafb] px-3 py-3 overflow-visible">
                                        <div className="flex items-center gap-2 min-w-[80px]">
                                          <div className="flex-grow h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden min-w-[40px]">
                                            <div
                                              className="h-full bg-[#089E68] rounded-full transition-all"
                                              style={{ width: `${detail.magnitude}%` }}
                                            />
                                          </div>
                                          <span className="text-[11px] text-[#5F5F5F] whitespace-nowrap">{detail.magnitude}%</span>
                                        </div>
                                      </td>
                                      <td className="bg-[#f9fafb] px-3 py-3 overflow-visible">
                                        <div className="flex items-center gap-1 text-[#5F5F5F] text-xs">
                                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
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
                                      <td className="bg-[#f9fafb] px-3 py-3 overflow-visible">
                                        <div className="flex items-center gap-2">
                                          <div className="w-7 h-7 rounded-full bg-[#EBFCF4] flex items-center justify-center cursor-pointer hover:-translate-y-0.5 hover:bg-[#D7F7E9] transition-all relative group">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#016853]">
                                              <path
                                                fill="currentColor"
                                                d="M17.1282 5.53408C15.6009 4.20127 13.6364 3.47739 11.6095 3.50054C9.58258 3.52369 7.63513 4.29225 6.1387 5.6596C4.64227 7.02694 3.70161 8.89735 3.4962 10.914C3.45422 11.326 3.08614 11.6261 2.67405 11.5841C2.26197 11.5421 1.96194 11.174 2.00392 10.762C2.24668 8.37868 3.35837 6.1682 5.12688 4.55225C6.89539 2.9363 9.19692 2.028 11.5924 2.00064C13.9878 1.97328 16.3095 2.82877 18.1145 4.40391C19.9194 5.97904 21.0813 8.16356 21.3784 10.5407C21.6756 12.9178 21.0872 15.3211 19.7255 17.292C18.3638 19.263 16.3241 20.6637 13.9956 21.2268C11.6672 21.7899 9.21286 21.4761 7.101 20.3452C5.62665 19.5557 4.39125 18.4065 3.50006 17.019V19.838C3.50006 20.2522 3.16427 20.588 2.75006 20.588C2.33584 20.588 2.00006 20.2522 2.00006 19.838V14.838C2.00006 14.4237 2.33584 14.088 2.75006 14.088H3.23256C3.24421 14.0877 3.25584 14.0877 3.26743 14.088H7.75006C8.16427 14.088 8.50006 14.4237 8.50006 14.838C8.50006 15.2522 8.16427 15.588 7.75006 15.588H4.40079C5.1641 17.0404 6.34792 18.2404 7.80911 19.0229C9.59607 19.9798 11.6728 20.2453 13.643 19.7688C15.6133 19.2923 17.3392 18.1072 18.4914 16.4394C19.6436 14.7717 20.1414 12.7381 19.89 10.7267C19.6386 8.71532 18.6555 6.86688 17.1282 5.53408ZM11.7003 7.08789C12.1145 7.08789 12.4503 7.42368 12.4503 7.83789V11.5272L14.2306 13.3076C14.5235 13.6005 14.5235 14.0753 14.2306 14.3682C13.9377 14.6611 13.4628 14.6611 13.1699 14.3682L11.1699 12.3682C11.0293 12.2276 10.9503 12.0368 10.9503 11.8379V7.83789C10.9503 7.42368 11.286 7.08789 11.7003 7.08789Z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                              />
                                            </svg>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-[#1B1B1B] text-white text-[11px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none z-10">
                                              View History
                                            </div>
                                          </div>
                                          <div className="w-7 h-7 rounded-full bg-[#EBFCF4] flex items-center justify-center cursor-pointer hover:-translate-y-0.5 hover:bg-[#D7F7E9] transition-all relative group">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#016853]">
                                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-[#1B1B1B] text-white text-[11px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none z-10">
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

      {/* Click outside handler for dropdowns */}
      {openDropdown && (
        <div className="fixed inset-0 z-0" onClick={() => setOpenDropdown(null)} />
      )}

      {/* Dropdown Portal */}
      {monitors.map((monitor) => (
        <DropdownPortal
          key={`portal-${monitor.id}`}
          isOpen={openDropdown === `options-${monitor.id}`}
          buttonRef={getButtonRef(`options-${monitor.id}`)}
        >
          <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5F5F5F]">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handleToggleStatus(monitor.id);
            }}
            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5F5F5F]">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
            {monitor.isActive ? 'Pause' : 'Resume'}
          </a>
          <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#f9fafb] rounded-md transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5F5F5F]">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handleDeleteMonitor(monitor.id);
            }}
            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#4A4A4A] hover:text-white hover:bg-[#ff4d4f] rounded-md transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </a>
        </DropdownPortal>
      ))}

      {/* New Monitor Modal */}
      <NewMonitorModal
        isOpen={isNewMonitorModalOpen}
        onClose={() => setIsNewMonitorModalOpen(false)}
      />
    </div>
  );
}

