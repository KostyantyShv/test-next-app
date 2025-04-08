import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClickOutside?: () => void;
}

const Card = ({ children, className = "", onClickOutside }: CardProps) => {
  return (
    <div
      className={`fixed inset-0 bg-[#F2F2F2] flex items-center justify-center z-[1000] transition-all duration-300 ${className}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClickOutside) {
          onClickOutside();
        }
      }}
    >
      <div className="bg-white p-8 rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-full max-w-[360px] relative flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export default Card;
