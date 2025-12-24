"use client";

import { useState, useEffect } from "react";
import { mockMonitors } from "@/mocks/monitors";

// UI Types (matching the component interface)
export interface Monitor {
  id: string;
  name: string;
  item: {
    title: string;
    id: string;
    image: string;
  };
  country: {
    code: string;
    flag: string;
    site: string;
  };
  interval: string;
  lastCheck: string;
  lastCheckTooltip: string;
  fields: string[];
  usage: {
    used: number;
    total: number;
    percentage: number;
  };
  isActive: boolean;
  alerts: string[];
  details: MonitorDetail[];
  unreadCount: number;
}

export interface MonitorDetail {
  field: string;
  triggers: string[];
  type: string;
  currentValue: string;
  currentValueFull: string;
  previousValue: string;
  previousValueFull: string;
  magnitude: number;
  modified: string;
  unreadCount: number;
}

// Database Types
interface DBMonitor {
  id: string;
  name: string;
  item_id: string;
  item_title: string;
  item_image_url: string | null;
  site_name: string;
  country_code: string;
  country_flag_url: string | null;
  interval_minutes: number | null;
  last_check_at: string | null;
  created_at: string | null;
  modified_at: string | null;
  checks_used: number | null;
  checks_total: number | null;
  is_active: boolean | null;
  unread_count: number | null;
  user_id: string;
}

interface DBMonitorField {
  id: string;
  monitor_id: string;
  field_name: string;
  field_type: string;
}

interface DBMonitorDetail {
  id: string;
  monitor_id: string;
  field_name: string;
  change_type: string | null;
  current_value: string | null;
  current_value_full: string | null;
  previous_value: string | null;
  previous_value_full: string | null;
  magnitude_percentage: number | null;
  triggers: any; // JSONB
  modified_at: string | null;
  unread_count: number | null;
}

interface DBMonitorAlert {
  id: string;
  monitor_id: string;
  alert_type: string;
  alert_config: any; // JSONB
  is_active: boolean | null;
}

interface UseMonitorsReturn {
  monitors: Monitor[];
  loading: boolean;
  error: string | null;
  createMonitor: (data: CreateMonitorData) => Promise<void>;
  updateMonitor: (id: string, data: UpdateMonitorData) => Promise<void>;
  deleteMonitor: (id: string) => Promise<void>;
  toggleMonitorStatus: (id: string) => Promise<void>;
  refreshMonitors: () => Promise<void>;
}

export interface CreateMonitorData {
  name: string;
  itemId: string;
  itemTitle: string;
  itemImageUrl?: string;
  siteName: string;
  countryCode: string;
  countryFlagUrl?: string;
  intervalMinutes?: number;
  checksTotal?: number;
  fields?: { name: string; type: string }[];
  alerts?: { type: string; config?: any }[];
}

interface UpdateMonitorData extends Partial<CreateMonitorData> {
  isActive?: boolean;
}

// Convert database monitor to UI format
const convertToUIMonitor = (
  dbMonitor: DBMonitor,
  fields: DBMonitorField[],
  details: DBMonitorDetail[],
  alerts: DBMonitorAlert[]
): Monitor => {
  // Format interval
  const formatInterval = (minutes: number | null): string => {
    if (!minutes) return "N/A";
    if (minutes < 60) return `${minutes} min`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hour${minutes >= 120 ? "s" : ""}`;
    return `${Math.floor(minutes / 1440)} day${minutes >= 2880 ? "s" : ""}`;
  };

  // Format last check time
  const formatLastCheck = (lastCheckAt: string | null): { text: string; tooltip: string } => {
    if (!lastCheckAt) {
      return { text: "Never", tooltip: "No checks performed yet" };
    }

    const lastCheck = new Date(lastCheckAt);
    const now = new Date();
    const diffMs = now.getTime() - lastCheck.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    let text = "";
    if (diffMins < 60) {
      text = `${diffMins} min${diffMins !== 1 ? "s" : ""}`;
    } else if (diffHours < 24) {
      text = `${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
    } else {
      text = `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    }

    const created = dbMonitor.created_at ? new Date(dbMonitor.created_at).toLocaleString() : "N/A";
    const modified = dbMonitor.modified_at ? new Date(dbMonitor.modified_at).toLocaleString() : "N/A";
    const tooltip = `Last: ${lastCheck.toLocaleString()}\nCreated: ${created}\nModified: ${modified}`;

    return { text, tooltip };
  };

  // Format time ago
  const formatTimeAgo = (date: string | null): string => {
    if (!date) return "N/A";
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    }
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  };

  const lastCheckInfo = formatLastCheck(dbMonitor.last_check_at);
  const usageUsed = dbMonitor.checks_used || 0;
  const usageTotal = dbMonitor.checks_total || 0;
  const usagePercentage = usageTotal > 0 ? Math.round((usageUsed / usageTotal) * 100) : 0;

  // Convert details
  const uiDetails: MonitorDetail[] = details.map((detail) => {
    const triggers = Array.isArray(detail.triggers)
      ? detail.triggers
      : detail.triggers
      ? [String(detail.triggers)]
      : [];

    return {
      field: detail.field_name,
      triggers,
      type: detail.change_type || "unknown",
      currentValue: detail.current_value || "",
      currentValueFull: detail.current_value_full || detail.current_value || "",
      previousValue: detail.previous_value || "",
      previousValueFull: detail.previous_value_full || detail.previous_value || "",
      magnitude: detail.magnitude_percentage || 0,
      modified: formatTimeAgo(detail.modified_at),
      unreadCount: detail.unread_count || 0,
    };
  });

  // Get alert types
  const alertTypes = alerts
    .filter((alert) => alert.is_active !== false)
    .map((alert) => alert.alert_type);

  return {
    id: dbMonitor.id,
    name: dbMonitor.name,
    item: {
      title: dbMonitor.item_title,
      id: dbMonitor.item_id,
      image: dbMonitor.item_image_url || "",
    },
    country: {
      code: dbMonitor.country_code,
      flag: dbMonitor.country_flag_url || "",
      site: dbMonitor.site_name,
    },
    interval: formatInterval(dbMonitor.interval_minutes),
    lastCheck: lastCheckInfo.text,
    lastCheckTooltip: lastCheckInfo.tooltip,
    fields: fields.map((f) => f.field_name),
    usage: {
      used: usageUsed,
      total: usageTotal,
      percentage: usagePercentage,
    },
    isActive: dbMonitor.is_active ?? true,
    alerts: alertTypes,
    details: uiDetails,
    unreadCount: dbMonitor.unread_count || 0,
  };
};

export const useMonitors = (): UseMonitorsReturn => {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonitors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Use mock data
      setMonitors([...mockMonitors]);
    } catch (err: any) {
      console.error("Error fetching monitors:", err);
      setError(err.message || "Failed to fetch monitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitors();
  }, []);

  const createMonitor = async (data: CreateMonitorData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Create new monitor from mock data structure
      const newMonitor: Monitor = {
        id: Date.now().toString(),
        name: data.name,
        item: {
          title: data.itemTitle,
          id: data.itemId,
          image: data.itemImageUrl || '',
        },
        country: {
          code: data.countryCode,
          flag: data.countryFlagUrl || '',
          site: data.siteName,
        },
        interval: data.intervalMinutes ? `${data.intervalMinutes} min` : '60 min',
        lastCheck: 'Never',
        lastCheckTooltip: 'No checks performed yet',
        fields: data.fields?.map(f => f.name) || [],
        usage: {
          used: 0,
          total: data.checksTotal || 1000,
          percentage: 0,
        },
        isActive: true,
        alerts: data.alerts?.map(a => a.type) || [],
        unreadCount: 0,
        details: [],
      };
      
      setMonitors(prev => [newMonitor, ...prev]);
    } catch (err: any) {
      console.error("Error creating monitor:", err);
      throw err;
    }
  };

  const updateMonitor = async (id: string, data: UpdateMonitorData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setMonitors(prev => prev.map(monitor => {
        if (monitor.id === id) {
          return {
            ...monitor,
            ...(data.name !== undefined && { name: data.name }),
            ...(data.itemTitle !== undefined && { item: { ...monitor.item, title: data.itemTitle } }),
            ...(data.itemId !== undefined && { item: { ...monitor.item, id: data.itemId } }),
            ...(data.itemImageUrl !== undefined && { item: { ...monitor.item, image: data.itemImageUrl } }),
            ...(data.siteName !== undefined && { country: { ...monitor.country, site: data.siteName } }),
            ...(data.countryCode !== undefined && { country: { ...monitor.country, code: data.countryCode } }),
            ...(data.countryFlagUrl !== undefined && { country: { ...monitor.country, flag: data.countryFlagUrl } }),
            ...(data.intervalMinutes !== undefined && { interval: `${data.intervalMinutes} min` }),
            ...(data.checksTotal !== undefined && { usage: { ...monitor.usage, total: data.checksTotal } }),
            ...(data.isActive !== undefined && { isActive: data.isActive }),
          };
        }
        return monitor;
      }));
    } catch (err: any) {
      console.error("Error updating monitor:", err);
      throw err;
    }
  };

  const deleteMonitor = async (id: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setMonitors(prev => prev.filter(monitor => monitor.id !== id));
    } catch (err: any) {
      console.error("Error deleting monitor:", err);
      throw err;
    }
  };

  const toggleMonitorStatus = async (id: string) => {
    try {
      const monitor = monitors.find((m) => m.id === id);
      if (!monitor) throw new Error("Monitor not found");

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setMonitors(prev => prev.map(m => 
        m.id === id ? { ...m, isActive: !m.isActive } : m
      ));
    } catch (err: any) {
      console.error("Error toggling monitor status:", err);
      throw err;
    }
  };

  return {
    monitors,
    loading,
    error,
    createMonitor,
    updateMonitor,
    deleteMonitor,
    toggleMonitorStatus,
    refreshMonitors: fetchMonitors,
  };
};


