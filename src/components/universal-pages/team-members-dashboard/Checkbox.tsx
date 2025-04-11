export const Checkbox: React.FC<{
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ checked, onChange }) => {
  return (
    <label className="checkbox-wrapper inline-flex items-center justify-center cursor-pointer">
      <input
        type="checkbox"
        className="absolute opacity-0 h-0 w-0"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`relative h-4 w-4 border-2 rounded transition-colors duration-200 ${
          checked
            ? "bg-[#0B6333] border-[#0B6333]"
            : "bg-white border-gray-300 hover:border-gray-400"
        }`}
      >
        {checked && (
          <svg
            className="absolute inset-0 m-auto w-2.5 h-2.5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>
    </label>
  );
};
