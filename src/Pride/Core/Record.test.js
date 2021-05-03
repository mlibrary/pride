import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import Record from './Record';

describe('Record()', () => {
  beforeEach(() => {
    const dom = new JSDOM();
    global.window = dom.window;
    global.document = dom.window.document;
    this.data = {
      source: 'https://lib.umich.edu/',
      names: ['Homer', 'Marge', 'Bart', 'Lisa', 'Maggie']
    };
    this.recordExample = new Record(this.data);
  });
  it('works', () => {
    expect(Record).to.not.be.null;
  });
  describe('placeHold()', () => {
    it('is a function', () => {
      expect(this.recordExample.placeHold).to.be.a('function');
    });
  });
  describe('getHoldings()', () => {
    it('is a function', () => {
      expect(this.recordExample.getHoldings).to.be.a('function');
    });
  });
  describe('getGetThis()', () => {
    it('is a function', () => {
      expect(this.recordExample.getGetThis).to.be.a('function');
    });
  });
  describe('renderPart()', () => {
    it('is a function', () => {
      expect(this.recordExample.renderPart).to.be.a('function');
    });
  });
  describe('renderPartThenCache()', () => {
    it('is a function', () => {
      expect(this.recordExample.renderPartThenCache).to.be.a('function');
    });
  });
  describe('renderFull()', () => {
    it('is a function', () => {
      expect(this.recordExample.renderFull).to.be.a('function');
    });
  });
  describe('renderCSL()', () => {
    it('is a function', () => {
      expect(this.recordExample.renderCSL).to.be.a('function');
    });
  });
});
