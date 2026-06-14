import { sum } from "./export.js";

// toBe() checks for exact equality, similar to ==
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});


// toEqual() checks for equality recursively
// toStrictEqual() factors in undefined data fields
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});

