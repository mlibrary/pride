const { expect } = require('chai');
const safeCall = require('../../../pride').Pride.Util.safeCall;
const { testSafeFuncCaller } = require('./safeApply.spec');

describe('Pride.Util.safeCall()', function () {
  testSafeFuncCaller(safeCall);

  describe('given additional arguments', function () {
    let returnedFirst, returnedSecond;
    const args = ['first!', 'not first!'];
    safeCall((first, second) => {
      returnedFirst = first;
      returnedSecond = second;
    },
    ...args);
    it('passes given argument into the function', function () {
      expect(returnedFirst).to.equal(args[0]);
    });
    it('can pass multiple arguments', function () {
      expect(returnedSecond).to.equal(args[1]);
    });
  });
});
