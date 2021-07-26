import { expect } from 'chai';
import Core from './Core';

describe('Core()', () => {
  it('works', () => {
    expect(Core).to.not.be.null;
  });
  it('returns an object', () => {
    expect(Core).to.be.an('object');
  });
  Object.getOwnPropertyNames(Core).forEach((property) => {
    describe(`Core.${property}`, () => {
      it('works', () => {
        expect(Core[property]).to.not.be.null;
      });
      it('is a function', () => {
        expect(Core[property]).to.be.a('function');
      });
    });
  });
});
