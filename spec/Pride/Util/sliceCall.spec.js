const { expect } = require('chai');
const sliceCall = require('../../../pride').Pride.Util.sliceCall;

describe('Pride.Util.sliceCall()', function () {
  const args = [1, 2, 3, 4];

  describe('slicing arrays', function () {
    it('slices from start', function () {
      expect(sliceCall(args, 1)).to.deep.equal([2, 3, 4]);
    });

    it('slices to end', function () {
      expect(sliceCall(args, 1, 3)).to.deep.equal([2, 3]);
    });
  });

  describe('slicing array-like objects', function () {
    const arrayLike = (function () {
      return arguments;
    }(...args));

    it('slices from start', function () {
      expect(sliceCall(arrayLike, 1)).to.deep.equal([2, 3, 4]);
    });

    it('slices to end', function () {
      expect(sliceCall(arrayLike, 1, 3)).to.deep.equal([2, 3]);
    });
  });
});
