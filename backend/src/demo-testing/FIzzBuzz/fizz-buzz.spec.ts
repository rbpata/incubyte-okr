import { FizzBuzz } from './fizz-buzz';

describe('FizzBuzz', () => {
  it('should return FizzBuzz for multiples of 3 and 5', () => {
    expect(FizzBuzz(15)).toBe('FizzBuzz');
    expect(FizzBuzz(30)).toBe('FizzBuzz');
  });

  it('should return Fizz for multiples of 3', () => {
    expect(FizzBuzz(3)).toBe('Fizz');
    expect(FizzBuzz(9)).toBe('Fizz');
  });

  it('should return Buzz for multiples of 5', () => {
    expect(FizzBuzz(5)).toBe('Buzz');
    expect(FizzBuzz(20)).toBe('Buzz');
  });

  it('should return a single space for non-multiples of 3 or 5', () => {
    expect(FizzBuzz(1)).toBe('');
    expect(FizzBuzz(7)).toBe('');
  });
});
