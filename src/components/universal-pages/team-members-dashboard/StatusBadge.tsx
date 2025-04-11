export const StatusBadge: React.FC<{
  status: "accepted" | "pending" | "rejected";
}> = ({ status }) => {
  const statusStyles = {
    accepted: "bg-[#dcfce7] text-[#166534]",
    pending: "bg-[#fef3c7] text-[#92400e]",
    rejected: "bg-[#fee2e2] text-[#991b1b]",
  };

  return (
    <span
      className={`badge inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};
