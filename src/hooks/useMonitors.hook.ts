"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase_utils/client";

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
  const supabase = createClient();
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonitors = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      // Fetch monitors
      const { data: dbMonitors, error: monitorsError } = await supabase
        .from("monitors")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (monitorsError) throw monitorsError;
      if (!dbMonitors || dbMonitors.length === 0) {
        setMonitors([]);
        setLoading(false);
        return;
      }

      const monitorIds = dbMonitors.map((m) => m.id);

      // Fetch related data
      const [fieldsResult, detailsResult, alertsResult] = await Promise.all([
        supabase.from("monitor_fields").select("*").in("monitor_id", monitorIds),
        supabase.from("monitor_details").select("*").in("monitor_id", monitorIds),
        supabase.from("monitor_alerts").select("*").in("monitor_id", monitorIds),
      ]);

      if (fieldsResult.error) throw fieldsResult.error;
      if (detailsResult.error) throw detailsResult.error;
      if (alertsResult.error) throw alertsResult.error;

      const fields = (fieldsResult.data || []) as DBMonitorField[];
      const details = (detailsResult.data || []) as DBMonitorDetail[];
      const alerts = (alertsResult.data || []) as DBMonitorAlert[];

      // Group related data by monitor_id
      const fieldsByMonitor = fields.reduce((acc, field) => {
        if (!acc[field.monitor_id]) acc[field.monitor_id] = [];
        acc[field.monitor_id].push(field);
        return acc;
      }, {} as Record<string, DBMonitorField[]>);

      const detailsByMonitor = details.reduce((acc, detail) => {
        if (!acc[detail.monitor_id]) acc[detail.monitor_id] = [];
        acc[detail.monitor_id].push(detail);
        return acc;
      }, {} as Record<string, DBMonitorDetail[]>);

      const alertsByMonitor = alerts.reduce((acc, alert) => {
        if (!acc[alert.monitor_id]) acc[alert.monitor_id] = [];
        acc[alert.monitor_id].push(alert);
        return acc;
      }, {} as Record<string, DBMonitorAlert[]>);

      // Convert to UI format
      const uiMonitors = dbMonitors.map((monitor) =>
        convertToUIMonitor(
          monitor as DBMonitor,
          fieldsByMonitor[monitor.id] || [],
          detailsByMonitor[monitor.id] || [],
          alertsByMonitor[monitor.id] || []
        )
      );

      setMonitors(uiMonitors);
    } catch (err: any) {
      console.error("Error fetching monitors:", err);
      setError(err.message || "Failed to fetch monitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitors();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("monitors_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "monitors",
        },
        () => {
          fetchMonitors();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createMonitor = async (data: CreateMonitorData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Create monitor
      const { data: monitor, error: monitorError } = await supabase
        .from("monitors")
        .insert({
          user_id: user.id,
          name: data.name,
          item_id: data.itemId,
          item_title: data.itemTitle,
          item_image_url: data.itemImageUrl || null,
          site_name: data.siteName,
          country_code: data.countryCode,
          country_flag_url: data.countryFlagUrl || null,
          interval_minutes: data.intervalMinutes || 60,
          checks_total: data.checksTotal || 1000,
          checks_used: 0,
          is_active: true,
        })
        .select()
        .single();

      if (monitorError) throw monitorError;
      if (!monitor) throw new Error("Failed to create monitor");

      // Create fields
      if (data.fields && data.fields.length > 0) {
        const { error: fieldsError } = await supabase.from("monitor_fields").insert(
          data.fields.map((field) => ({
            monitor_id: monitor.id,
            field_name: field.name,
            field_type: field.type,
          }))
        );
        if (fieldsError) throw fieldsError;
      }

      // Create alerts
      if (data.alerts && data.alerts.length > 0) {
        const { error: alertsError } = await supabase.from("monitor_alerts").insert(
          data.alerts.map((alert) => ({
            monitor_id: monitor.id,
            alert_type: alert.type,
            alert_config: alert.config || null,
            is_active: true,
          }))
        );
        if (alertsError) throw alertsError;
      }

      await fetchMonitors();
    } catch (err: any) {
      console.error("Error creating monitor:", err);
      throw err;
    }
  };

  const updateMonitor = async (id: string, data: UpdateMonitorData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const updateData: any = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.itemId !== undefined) updateData.item_id = data.itemId;
      if (data.itemTitle !== undefined) updateData.item_title = data.itemTitle;
      if (data.itemImageUrl !== undefined) updateData.item_image_url = data.itemImageUrl;
      if (data.siteName !== undefined) updateData.site_name = data.siteName;
      if (data.countryCode !== undefined) updateData.country_code = data.countryCode;
      if (data.countryFlagUrl !== undefined) updateData.country_flag_url = data.countryFlagUrl;
      if (data.intervalMinutes !== undefined) updateData.interval_minutes = data.intervalMinutes;
      if (data.checksTotal !== undefined) updateData.checks_total = data.checksTotal;
      if (data.isActive !== undefined) updateData.is_active = data.isActive;

      const { error } = await supabase
        .from("monitors")
        .update(updateData)
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      await fetchMonitors();
    } catch (err: any) {
      console.error("Error updating monitor:", err);
      throw err;
    }
  };

  const deleteMonitor = async (id: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("monitors")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      await fetchMonitors();
    } catch (err: any) {
      console.error("Error deleting monitor:", err);
      throw err;
    }
  };

  const toggleMonitorStatus = async (id: string) => {
    try {
      const monitor = monitors.find((m) => m.id === id);
      if (!monitor) throw new Error("Monitor not found");

      await updateMonitor(id, { isActive: !monitor.isActive });
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


