export const StatusBadge: React.FC<{
  status: "accepted" | "pending" | "rejected" | "admin";
}> = ({ status }) => {
  const statusStyles: { [key: string]: string } = {
    accepted: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    admin: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};
