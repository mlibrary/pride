const { expect } = require('chai');
const Pride = require('../../../pride').Pride;
const { testSafeFuncCaller } = require('./safeApply.spec');

describe('Pride.Util.safeCall()', function () {
  testSafeFuncCaller(Pride.Util.safeCall);

  describe('given additional arguments', function () {
    beforeEach(function () {
      const self = this;

      this.givenFirst = 'first!';
      this.givenSecond = 'not first!';

      this.returnedFirst = null;
      this.returnedSecond = null;

      this.example = function (first, second) {
        self.returnedFirst = first;
        self.returnedSecond = second;
      };

      Pride.Util.safeCall(this.example, this.givenFirst, this.givenSecond);
    });

    it('passes given argument into the fuction', function () {
      expect(this.returnedFirst).to.equal(this.givenFirst);
    });

    it('can pass multiple arguments', function () {
      expect(this.returnedSecond).to.equal(this.givenSecond);
    });
  });
});
