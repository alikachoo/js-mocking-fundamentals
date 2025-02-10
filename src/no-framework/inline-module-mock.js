/**
 * Task: refactor the code to mock the entire module.
 *
 * Execute: Use `npx jest --watch src/no-framework/inline-module-mock.js` to watch the test
 */

function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  mockFn.mockImplementation = (fn) => impl = fn;
  return mockFn
}

function spyOn(obj, prop) {
  const originalObj = obj[prop];
  obj[prop] = fn();
  obj[prop].mockRestore = () => obj[prop] = originalObj;
}


const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

spyOn(utils, 'getWinner')
utils.getWinner.mockImplementation((p1, p2) => p1)

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C. Dodds')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler'],
])

// cleanup

/**
 * Hints:
 * - https://nodejs.org/api/modules.html#modules_caching
 *
 * Checkout master branch to see the answer.
 */
