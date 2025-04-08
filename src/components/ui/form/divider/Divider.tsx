// components/ui/Divider.tsx
interface DividerProps {
  text?: string;
  className?: string;
}

const Divider = ({ text, className = "" }: DividerProps) => {
  if (text) {
    return (
      <div
        className={`flex items-center my-4 text-[#666] text-xs before:flex-1 before:h-px before:bg-[#ddd] after:flex-1 after:h-px after:bg-[#ddd] ${className}`}
      >
        <span className="px-3">{text}</span>
      </div>
    );
  }

  return <div className={`h-px bg-[#ddd] my-4 ${className}`} />;
};

export default Divider;
