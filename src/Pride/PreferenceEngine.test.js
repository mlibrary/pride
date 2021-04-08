import { expect } from 'chai';
import PreferenceEngine from './PreferenceEngine';

describe.only('PreferenceEngine()', () => {
  it('works', () => {
    expect(PreferenceEngine).to.not.be.null;
  });
  describe('favoritedRecords', () => {
    it('is null by default', () => {
      expect(PreferenceEngine.favoritedRecords).to.be.null;
    });
  });
  describe('favoritedRecordsTags', () => {
    it('is null by default', () => {
      expect(PreferenceEngine.favoritedRecordsTags).to.be.null;
    });
  });
  describe('selectedRecords', () => {
    it('is null by default', () => {
      expect(PreferenceEngine.selectedRecords).to.be.null;
    });
  });
  describe('engine', () => {
    it('is null by default', () => {
      expect(PreferenceEngine.engine).to.be.null;
    });
  });
  describe('favorited()', () => {
    it('is a function', () => {
      expect(PreferenceEngine.favorited).to.be.a('function');
    });
    it('returns false if engine is null', () => {
      expect(PreferenceEngine.favorited({})).to.be.false;
    });
  });
  describe('selected()', () => {
    it('is a function', () => {
      expect(PreferenceEngine.selected).to.be.a('function');
    });
    it('returns false if engine is null', () => {
      expect(PreferenceEngine.selected({})).to.be.false;
    });
  });
  describe('favoriteTags()', () => {
    it('is a function', () => {
      expect(PreferenceEngine.favoriteTags).to.be.a('function');
    });
    it('returns an empty array if engine is null', () => {
      expect(PreferenceEngine.favoriteTags({})).to.deep.equal([]);
    });
  });
  describe('registerEngine()', () => {
    it('is a function', () => {
      expect(PreferenceEngine.registerEngine).to.be.a('function');
    });
    it('returns itself with no changes if arguments have not been provided', () => {
      const self = PreferenceEngine;
      expect(PreferenceEngine.registerEngine()).to.equal(self);
    });
  });
  describe('blankList()', () => {
    it('is a function', () => {
      expect(PreferenceEngine.blankList).to.be.a('function');
    });
    it('returns an object', () => {
      expect(PreferenceEngine.blankList()).to.be.an('object');
    });
    Object.keys(PreferenceEngine.blankList()).forEach((property) => {
      describe(property, () => {
        it('returns an empty object', () => {
          expect(PreferenceEngine.blankList()[property]).to.deep.equal({});
        });
      });
    });
  });
  describe('updateFavoritedRecords()', () => {
    it('is a function', () => {
      expect(PreferenceEngine.updateFavoritedRecords).to.be.a('function');
    });
  });
  describe('updateSelectedRecords()', () => {
    it('is a function', () => {
      expect(PreferenceEngine.updateSelectedRecords).to.be.a('function');
    });
  });
});
