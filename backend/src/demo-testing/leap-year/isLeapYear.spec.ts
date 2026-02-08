import { isLeapYear } from './isLeapYear';

describe('isLeapYear', () => {
  it('should return true for a simple leap year 2024', () => {
    expect(isLeapYear(2024)).toBe(true);
  });

  it('should return true for a leap year divisible by 400 (2000)', () => {
    expect(isLeapYear(2000)).toBe(true);
  });

  it('should return false for a common year (2023)', () => {
    expect(isLeapYear(2023)).toBe(false);
  });

  it('should return false for a century year not divisible by 400 (1900)', () => {
    expect(isLeapYear(1900)).toBe(false);
  });
});
