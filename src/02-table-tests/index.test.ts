// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 8, b: 4, action: Action.Subtract, expected: 4 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 5, b: 4, action: Action.Multiply, expected: 20 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: undefined, b: null, action: Action.Add, expected: null },
  { a: 1, b: 1, action: '%$', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'for $a $action $b expected $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
