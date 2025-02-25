interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, text }) => (
  <button className="flex items-center gap-2 px-3 py-2 border border-[#E1E7EE] rounded-full bg-white text-[#4A4A4A] hover:bg-[#F8FAFC] hover:border-[#D1D5DB] transition-colors text-xs sm:text-sm font-semibold w-full sm:w-auto justify-center">
    {icon}
    {text}
  </button>
);

export default ActionButton;
