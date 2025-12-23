// components/ui/Checkbox.tsx
import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Checkbox = ({ label, id, className = "", ...props }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className={`w-3 h-3 border border-[#ddd] rounded-sm !bg-white ${className}`}
        {...props}
      />
      <label htmlFor={id} className="text-xs text-[#333]">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
