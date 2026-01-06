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
    <div className="flex items-center gap-2 max-md:gap-1.5">
      {label && <span className="text-xs max-md:text-xs whitespace-nowrap max-md:whitespace-nowrap" style={{ color: 'var(--subtle-text)' }}>{label}</span>}
      <label className="relative inline-block w-11 max-md:w-9 h-6 max-md:h-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="opacity-0 w-0 h-0"
        />
        <span
          className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full max-md:rounded-full transition-all"
          style={{
            background: checked ? 'var(--active-green)' : '#E5E7EB',
          }}
        >
          <span
            className={`absolute h-[18px] max-md:h-4 w-[18px] max-md:w-4 left-[3px] max-md:left-[2px] bottom-[3px] max-md:bottom-[2px] rounded-full max-md:rounded-full transition-transform ${
              checked ? 'max-md:translate-x-4 translate-x-5' : 'translate-x-0'
            }`}
            style={{
              backgroundColor: 'white',
            }}
          ></span>
        </span>
      </label>
    </div>
  );
};
