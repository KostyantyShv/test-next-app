interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, text }) => (
  <button className="cta-button flex items-center gap-2 px-4 py-2 border border-[#E1E7EE] rounded-full bg-white text-[#4A4A4A] text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-[#F8FAFC] hover:border-[#D1D5DB]">
    <span className="text-[#5F5F5F] w-5 h-5 flex items-center justify-center">{icon}</span>
    {text}
  </button>
);

export default ActionButton;
