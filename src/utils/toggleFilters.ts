export const toggleFilter = <T>(currentItems: T[], newItem: T): T[] => {
  console.log(currentItems);

  return currentItems.includes(newItem)
    ? currentItems.filter((item) => item !== newItem)
    : [...currentItems, newItem];
};
