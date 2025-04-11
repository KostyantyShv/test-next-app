import React from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="mb-5">
      <span className="block text-sm font-medium text-text-color mb-2">
        {label}
      </span>
      <div className="flex gap-7">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="w-4 h-4 text-primary border-border-color focus:ring-0 cursor-pointer"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2.5 text-sm text-text-color cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
