// components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "social" | "secondary";
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const Button = ({
  variant = "primary",
  children,
  icon,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 p-2";

  const variantStyles = {
    primary: "bg-[#356EF5] text-white border-none hover:bg-[#2a5cd9]",
    outline:
      "border border-[#ddd] bg-white text-[#333] hover:bg-[#f8f8f8] hover:border-[#ccc]",
    social:
      "flex items-center justify-center gap-2 border border-[#ddd] bg-white text-[#333] text-xs font-semibold hover:bg-[#f8f8f8] hover:border-[#ccc] tracking-[0.2px]",
    secondary: "bg-[#f1f1f1] text-[#333] border-none hover:bg-[#e1e1e1]",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {variant === "social" ? (
        <>
          {icon && <span className="w-4 h-4">{icon}</span>}
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
