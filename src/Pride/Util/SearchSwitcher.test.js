import { expect } from 'chai';
import MultiSearch from './MultiSearch';
import SearchSwitcher from './SearchSwitcher';

describe('SearchSwitcher()', () => {
  beforeEach(() => {
    this.uidExample = 'uid';
    this.mutedExample = true;
    this.searchArrayExample = [];
    this.currentSearchExample = new MultiSearch(this.uidExample, this.mutedExample, this.searchArrayExample);
    this.uidExample1 = 'uid test';
    this.currentSearchExample1 = new MultiSearch(this.uidExample1, this.mutedExample, this.searchArrayExample);
    this.cachedSearchesExample = [this.currentSearchExample1];
    this.searchSwitcherExample = new SearchSwitcher(this.currentSearchExample, this.cachedSearchesExample);
  });
  it('works', () => {
    expect(SearchSwitcher).to.not.be.null;
  });
  describe('uid()', () => {
    it('returns the `uid` property of `currentSearch` argument', () => {
      expect(this.searchSwitcherExample.uid).to.equal(this.uidExample);
    });
  });
  describe('run()', () => {
    it('is a function', () => {
      expect(() => this.searchSwitcherExample.run).to.be.a('function');
    });
    it('returns self', () => {
      expect(this.searchSwitcherExample.run()).to.equal(this.searchSwitcherExample);
    });
  });
  describe('set()', () => {
    it('is a function', () => {
      expect(() => this.searchSwitcherExample.set).to.be.a('function');
    });
    it('returns self', () => {
      expect(this.searchSwitcherExample.set()).to.equal(this.searchSwitcherExample);
    });
  });
  describe('nextPage()', () => {
    it('is a function', () => {
      expect(() => this.searchSwitcherExample.nextPage).to.be.a('function');
    });
    it('returns self', () => {
      expect(this.searchSwitcherExample.nextPage()).to.equal(this.searchSwitcherExample);
    });
  });
  describe('prevPage()', () => {
    it('is a function', () => {
      expect(() => this.searchSwitcherExample.prevPage).to.be.a('function');
    });
    it('returns self', () => {
      expect(this.searchSwitcherExample.prevPage()).to.equal(this.searchSwitcherExample);
    });
  });
  describe('switchTo()', () => {
    it('is a function', () => {
      expect(() => this.searchSwitcherExample.switchTo).to.be.a('function');
    });
    it('throws if the UID could not be found', () => {
      expect(() => this.searchSwitcherExample.switchTo()).to.throw();
    });
    it('returns self', () => {
      expect(this.searchSwitcherExample.switchTo('uid')).to.equal(this.searchSwitcherExample);
    });
    it('updates `this.uid`', () => {
      this.searchSwitcherExample.switchTo(this.uidExample1);
      expect(this.searchSwitcherExample.uid).to.equal(this.uidExample1);
    });
    it('updates `currentSearch.setMute()` to true', () => {
      this.searchSwitcherExample.switchTo(this.uidExample1);
      expect(this.currentSearchExample.getMute()).to.be.true;
    });
  });
});
