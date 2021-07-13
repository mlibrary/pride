import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import BrowseBase from './BrowseBase';

describe('BrowseBase()', () => {
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
    this.browseBaseExample = new BrowseBase(this.setup, this.parent);
  });
  it('works', () => {
    expect(BrowseBase).to.not.be.null;
  });
  describe('datastore()', () => {
    it('requires setup.datastore to be defined', () => {
      expect(() => new BrowseBase()).to.throw("Cannot read property 'datastore' of undefined");
    });
    it('is a function', () => {
      expect(() => this.browseBaseExample.datastore()).to.be.a('function');
    });
    it('returns the `datastore` value', () => {
      expect(this.browseBaseExample.datastore).to.equal(this.setup.datastore);
    });
  });
  describe('query()', () => {
    it('requires setup.query to not be null', () => {
      expect(() => new BrowseBase({ datastore: {} })).to.throw('this.datastore.baseQuery is not a function');
    });
    it('is a function', () => {
      expect(() => this.browseBaseExample.query()).to.be.a('function');
    });
    it('returns the `query` value', () => {
      expect(this.browseBaseExample.query).to.equal(this.setup.query);
    });
  });
  describe('log()', () => {
    it('is a function', () => {
      expect(() => this.browseBaseExample.log()).to.be.a('function');
    });
  });
  describe('set()', () => {
    it('is a function', () => {
      expect(() => this.browseBaseExample.set()).to.be.a('function');
    });
    it('requires Paginater.getPossibleKeys to be defined', () => {
      expect(() => this.browseBaseExample.set()).to.throw('Paginater.getPossibleKeys is not a function');
    });
  });
  describe('run()', () => {
    it('is a function', () => {
      expect(() => this.browseBaseExample.run()).to.be.a('function');
    });
    it('requires `expanded` to be defined', () => {
      expect(() => this.browseBaseExample.run()).to.throw("Cannot read property 'expanded' of undefined");
    });
  });
  describe('results()', () => {
    it('is a function', () => {
      expect(() => this.browseBaseExample.results()).to.be.a('function');
    });
    it('returns an array', () => {
      expect(this.browseBaseExample.results()).to.be.an('array');
    });
  });
  describe('clearAllObservers()', () => {
    it('is a function', () => {
      expect(() => this.browseBaseExample.clearAllObservers()).to.be.a('function');
    });
    it('returns itself', () => {
      expect(this.browseBaseExample.clearAllObservers()).to.equal(this.browseBaseExample);
    });
  });
  describe('getMute()', () => {
    it('is a function', () => {
      expect(() => this.browseBaseExample.getMute()).to.be.a('function');
    });
    it('returns a boolean', () => {
      expect(this.browseBaseExample.getMute()).to.be.a('boolean');
    });
  });
  describe('setMute()', () => {
    it('is a function', () => {
      expect(() => this.browseBaseExample.setMute()).to.be.a('function');
    });
    it('returns itself', () => {
      expect(this.browseBaseExample.setMute()).to.equal(this.browseBaseExample);
    });
  });
  describe('createObservable()', () => {
    it('is a function', () => {
      expect(() => this.browseBaseExample.createObservable()).to.be.a('function');
    });
    it('returns itself', () => {
      expect(this.browseBaseExample.createObservable()).to.equal(this.browseBaseExample);
    });
  });
});
