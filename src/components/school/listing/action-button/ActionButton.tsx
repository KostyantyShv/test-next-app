interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, text }) => (
  <button className="flex items-center w-fit gap-2 px-4 py-2 border border-gray-200 rounded-full bg-white text-gray-800 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
    <span className="text-gray-500">{icon}</span>
    {text}
  </button>
);

export default ActionButton;
