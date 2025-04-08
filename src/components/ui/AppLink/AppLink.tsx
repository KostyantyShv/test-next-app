// components/ui/AppLink.tsx
import Link from "next/link";
import { ReactNode } from "react";

interface AppLinkProps {
  href: string;
  children: ReactNode;
  variant?: "default" | "primary" | "underline";
  className?: string;
}

const AppLink = ({
  href,
  children,
  variant = "default",
  className = "",
}: AppLinkProps) => {
  const variantStyles = {
    default: "text-[#666]",
    primary: "text-[#356EF5]",
    underline: "text-[#356EF5] underline font-medium",
  };

  return (
    <Link
      href={href}
      className={`${variantStyles[variant]} cursor-pointer hover:underline ${className}`}
    >
      {children}
    </Link>
  );
};

export default AppLink;
