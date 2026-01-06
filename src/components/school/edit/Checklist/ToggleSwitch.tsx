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
      <span className="text-xs whitespace-nowrap" style={{ color: 'var(--subtle-text)' }}>{label}</span>
      <label className="relative inline-block w-11 h-6">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="opacity-0 w-0 h-0"
        />
        <span
          className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all"
          style={{
            background: checked ? 'var(--header-green)' : 'var(--gray-200)',
          }}
        >
          <span
            className="absolute h-[18px] w-[18px] left-[3px] bottom-[3px] rounded-full transition-transform"
            style={{
              backgroundColor: 'var(--surface-color)',
              transform: checked ? 'translateX(20px)' : 'translateX(0)',
            }}
          ></span>
        </span>
      </label>
    </div>
  );
};
