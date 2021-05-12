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
        toSection: () => {}
      },
      requestFunc: '',
      starting_results: '',
      cacheSize: 1
    };
    this.parent = {
      getData: ''
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
    it('returns a function', () => {
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
    it('returns a function', () => {
      expect(() => this.searchBaseExample.query()).to.be.a('function');
    });
  });
  describe('log()', () => {
    it('returns a function', () => {
      expect(() => this.searchBaseExample.log()).to.be.a('function');
    });
  });
  describe('set()', () => {
    it('returns a function', () => {
      expect(() => this.searchBaseExample.set()).to.be.a('function');
    });
  });
  describe('run()', () => {
    it('returns a function', () => {
      expect(() => this.searchBaseExample.run()).to.be.a('function');
    });
  });
  describe('results()', () => {
    it('returns a function', () => {
      expect(() => this.searchBaseExample.results()).to.be.a('function');
    });
  });
  describe('clearAllObservers()', () => {
    it('returns a function', () => {
      expect(() => this.searchBaseExample.clearAllObservers()).to.be.a('function');
    });
  });
  describe('getMute()', () => {
    it('returns a function', () => {
      expect(() => this.searchBaseExample.getMute()).to.be.a('function');
    });
  });
  describe('setMute()', () => {
    it('returns a function', () => {
      expect(() => this.searchBaseExample.setMute()).to.be.a('function');
    });
  });
  describe('createObservable()', () => {
    it('returns a function', () => {
      expect(() => this.searchBaseExample.createObservable()).to.be.a('function');
    });
  });
});
