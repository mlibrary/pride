import { expect } from 'chai';
import { before } from 'underscore';
import MultiSearch from './MultiSearch';

describe('MultiSearch()', () => {
  beforeEach(() => {
    this.uidExample = 'uid';
    this.mutedExample = false;
    this.searchArrayExample = [];
    this.multiSearchExample = new MultiSearch(this.uidExample, this.mutedExample, this.searchArrayExample);
  });
  it('works', () => {
    expect(MultiSearch).to.not.be.null;
  });
  describe('uid()', () => {
    it('returns the `uid` argument', () => {
      expect(this.multiSearchExample.uid).to.equal(this.uidExample);
    });
  });
  describe('searches()', () => {
    it('returns an array', () => {
      expect(this.multiSearchExample.searches).to.be.an('array');
    });
    it('returns the `searchArray` argument', () => {
      expect(this.multiSearchExample.searches).to.equal(this.searchArrayExample);
    });
  });
  describe('set()', () => {
    it('is a function', () => {
      expect(() => this.multiSearchExample.set()).to.be.a('function');
    });
    it('returns self', () => {
      expect(this.multiSearchExample.set([1, 2, 3])).to.equal(this.multiSearchExample);
    });
  });
  describe('run()', () => {
    it('is a function', () => {
      expect(() => this.multiSearchExample.run).to.be.a('function');
    });
    it('returns self', () => {
      expect(this.multiSearchExample.run()).to.equal(this.multiSearchExample);
    });
  });
  describe('nextPage()', () => {
    it('is a function', () => {
      expect(() => this.multiSearchExample.nextPage).to.be.a('function');
    });
    it('returns self', () => {
      expect(this.multiSearchExample.nextPage()).to.equal(this.multiSearchExample);
    });
  });
  describe('prevPage()', () => {
    it('is a function', () => {
      expect(() => this.multiSearchExample.prevPage).to.be.a('function');
    });
    it('returns self', () => {
      expect(this.multiSearchExample.prevPage()).to.equal(this.multiSearchExample);
    });
  });
  describe('getMute()', () => {
    it('is a function', () => {
      expect(() => this.multiSearchExample.getMute).to.be.a('function');
    });
    it('returns `muted` argument`', () => {
      expect(this.multiSearchExample.getMute()).to.equal(this.mutedExample);
    });
  });
  describe('setMute()', () => {
    before(() => {
      this.multiSearchExample.setMute(!this.multiSearchExample);
    });
    it('is a function', () => {
      expect(() => this.multiSearchExample.setMute).to.be.a('function');
    });
    it('updates `muted` argument', () => {
      expect(this.multiSearchExample.getMute()).to.equal(!this.multiSearchExample);
    });
  });
});
