import { IsPalindrome } from './IsPalindrome';

describe('IsPalindrome', () => {
  it('should return true for a palindrome string', () => {
    expect(IsPalindrome('aabaa')).toBe(true);
  });
  it('should return false for a non-palindrome string', () => {
    expect(IsPalindrome('abc')).toBe(false);
  });
  it('should return true for an empty string', () => {
    expect(IsPalindrome('')).toBe(true);
  });
  it('should handle spaces "nurses run" to be true', () => {
    expect(IsPalindrome('nurses run')).toBe(true);
  });

  it('should handle casing "Aba" to be true', () => {
    expect(IsPalindrome('Aba')).toBe(true);
  });

  it('should handle numbers "a1a" to be true', () => {
    expect(IsPalindrome('a1a')).toBe(true);
  });
});
