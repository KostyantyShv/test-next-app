"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMonitors, type CreateMonitorData } from "@/hooks/useMonitors.hook";

interface NewMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countryOptions = [
  { code: "us", name: "United States", flag: "https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/us.svg" },
  { code: "ca", name: "Canada", flag: "https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/ca.svg" },
  { code: "uk", name: "United Kingdom", flag: "https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/gb.svg" },
  { code: "de", name: "Germany", flag: "https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/de.svg" },
  { code: "fr", name: "France", flag: "https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/fr.svg" },
];

/* ──────────────────────────────────────────────
   Shared form content used by both Desktop Modal
   and Mobile Drawer
   ────────────────────────────────────────────── */

interface MonitorFormContentProps {
  onClose: () => void;
  isMobile?: boolean;
}

const MonitorFormContent: React.FC<MonitorFormContentProps> = ({ onClose, isMobile }) => {
  const { createMonitor } = useMonitors();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateMonitorData>({
    name: "",
    itemId: "",
    itemTitle: "",
    itemImageUrl: "",
    siteName: "",
    countryCode: "us",
    countryFlagUrl: countryOptions.find((c) => c.code === "us")?.flag || "",
    intervalMinutes: 60,
    checksTotal: 1000,
    fields: [],
    alerts: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: name === "intervalMinutes" || name === "checksTotal" ? parseInt(value) || 0 : value,
      };

      if (name === "countryCode") {
        const country = countryOptions.find((c) => c.code === value);
        if (country) {
          updated.countryFlagUrl = country.flag;
        }
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.name.trim()) throw new Error("Monitor name is required");
      if (!formData.itemId.trim()) throw new Error("Item ID is required");
      if (!formData.itemTitle.trim()) throw new Error("Item title is required");
      if (!formData.siteName.trim()) throw new Error("Site name is required");

      const country = countryOptions.find((c) => c.code === formData.countryCode);
      const monitorData = {
        ...formData,
        countryFlagUrl: formData.countryFlagUrl || country?.flag || "",
      };

      await createMonitor(monitorData);
      onClose();
      setFormData({
        name: "",
        itemId: "",
        itemTitle: "",
        itemImageUrl: "",
        siteName: "",
        countryCode: "us",
        countryFlagUrl: countryOptions.find((c) => c.code === "us")?.flag || "",
        intervalMinutes: 60,
        checksTotal: 1000,
        fields: [],
        alerts: [],
      });
    } catch (err: any) {
      setError(err.message || "Failed to create monitor");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = isMobile
    ? "w-full px-4 py-3.5 border border-[var(--border-color)] rounded-xl text-[16px] text-[var(--body-text)] bg-[var(--surface-color)] focus:outline-none focus:ring-2 focus:ring-[#016853]/20 focus:border-[#016853] transition-colors"
    : "w-full px-3 py-2 border border-[#eaeaea] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#016853]/20 focus:border-[#016853]";

  const labelClasses = isMobile
    ? "block text-[15px] font-medium text-[var(--bold-text)] mb-2"
    : "block text-sm font-medium text-[#464646] mb-2";

  return (
    <div className={isMobile ? "flex flex-col h-full" : ""}>
      {/* Header */}
      <div
        className={
          isMobile
            ? "flex items-center justify-between px-5 pt-2 pb-4 border-b border-[var(--border-color)] flex-shrink-0"
            : "flex justify-between items-center mb-6"
        }
      >
        <h2
          className={
            isMobile
              ? "text-[20px] font-semibold text-[var(--bold-text)]"
              : "text-2xl font-semibold text-[#464646]"
          }
        >
          Create New Monitor
        </h2>
        <button
          onClick={onClose}
          className={
            isMobile
              ? "flex items-center justify-center w-8 h-8 rounded-full bg-[var(--hover-bg)] text-[var(--subtle-text)] transition-colors active:bg-[var(--border-color)]"
              : "text-[#5F5F5F] hover:text-[#464646] transition-colors"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={isMobile ? "w-5 h-5" : "w-6 h-6"}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable form body */}
      <div
        className={
          isMobile
            ? "flex-1 overflow-y-auto overscroll-y-contain px-5 py-5"
            : ""
        }
        style={isMobile ? { WebkitOverflowScrolling: "touch" } : undefined}
      >
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={isMobile ? "space-y-5" : "space-y-4"} id="new-monitor-form">
          {/* Monitor Name */}
          <div>
            <label htmlFor="name" className={labelClasses}>
              Monitor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="e.g., Price Tracker Pro"
            />
          </div>

          {/* Item ID & Item Title */}
          <div className={isMobile ? "space-y-5" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            <div>
              <label htmlFor="itemId" className={labelClasses}>
                Item ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="itemId"
                name="itemId"
                value={formData.itemId}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="e.g., ITM-A7B9C3"
              />
            </div>

            <div>
              <label htmlFor="itemTitle" className={labelClasses}>
                Item Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="itemTitle"
                name="itemTitle"
                value={formData.itemTitle}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="e.g., The Complete Guide to Machine Learning"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="itemImageUrl" className={labelClasses}>
              Item Image URL
            </label>
            <input
              type="url"
              id="itemImageUrl"
              name="itemImageUrl"
              value={formData.itemImageUrl}
              onChange={handleChange}
              className={inputClasses}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Site Name & Country */}
          <div className={isMobile ? "space-y-5" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            <div>
              <label htmlFor="siteName" className={labelClasses}>
                Site Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="e.g., Amazon.com"
              />
            </div>

            <div>
              <label htmlFor="countryCode" className={labelClasses}>
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                required
                className={`${inputClasses} bg-[var(--surface-color,white)]`}
              >
                {countryOptions.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Check Interval & Total Checks */}
          <div className={isMobile ? "space-y-5" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            <div>
              <label htmlFor="intervalMinutes" className={labelClasses}>
                Check Interval (minutes)
              </label>
              <input
                type="number"
                id="intervalMinutes"
                name="intervalMinutes"
                value={formData.intervalMinutes}
                onChange={handleChange}
                min="1"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="checksTotal" className={labelClasses}>
                Total Checks Allowed
              </label>
              <input
                type="number"
                id="checksTotal"
                name="checksTotal"
                value={formData.checksTotal}
                onChange={handleChange}
                min="1"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Desktop inline buttons */}
          {!isMobile && (
            <div className="flex justify-end gap-3 pt-4 border-t border-[#eaeaea]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-[#eaeaea] bg-white text-[#4A4A4A] hover:bg-[#f9fafb] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0B6333] text-white hover:bg-[#016853] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Monitor"}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Mobile sticky footer buttons */}
      {isMobile && (
        <div
          className="flex-shrink-0 flex gap-3 px-5 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))] border-t border-[var(--border-color)] bg-[var(--surface-color)]"
        >
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl text-[15px] font-medium border border-[var(--border-color)] bg-[var(--hover-bg)] text-[var(--body-text)] active:bg-[var(--border-color)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="new-monitor-form"
            disabled={loading}
            className="flex-1 py-3.5 rounded-xl text-[15px] font-medium bg-[#0B6333] text-white active:bg-[#016853] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: "0 4px 12px rgba(11,99,51,0.25)" }}
          >
            {loading ? "Creating..." : "Create Monitor"}
          </button>
        </div>
      )}
    </div>
  );
};

/* ──────────────────────────────────────────────
   Main component — renders Desktop Modal or
   Mobile Drawer depending on viewport
   ────────────────────────────────────────────── */

const NewMonitorModal: React.FC<NewMonitorModalProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !isOpen) return null;

  if (isMobile) {
    return (
      <MobileDrawer
        isOpen={isOpen}
        onClose={onClose}
        title="Create New Monitor"
      >
        <MonitorFormContent onClose={onClose} isMobile />
      </MobileDrawer>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div className="p-6">
        <MonitorFormContent onClose={onClose} />
      </div>
    </Modal>
  );
};

export default NewMonitorModal;
