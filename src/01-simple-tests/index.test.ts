// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 1, action: Action.Add });
    expect(result).toBe(2);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 1, action: Action.Subtract });
    expect(result).toBe(0);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 1, action: Action.Multiply });
    expect(result).toBe(1);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 1, action: Action.Divide });
    expect(result).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 1, action: Action.Exponentiate });
    expect(result).toBe(1);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 1, b: 1, action: "%$" });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: undefined, b: null, action: Action.Add });
    expect(result).toBe(null);
  });
});
