import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpened(false);
      }
    };

    if (isDropdownOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpened]);

  return { isDropdownOpened, setIsDropdownOpened, dropdownRef };
};
