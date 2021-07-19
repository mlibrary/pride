import { expect } from 'chai';
import slice from '../../../src/Pride/Util/slice';

describe('slice()', function() {
  const sliceExamples = [
    {
      description: 'slicing arrays',
      func: ((...args) => args)(1, 2, 3, 4)
    },
    {
      description: 'slicing array like objects',
      func: (function() {
        return arguments;
      }(1, 2, 3, 4))
    }
  ];

  sliceExamples.forEach((sliceExample) => {
    describe(sliceExample.description, () => {
      it('returns an array', () => {
        expect(slice(sliceExample.func)).to.be.an('array');
      });

      it('slices from start', () => {
        expect(slice(sliceExample.func, 1)).to.deep.equal([2, 3, 4]);
      });

      it('slices to end', () => {
        expect(slice(sliceExample.func, 1, 3)).to.deep.equal([2, 3]);
      });
    });
  });
});
