"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal/Modal";
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

const NewMonitorModal: React.FC<NewMonitorModalProps> = ({ isOpen, onClose }) => {
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
      
      // Auto-update country flag URL when country changes
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
      // Basic validation
      if (!formData.name.trim()) {
        throw new Error("Monitor name is required");
      }
      if (!formData.itemId.trim()) {
        throw new Error("Item ID is required");
      }
      if (!formData.itemTitle.trim()) {
        throw new Error("Item title is required");
      }
      if (!formData.siteName.trim()) {
        throw new Error("Site name is required");
      }

      // Ensure country flag URL is set
      const country = countryOptions.find((c) => c.code === formData.countryCode);
      const monitorData = {
        ...formData,
        countryFlagUrl: formData.countryFlagUrl || country?.flag || "",
      };
      
      await createMonitor(monitorData);
      onClose();
      // Reset form
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#464646]">Create New Monitor</h2>
          <button
            onClick={onClose}
            className="text-[#5F5F5F] hover:text-[#464646] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Monitor Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#464646] mb-2">
              Monitor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#eaeaea] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#016853]/20 focus:border-[#016853]"
              placeholder="e.g., Price Tracker Pro"
            />
          </div>

          {/* Item Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="itemId" className="block text-sm font-medium text-[#464646] mb-2">
                Item ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="itemId"
                name="itemId"
                value={formData.itemId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#eaeaea] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#016853]/20 focus:border-[#016853]"
                placeholder="e.g., ITM-A7B9C3"
              />
            </div>

            <div>
              <label htmlFor="itemTitle" className="block text-sm font-medium text-[#464646] mb-2">
                Item Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="itemTitle"
                name="itemTitle"
                value={formData.itemTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#eaeaea] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#016853]/20 focus:border-[#016853]"
                placeholder="e.g., The Complete Guide to Machine Learning"
              />
            </div>
          </div>

          <div>
            <label htmlFor="itemImageUrl" className="block text-sm font-medium text-[#464646] mb-2">
              Item Image URL
            </label>
            <input
              type="url"
              id="itemImageUrl"
              name="itemImageUrl"
              value={formData.itemImageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#eaeaea] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#016853]/20 focus:border-[#016853]"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Site and Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-[#464646] mb-2">
                Site Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#eaeaea] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#016853]/20 focus:border-[#016853]"
                placeholder="e.g., Amazon.com"
              />
            </div>

            <div>
              <label htmlFor="countryCode" className="block text-sm font-medium text-[#464646] mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#eaeaea] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#016853]/20 focus:border-[#016853] bg-white"
              >
                {countryOptions.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>


          {/* Monitoring Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="intervalMinutes" className="block text-sm font-medium text-[#464646] mb-2">
                Check Interval (minutes)
              </label>
              <input
                type="number"
                id="intervalMinutes"
                name="intervalMinutes"
                value={formData.intervalMinutes}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-[#eaeaea] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#016853]/20 focus:border-[#016853]"
              />
            </div>

            <div>
              <label htmlFor="checksTotal" className="block text-sm font-medium text-[#464646] mb-2">
                Total Checks Allowed
              </label>
              <input
                type="number"
                id="checksTotal"
                name="checksTotal"
                value={formData.checksTotal}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-[#eaeaea] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#016853]/20 focus:border-[#016853]"
              />
            </div>
          </div>

          {/* Action Buttons */}
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
        </form>
      </div>
    </Modal>
  );
};

export default NewMonitorModal;

