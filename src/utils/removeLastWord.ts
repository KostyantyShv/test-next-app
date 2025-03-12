export const removeLastWord = (str: string): string => {
  const words = str.split(" ");

  if (words.length <= 1) {
    return "";
  }

  words.pop();
  return words.join(" ");
};
