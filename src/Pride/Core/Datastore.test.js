import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import Datastore from './Datastore';
import Query from './Query';

describe('Datastore()', () => {
  beforeEach(() => {
    const dom = new JSDOM();
    global.window = dom.window;
    this.args = {
      url: 'http://localhost:3000'
    };
    this.datastoreExample = new Datastore(this.args);
  });
  it('works', () => {
    expect(Datastore).to.not.be.null;
  });
  it('returns an object', () => {
    expect(this.datastoreExample).to.be.an('object');
  });
  describe('baseQuery()', () => {
    it('is a function', () => {
      expect(this.datastoreExample.baseQuery).to.be.a('function');
    });
    it('returns a Query instance', () => {
      expect(Object.keys(this.datastoreExample.baseQuery())).to.deep.equal(Object.keys(new Query({})));
    });
  });
  describe('baseSearch()', () => {
    it('is a function', () => {
      expect(this.datastoreExample.baseSearch).to.be.a('function');
    });
  });
  describe('runQuery()', () => {
    it('is a function', () => {
      expect(this.datastoreExample.runQuery).to.be.a('function');
    });
    it('requires argument to have `url` property', () => {
      expect(() => this.datastoreExample.runQuery()).to.throw('Cannot set property \'url\' of undefined');
    });
    // Commented out to not run 'request'.
    /*
     * it('returns self', () => {
     *   expect(this.datastoreExample.runQuery({})).to.deep.equal(this.datastoreExample);
     * });
     */
  });
  describe('baseBrowse()', () => {
    it('is a function', () => {
      expect(this.datastoreExample.baseBrowse).to.be.a('function');
    });
  });
  describe('runBrowse()', () => {
    it('is a function', () => {
      expect(this.datastoreExample.runBrowse).to.be.a('function');
    });
    it('requires argument to have `url` property', () => {
      expect(() => this.datastoreExample.runBrowse()).to.throw('Cannot set property \'url\' of undefined');
    });
    // Commented out to not run 'request'.
    /*
     * it('returns self', () => {
     *   expect(this.datastoreExample.runBrowse({})).to.deep.equal(this.datastoreExample);
     * });
     */
  });
  describe('get()', () => {
    it('is a function', () => {
      expect(this.datastoreExample.get).to.be.a('function');
    });
    it('returns the argument\'s value by key', () => {
      expect(this.datastoreExample.get('url')).to.equal(this.args.url);
    });
  });
  describe('update()', () => {
    it('is a function', () => {
      expect(this.datastoreExample.update).to.be.a('function');
    });
    it('updates the arguments', () => {
      this.datastoreExample.update({ prop: 'value' });
      expect(this.datastoreExample.get('prop')).to.equal('value');
      expect(this.datastoreExample.get('prop')).to.not.equal(this.args.prop);
    });
  });
});
