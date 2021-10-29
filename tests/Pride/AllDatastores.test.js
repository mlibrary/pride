import { expect } from 'chai';
import AllDatastores from '../../src/Pride/AllDatastores';

describe('AllDatastores()', function() {
  beforeEach(() => {
    this.allDatastoresExample = { ...AllDatastores };
    this.allDatastoresExample.array = [
      { uid: 'test1' },
      { uid: 'test2' },
      { uid: 'test3' }
    ];
  });
  it('works', () => {
    expect(this.allDatastoresExample).to.not.be.null;
  });
  it('returns an object', () => {
    expect(this.allDatastoresExample).to.be.an('object');
  });
  describe('array', () => {
    it('returns an array', () => {
      expect(this.allDatastoresExample.array).to.be.an('array');
    });
    it('is empty by default', () => {
      expect(AllDatastores.array).to.be.empty;
    });
  });
  describe('get()', () => {
    it('returns a function', () => {
      expect(this.allDatastoresExample.get).to.be.a('function');
    });
  });
  describe('newSearch()', () => {
    it('returns a function', () => {
      expect(this.allDatastoresExample.newSearch).to.be.a('function');
    });
  });
  describe('each()', () => {
    it('returns a function', () => {
      expect(this.allDatastoresExample.each).to.be.a('function');
    });
    it('iterates over this.array, and invokes the given function', () => {
      const eachExample = [];
      this.allDatastoresExample.each((obj) => eachExample.push(obj.uid));
      expect(eachExample).to.deep.equal(this.allDatastoresExample.array.map((obj) => obj.uid));
    });
    it('returns itself', () => {
      expect(this.allDatastoresExample.each(() => {})).to.equal(this.allDatastoresExample);
    });
  });
});
