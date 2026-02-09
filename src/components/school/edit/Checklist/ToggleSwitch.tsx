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
    <div className="flex items-center gap-[5px] text-[var(--subtle-text)]">
      <span className="text-[12px] whitespace-nowrap">
        {label}
      </span>
      
      <label className="relative inline-block w-[36px] h-[20px]">
        <input 
          type="checkbox" 
          className="peer sr-only" 
          checked={checked} 
          onChange={onChange} 
        />
        
        <span className="absolute inset-0 cursor-pointer rounded-[20px] bg-[#E5E7EB] transition-all duration-[400ms] peer-checked:bg-[var(--active-green)] before:content-[''] before:absolute before:h-[16px] before:w-[16px] before:left-[2px] before:bottom-[2px] before:bg-white before:rounded-full before:transition-all before:duration-[400ms] peer-checked:before:translate-x-[16px]" />
      </label>
    </div>
  );
};

export const ControlsBar = () => {

  return (
    // .controls-container переписаний на Tailwind:
    // display: flex -> flex
    // flex-wrap: wrap -> flex-wrap
    // justify-content: space-between -> justify-between
    // align-items: center -> items-center
    // gap: 8px -> gap-[8px]
    <div className="flex flex-wrap items-center justify-between gap-[8px]">
      
      <div className="flex items-center gap-[12px]">
        <ToggleSwitch
          label="Show Incomplete"
          checked={false} // example
          onChange={() => {}} 
        />
        <ToggleSwitch
          label="Show Issues"
          checked={true} // example
          onChange={() => {}} 
        />
      </div>
      
    </div>
  );
};