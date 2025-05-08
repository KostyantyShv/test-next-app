export const formatEventDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const datePart = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${datePart} <span class="time-delimiter">•</span> ${timePart}`;
};

export const formatDateTime = (date: Date): string => {
  return date.toISOString().slice(0, 16);
};
