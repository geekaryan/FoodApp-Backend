const sum = require('./sum');

test('sum should add two numbers toether', function () {
  expect(sum(2, 2)).toBe(4);
});
