import { expect } from 'chai';
import Util from './Util';

describe('Util()', () => {
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
