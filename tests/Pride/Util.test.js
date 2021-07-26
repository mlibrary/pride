import { expect } from 'chai';
import Util from '../../src/Pride/Util';

describe('Util()', function() {
  it('works', () => {
    expect(Util).to.not.be.null;
  });
  it('returns an object', () => {
    expect(Util).to.be.an('object');
  });
  Object.getOwnPropertyNames(Util).forEach((property) => {
    describe(`Util.${property}`, () => {
      it('works', () => {
        expect(Util[property]).to.not.be.null;
      });
      it('is a function', () => {
        expect(Util[property]).to.be.a('function');
      });
    });
  });
});
