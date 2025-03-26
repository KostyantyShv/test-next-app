export const toggleFilter = <T>(currentItems: T[], newItem: T): T[] =>
  currentItems.includes(newItem)
    ? currentItems.filter((item) => item !== newItem)
    : [...currentItems, newItem];
