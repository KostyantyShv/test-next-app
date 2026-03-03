/**
 * Derives announcement status from current time and schedule.
 * Use this for display and when saving so the UI never shows a stale status.
 *
 * - Scheduled: now < startTime
 * - Live: startTime <= now <= endTime (or startTime <= now if no end)
 * - Ended (paused): now > endTime
 */
export function getAnnouncementStatus(
  startDate: string,
  endDate: string
): "live" | "scheduled" | "paused" {
  const now = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  if (start > now) return "scheduled";
  if (end != null && !Number.isNaN(end.getTime()) && now > end) return "paused";
  return "live";
}
