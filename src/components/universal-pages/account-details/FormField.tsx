import React, { forwardRef } from "react";
import { FormFieldChangeEvent } from "./types";

interface FormFieldProps {
  label?: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: FormFieldChangeEvent) => void;
  readOnly?: boolean;
  disabled?: boolean;
  accept?: string;
  className?: string;
  children?: React.ReactNode;
  as?: "input" | "select" | "textarea";
  options?: { value: string; label: string }[];
  hint?: string;
  min?: number;
  max?: number;
  step?: string;
}

// Use forwardRef to allow ref to be passed to the underlying input/select/textarea
const FormField = forwardRef<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  FormFieldProps
>(
  (
    {
      label,
      id,
      name,
      type = "text",
      placeholder,
      value,
      onChange,
      readOnly,
      disabled,
      accept,
      className = "",
      children,
      as = "input",
      options,
      hint,
      min,
      max,
      step,
    },
    ref
  ) => {
    const baseStyles =
      "w-full p-2.5 border border-border-color rounded !bg-white text-text-color focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors";
    const readOnlyStyles =
      readOnly || disabled
        ? "!bg-white cursor-not-allowed opacity-80"
        : "";
    const inputStyles = `${baseStyles} ${readOnlyStyles} ${className}`;

    return (
      <div className="mb-5 last:mb-0">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-text-color mb-2"
          >
            {label}
          </label>
        )}
        {as === "input" && !children && (
          <input
            ref={ref as React.Ref<HTMLInputElement>} // Cast ref to input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            disabled={disabled}
            accept={accept}
            className={inputStyles}
            min={min}
            max={max}
            step={step}
          />
        )}
        {as === "select" && !children && (
          <div className="relative">
            <select
              ref={ref as React.Ref<HTMLSelectElement>} // Cast ref to select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={`${inputStyles} appearance-none pr-10 !bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewBox%3d%220%200%2024%2024%22%20fill%3d%22none%22%20stroke%3d%22%234A4A4A%22%20stroke-width%3d%222%22%20stroke-linecap%3d%22round%22%20stroke-linejoin%3d%22round%22%3e%3cpolyline%20points%3d%226%209%2012%2015%2018%209%22%3e%3c%2fpolyline%3e%3c%2fsvg%3e')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px]`}
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {as === "textarea" && !children && (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>} // Cast ref to textarea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            disabled={disabled}
            className={`${inputStyles} min-h-[90px] resize-y`}
          />
        )}
        {children}
        {hint && (
          <span className="block text-xs text-text-muted mt-1">{hint}</span>
        )}
      </div>
    );
  }
);

// Set display name for better debugging
FormField.displayName = "FormField";

export default FormField;
