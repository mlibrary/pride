import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import SearchBase from './SearchBase';

describe.only('SearchBase()', () => {
  before(() => {
    const dom = new JSDOM();
    global.window = dom.window;
    this.setup = {
      datastore: {
        baseQuery: () => {},
        runQuery: () => {},
        uid: '',
        get: () => {}
      },
      query: {
        set: () => {},
        get: () => {},
        toSection: {}
      },
      requestFunc: '',
      starting_results: '',
      cacheSize: 1
    };
    Object.defineProperty(this.setup.query, 'toSection', { value: () => {} });
    this.parent = {
      getData: () => {}
    };
    this.searchBaseExample = new SearchBase(this.setup, this.parent);
  });
  it('works', () => {
    expect(SearchBase).to.not.be.null;
  });
  describe('datastore()', () => {
    it('requires setup.datastore to be defined', () => {
      expect(() => new SearchBase()).to.throw("Cannot read property 'datastore' of undefined");
    });
    it('is a function', () => {
      expect(() => this.searchBaseExample.datastore()).to.be.a('function');
    });
    it('returns the `datastore` value', () => {
      expect(this.searchBaseExample.datastore).to.equal(this.setup.datastore);
    });
  });
  describe('query()', () => {
    it('requires setup.query to not be null', () => {
      expect(() => new SearchBase({ datastore: {} })).to.throw('this.datastore.baseQuery is not a function');
    });
    it('is a function', () => {
      expect(() => this.searchBaseExample.query()).to.be.a('function');
    });
    it('returns the `query` value', () => {
      expect(this.searchBaseExample.query).to.equal(this.setup.query);
    });
  });
  describe('log()', () => {
    it('is a function', () => {
      expect(() => this.searchBaseExample.log()).to.be.a('function');
    });
  });
  describe('set()', () => {
    it('is a function', () => {
      expect(() => this.searchBaseExample.set()).to.be.a('function');
    });
    it('requires Paginater.getPossibleKeys to be defined', () => {
      expect(() => this.searchBaseExample.set()).to.throw('Paginater.getPossibleKeys is not a function');
    });
  });
  describe('run()', () => {
    it('is a function', () => {
      expect(() => this.searchBaseExample.run()).to.be.a('function');
    });
    it('requires `expanded` to be defined', () => {
      expect(() => this.searchBaseExample.run()).to.throw("Cannot read property 'expanded' of undefined");
    });
  });
  describe('results()', () => {
    it('is a function', () => {
      expect(() => this.searchBaseExample.results()).to.be.a('function');
    });
    it('returns an array', () => {
      expect(this.searchBaseExample.results()).to.be.an('array');
    });
  });
  describe('clearAllObservers()', () => {
    it('is a function', () => {
      expect(() => this.searchBaseExample.clearAllObservers()).to.be.a('function');
    });
    it('returns itself', () => {
      expect(this.searchBaseExample.clearAllObservers()).to.equal(this.searchBaseExample);
    });
  });
  describe('getMute()', () => {
    it('is a function', () => {
      expect(() => this.searchBaseExample.getMute()).to.be.a('function');
    });
    it('returns a boolean', () => {
      expect(this.searchBaseExample.getMute()).to.be.a('boolean');
    });
  });
  describe('setMute()', () => {
    it('is a function', () => {
      expect(() => this.searchBaseExample.setMute()).to.be.a('function');
    });
    it('returns itself', () => {
      expect(this.searchBaseExample.setMute()).to.equal(this.searchBaseExample);
    });
  });
  describe('createObservable()', () => {
    it('is a function', () => {
      expect(() => this.searchBaseExample.createObservable()).to.be.a('function');
    });
    it('returns itself', () => {
      expect(this.searchBaseExample.createObservable()).to.equal(this.searchBaseExample);
    });
  });
});
