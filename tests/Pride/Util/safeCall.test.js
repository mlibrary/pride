import { expect } from 'chai';
import safeCall from '../../../src/Pride/Util/safeCall';

describe('safeCall()', function() {
  describe('given something that isn\'t a function', () => {
    it('returns the given object', () => {
      const object = {};
      expect(safeCall(object)).to.equal(object);
    });
  });

  describe('given a function, calls the function', () => {
    it('returns the result of calling the function', () => {
      const returned = 8435;
      const example = () => returned;
      expect(safeCall(example)).to.equal(returned);
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

      safeCall(example, this.givenFirst, this.givenSecond);
    });

    it('passes given argument into the fuction', () => {
      expect(this.returnedFirst).to.equal(this.givenFirst);
    });

    it('can pass multiple arguments', () => {
      expect(this.returnedSecond).to.equal(this.givenSecond);
    });
  });
});
