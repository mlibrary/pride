import { expect } from 'chai';
import Query from './Query';
import Section from '../Util/Section';

describe('Query()', () => {
  beforeEach(() => {
    this.queryInfo = {
      start: 1
    };
    this.queryExample = new Query(this.queryInfo);
  });
  it('works', () => {
    expect(Query).to.not.be.null;
  });
  describe('get()', () => {
    it('is a function', () => {
      expect(this.queryExample.get).to.be.a('function');
    });
    it('returns paginater value, if it exists', () => {
      expect(this.queryExample.get('start')).to.equal(this.queryInfo.start);
    });
    it('returns argument value, if key does not exist', () => {
      expect(this.queryExample.get('test')).to.equal(this.queryInfo.test);
    });
  });
  describe('set()', () => {
    it('is a function', () => {
      expect(this.queryExample.set).to.be.a('function');
    });
    it('returns self', () => {
      expect(this.queryExample.set()).to.be.equal(this.queryExample);
    });
    it('sets new values', () => {
      const startValue = 2;
      this.queryExample.set({ start: startValue });
      expect(this.queryExample.get('start')).to.not.equal(this.queryInfo.start);
      expect(this.queryExample.get('start')).to.equal(startValue);
    });
  });
  describe('clone()', () => {
    it('is a function', () => {
      expect(this.queryExample.clone).to.be.a('function');
    });
    it('creates a new copy', () => {
      expect(this.queryExample.clone()).to.not.equal(this.queryExample);
      expect(Object.keys(this.queryExample.clone())).to.deep.equal(Object.keys(this.queryExample));
    });
  });
  describe('toSection()', () => {
    it('is a function', () => {
      expect(this.queryExample.toSection).to.be.a('function');
    });
    it('creates a Section', () => {
      expect(Object.keys(this.queryExample.toSection())).to.deep.equal(Object.keys(new Section(this.queryInfo.start, 3)));
    });
  });
  describe('toLimitSection()', () => {
    it('is a function', () => {
      expect(this.queryExample.toLimitSection).to.be.a('function');
    });
    it('creates a Section', () => {
      expect(Object.keys(this.queryExample.toLimitSection())).to.deep.equal(Object.keys(new Section(this.queryInfo.start, 4)));
    });
  });
  describe('toJSON()', () => {
    it('is a function', () => {
      expect(this.queryExample.toJSON).to.be.a('function');
    });
    it('returns an object', () => {
      expect(this.queryExample.toJSON()).to.be.an('object');
    });
    it('gets values and assigns them to properties', () => {
      Object.keys(this.queryExample.toJSON()).forEach((property) => {
        expect(this.queryExample.toJSON()[property]).to.equal(this.queryExample.get(property));
      });
    });
  });
});
