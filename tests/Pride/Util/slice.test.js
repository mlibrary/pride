import { expect } from 'chai';
import slice from '../../../src/Pride/Util/slice';

describe('slice()', () => {
  it('returns an array', () => {
    expect(slice([1, 2, 3], 1)).to.be.an('array');
  });

  describe('slicing arrays', () => {
    it('slices from start', () => {
      expect(slice([1, 2, 3], 1)).to.deep.equal([2, 3]);
    });

    it('slices to end', () => {
      expect(slice([1, 2, 3, 4], 1, 3)).to.deep.equal([2, 3]);
    });
  });

  describe('slicing array like objects', () => {
    beforeEach(() => {
      this.arrayLike = (function() {
        return arguments;
      }(1, 2, 3, 4));
    });

    it('slices from start', () => {
      expect(slice(this.arrayLike, 1)).to.deep.equal([2, 3, 4]);
    });

    it('slices to end', () => {
      expect(slice(this.arrayLike, 1, 3)).to.deep.equal([2, 3]);
    });
  });
});
