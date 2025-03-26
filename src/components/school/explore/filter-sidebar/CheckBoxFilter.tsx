interface CheckboxFilterProps {
  label: string;
  filter: string;
  value: string;
  parent?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  label,
  filter,
  value,
  parent,
  onChange,
}) => (
  <label className="flex items-center gap-2 p-2 cursor-pointer rounded hover:bg-[#f8fafc] font-normal text-sm">
    <input
      type="checkbox"
      className="w-4 h-4 border-2 border-[#cbd5e0] rounded cursor-pointer"
      data-filter={filter}
      data-value={value}
      data-parent={parent}
      onChange={onChange}
    />
    {label}
  </label>
);
