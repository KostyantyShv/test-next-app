import { useState } from "react";

export const useExpand = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(
    new Set()
  );

  const handleDescriptionToggle = (descId: string) => {
    const newExpanded = new Set(expandedDescriptions);
    if (newExpanded.has(descId)) {
      newExpanded.delete(descId);
    } else {
      newExpanded.add(descId);
    }
    setExpandedDescriptions(newExpanded);
  };

  return { handleDescriptionToggle, expandedDescriptions };
};
