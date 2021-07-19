import { expect } from 'chai';
import safeApply from '../../../src/Pride/Util/safeApply';

describe('safeApply()', function() {
  describe('given something that isn\'t a function', () => {
    it('returns the given object', () => {
      const object = {};
      expect(safeApply(object)).to.equal(object);
    });
  });

  describe('given a function, calls the function', () => {
    it('returns the result of calling the function', () => {
      const returned = 8435;
      const example = () => returned;
      expect(safeApply(example)).to.equal(returned);
    });
  });

  describe('given additional arguments', () => {
    before(() => {
      this.givenFirst = 'first!';
      this.givenSecond = 'not first!';
      this.returnedFirst = this.returnedSecond = null;

      const example = (first, second) => {
        this.returnedFirst = first;
        this.returnedSecond = second;
      };

      safeApply(example, [this.givenFirst, this.givenSecond]);
    });

    it('passes given argument into the fuction', () => {
      expect(this.returnedFirst).to.equal(this.givenFirst);
    });

    it('can pass multiple arguments', () => {
      expect(this.returnedSecond).to.equal(this.givenSecond);
    });
  });
});
