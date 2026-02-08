export const IsPalindrome = (value: string) => {
  const cleanedVal = value.replace(' ', '').toLowerCase();
  const reversedVal = cleanedVal.split('').reverse().join('');
  return cleanedVal === reversedVal;
};
