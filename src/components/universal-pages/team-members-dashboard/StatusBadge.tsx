export const StatusBadge: React.FC<{
  status: "accepted" | "pending" | "rejected" | "admin";
}> = ({ status }) => {
  const statusStyles: { [key: string]: { bg: string; text: string } } = {
    accepted: { bg: "#dcfce7", text: "#166534" },
    pending: { bg: "#fef3c7", text: "#92400e" },
    rejected: { bg: "#fee2e2", text: "#991b1b" },
    admin: { bg: "#dbeafe", text: "#142E53" },
  };

  const style = statusStyles[status] || statusStyles.pending;

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full capitalize"
      style={{
        fontSize: '12px',
        fontWeight: 500,
        backgroundColor: style.bg,
        color: style.text,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        letterSpacing: '0.025em'
      }}
    >
      {status}
    </span>
  );
};
