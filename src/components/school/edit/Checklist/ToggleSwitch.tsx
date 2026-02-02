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
    <div className="view-toggle">
      <span className="toggle-label">{label}</span>
      <label className={`toggle-switch ${checked ? "checked" : ""}`}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="toggle-slider" />
      </label>
    </div>
  );
};
