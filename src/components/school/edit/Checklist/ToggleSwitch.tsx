interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const ToggleSwitch: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-subtle-text">{label}</span>
      <label className="relative inline-block w-11 h-6">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="opacity-0 w-0 h-0"
        />
        <span
          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all ${
            checked ? "bg-[#0B6333]" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute h-[18px] w-[18px] left-[3px] bottom-[3px] bg-white rounded-full transition-transform ${
              checked ? "translate-x-5" : ""
            }`}
          ></span>
        </span>
      </label>
    </div>
  );
};
