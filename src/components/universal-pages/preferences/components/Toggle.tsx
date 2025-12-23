import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export const Toggle: FC<ToggleProps> = ({ checked, onChange, disabled }) => (
  <label className="relative inline-block w-11 h-6">
    <input type="checkbox" className="opacity-0 w-0 h-0 !bg-white" checked={checked} onChange={onChange} disabled={disabled} />
    <span className={cn(
      "absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#DFDDDB] transition-all duration-300 rounded-full before:absolute before:content-[''] before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:transition-all before:duration-300 before:rounded-full before:shadow-[0_1px_3px_rgba(0,0,0,0.2)]",
      checked && "bg-[#0B6333] before:translate-x-5",
      disabled && "opacity-50 cursor-not-allowed"
    )} />
  </label>
);
