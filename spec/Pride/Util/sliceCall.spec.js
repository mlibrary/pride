const { expect } = require('chai');
const sliceCall = require('../../../pride').Pride.Util.sliceCall;

describe('Pride.Util.sliceCall()', function () {
  const args = [1, 2, 3, 4];
  const sliceTests = (array = args) => {
    it('slices from start', function () {
      expect(sliceCall(array, 1)).to.deep.equal([2, 3, 4]);
    });

    it('slices to end', function () {
      expect(sliceCall(array, 1, 3)).to.deep.equal([2, 3]);
    });

    it('slices from end', function () {
      expect(sliceCall(array, -2)).to.deep.equal([3, 4]);
    });
  };

  describe('slicing arrays', function () {
    sliceTests();
  });

  describe('slicing array-like objects', function () {
    sliceTests((function () {
      return arguments;
    }(...args)));
  });
});
