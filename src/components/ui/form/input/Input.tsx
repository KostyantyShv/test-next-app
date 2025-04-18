"use client";

import { InputHTMLAttributes, ReactNode, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  showPasswordToggle?: boolean;
}

const Input = ({
  icon,
  showPasswordToggle = false,
  type = "text",
  className = "",
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-3 top-1/3 -translate-y-1/2 text-[#666]">
          {icon}
        </div>
      )}
      <input
        type={inputType}
        className={`w-full p-2 ${
          icon ? "pl-10" : "pl-2"
        } border border-[#ddd] rounded-md text-sm text-[#333] bg-white focus:outline-none focus:border-[#356EF5] transition-colors duration-200 ${className}`}
        {...props}
      />
      {showPasswordToggle && type === "password" && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#666]"
          onClick={togglePasswordVisibility}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              fill="currentColor"
            />
            {showPassword && (
              <path
                d="M2 2L22 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      )}
    </div>
  );
};

export default Input;
