import { expect } from 'chai';
import AllDatastores from './AllDatastores';

describe('AllDatastores()', () => {
  it('works', () => {
    expect(AllDatastores).to.not.be.null;
  });
  it('returns an object', () => {
    expect(AllDatastores).to.be.an('object');
  });
  describe('`array` property', () => {
    it('returns an array', () => {
      expect(AllDatastores.array).to.be.an('array');
    });
  });
  describe('`get` property', () => {
    it('returns a function', () => {
      expect(AllDatastores.get).to.be.a('function');
    });
  });
  describe('`newSearch` property', () => {
    it('returns a function', () => {
      expect(AllDatastores.newSearch).to.be.a('function');
    });
  });
  describe('`each` property', () => {
    it('returns a function', () => {
      expect(AllDatastores.each).to.be.a('function');
    });
  });
});
