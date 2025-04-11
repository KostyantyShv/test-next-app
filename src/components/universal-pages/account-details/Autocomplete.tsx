import React, { useState, useEffect, useRef } from "react";

interface AutocompleteProps {
  id: string;
  placeholder: string;
  dataList: string[];
  selectedItems: string[];
  onAddItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  id,
  placeholder,
  dataList,
  selectedItems,
  onAddItem,
  onRemoveItem,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length < 1) {
      setResults([]);
      setIsActive(false);
      return;
    }

    const filtered = dataList
      .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 10);
    setResults(filtered);
    setIsActive(filtered.length > 0);
  };

  const handleSelect = (item: string) => {
    if (!selectedItems.includes(item)) {
      onAddItem(item);
    }
    setQuery("");
    setResults([]);
    setIsActive(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        id={id}
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full p-2.5 border border-border-color rounded bg-input-bg text-text-color focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <div
        className={`absolute top-[calc(100%+2px)] left-0 right-0 bg-white border border-border-color rounded shadow-search max-h-64 overflow-y-auto z-10 ${
          isActive ? "block" : "hidden"
        }`}
      >
        {results.map((item) => (
          <div
            key={item}
            onClick={() => handleSelect(item)}
            className="p-2.5 cursor-pointer hover:bg-readonly-bg border-b border-gray-200 last:border-b-0"
          >
            {item.toLowerCase().includes(query.toLowerCase()) ? (
              <>
                {item.substring(
                  0,
                  item.toLowerCase().indexOf(query.toLowerCase())
                )}
                <strong>
                  {item.substring(
                    item.toLowerCase().indexOf(query.toLowerCase()),
                    item.toLowerCase().indexOf(query.toLowerCase()) +
                      query.length
                  )}
                </strong>
                {item.substring(
                  item.toLowerCase().indexOf(query.toLowerCase()) + query.length
                )}
              </>
            ) : (
              item
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-2.5 p-2 border border-gray-200 rounded bg-gray-50 min-h-10">
        {selectedItems.map((item) => (
          <div
            key={item}
            className="inline-flex items-center bg-gray-200 rounded px-2.5 py-1 text-xs text-text-color"
            data-value={item}
          >
            {item}
            <span
              onClick={() => onRemoveItem(item)}
              className="ml-2 cursor-pointer text-text-muted font-bold text-base leading-none hover:text-danger-color"
            >
              ×
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Autocomplete;
