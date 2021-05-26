import { expect } from 'chai';
import FacetSearch from './FacetSearch';
import FuncBuffer from '../Util/FuncBuffer';

describe('FacetSearch()', () => {
  beforeEach(() => {
    this.setup = {
      data: {},
      results: {}
    };
    this.facetSearchExample = new FacetSearch(this.setup);
    this.funcBuffKeys = Object.keys(new FuncBuffer());
  });
  it('works', () => {
    console.log(this.facetSearchExample);
    expect(FacetSearch).to.not.be.null;
  });
  describe('uid', () => {
    it('equals `setup.data.uid`', () => {
      expect(this.facetSearchExample.uid).to.equal(this.setup.data.uid);
    });
  });
  describe('getData()', () => {
    it('returns `setup.data`', () => {
      expect(this.facetSearchExample.getData()).to.equal(this.setup.data);
    });
  });
  describe('getResults()', () => {
    it('returns `setup.results`', () => {
      expect(this.facetSearchExample.getResults()).to.equal(this.setup.results);
    });
  });
  describe('getMute()', () => {
    it('returns false by default', () => {
      expect(this.facetSearchExample.getMute()).to.be.false;
    });
  });
  describe('setMute()', () => {
    it('returns self', () => {
      expect(this.facetSearchExample.setMute()).to.equal(this.facetSearchExample);
    });
    it('returns self', () => {
      expect(this.facetSearchExample.setMute()).to.equal(this.facetSearchExample);
    });
  });
  describe('clearAllObservers()', () => {
    it('returns self', () => {
      expect(this.facetSearchExample.clearAllObservers()).to.equal(this.facetSearchExample);
    });
  });
  describe('resultsObservers()', () => {
    it('returns an object', () => {
      expect(this.facetSearchExample.resultsObservers).to.be.an('object');
    });
    it('contains all FuncBuff() properties', () => {
      expect(this.facetSearchExample.resultsObservers).to.include.all.keys(this.funcBuffKeys);
    });
    it('adds "notify" property', () => {
      expect(this.facetSearchExample.resultsObservers).to.include.key('notify');
    });
  });
  describe('setDataObservers()', () => {
    it('returns an object', () => {
      expect(this.facetSearchExample.setDataObservers).to.be.an('object');
    });
    it('contains all FuncBuff() properties', () => {
      expect(this.facetSearchExample.resultsObservers).to.include.all.keys(this.funcBuffKeys);
    });
    it('adds "notify" property', () => {
      expect(this.facetSearchExample.resultsObservers).to.include.key('notify');
    });
  });
  describe('runDataObservers()', () => {
    it('returns an object', () => {
      expect(this.facetSearchExample.runDataObservers).to.be.an('object');
    });
    it('contains all FuncBuff() properties', () => {
      expect(this.facetSearchExample.resultsObservers).to.include.all.keys(this.funcBuffKeys);
    });
    it('adds "notify" property', () => {
      expect(this.facetSearchExample.resultsObservers).to.include.key('notify');
    });
  });
});
