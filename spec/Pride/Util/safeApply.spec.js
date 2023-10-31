const { expect } = require('chai');
const safeApply = require('../../../pride').Pride.Util.safeApply;

// Given a safeApply/safeCall like function, check that it has the correct basic behavior
const testSafeFuncCaller = (caller) => {
  describe("given something that isn't a function", function () {
    it('returns the given object', function () {
      const object = {};
      expect(caller(object)).to.equal(object);
    });
  });

  describe('given a function, calls the function', function () {
    it('returns the result of calling the function', function () {
      const returned = 8435;
      expect(caller(() => {
        return returned;
      })).to.equal(returned);
    });
  });
};

describe('Pride.Util.safeApply()', function () {
  testSafeFuncCaller(safeApply);
  describe('given additional arguments', function () {
    let returnedFirst, returnedSecond;
    const args = ['first!', 'not first!'];
    safeApply(
      (first, second) => {
        returnedFirst = first;
        returnedSecond = second;
      },
      args
    );
    it('passes given argument into the function', function () {
      expect(returnedFirst).to.equal(args[0]);
    });
    it('can pass multiple arguments', function () {
      expect(returnedSecond).to.equal(args[1]);
    });
  });
});

exports.testSafeFuncCaller = testSafeFuncCaller;
