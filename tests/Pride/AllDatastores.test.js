import { expect } from 'chai';
import AllDatastores from '../../src/Pride/AllDatastores';

describe('AllDatastores()', function() {
  beforeEach(() => {
    this.allDatastoresExample = { ...AllDatastores };
    this.allDatastoresExample.array = [
      {
        uid: 'test0',
        get: function() {
          return this.uid;
        }
      },
      {
        uid: 'test1',
        get: function() {
          return this.uid;
        }
      },
      {
        uid: 'test2',
        get: function() {
          return this.uid;
        },
        baseSearch: () => 'baseSearch results'
      }
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
    it('finds and returns the first instance where the argument equals the `uid` value', () => {
      const arrayIndex = 1;
      expect(this.allDatastoresExample.get(`test${arrayIndex}`)).to.equal(this.allDatastoresExample.array[arrayIndex]);
    });
  });
  describe('newSearch()', () => {
    it('returns a function', () => {
      expect(this.allDatastoresExample.newSearch).to.be.a('function');
    });
    it('returns `undefined` if nothing found', () => {
      expect(this.allDatastoresExample.newSearch('test')).to.be.undefined;
    });
    it('requires `baseSearch()` to exist', () => {
      expect(() => this.allDatastoresExample.newSearch('test1')).to.throw('datastore.baseSearch is not a function');
    });
    it('returns the `baseSearch()` of the found datastore', () => {
      const arrayIndex = 2;
      expect(this.allDatastoresExample.newSearch(`test${arrayIndex}`)).to.equal(this.allDatastoresExample.array[arrayIndex].baseSearch());
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
