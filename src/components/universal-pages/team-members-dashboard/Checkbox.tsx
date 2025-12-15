export const Checkbox: React.FC<{
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ checked, onChange }) => {
  return (
    <label className="checkbox-wrapper inline-flex items-center justify-center cursor-pointer">
      <input
        type="checkbox"
        className="peer absolute opacity-0 h-0 w-0"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`relative h-4 w-4 border-2 rounded transition-colors duration-200
        bg-white border-gray-300 hover:border-gray-400
        peer-checked:bg-[#0B6333] peer-checked:border-[#0B6333]`}
      >
        {checked && (
          <svg
            className="absolute inset-0 m-auto w-3 h-3 text-white"
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
