import { expect } from 'chai';
import PreferenceEngine from '../../src/Pride/PreferenceEngine';

const example = (object) => {
  const preferenceEngine = { ...PreferenceEngine };
  preferenceEngine.engine = !preferenceEngine.engine;
  preferenceEngine[object] = {
    mirlyn: { uid0: 'lorem' },
    articlesplus: { uid1: 'ipsum' },
    databases: { uid2: 'dolor' },
    journals: { uid3: 'sit' },
    website: { uid4: 'amet' }
  };
  return preferenceEngine;
};

describe('PreferenceEngine()', function() {
  it('works', () => {
    expect(PreferenceEngine).to.not.be.null;
  });
  ['favoritedRecords', 'favoritedRecordsTags', 'selectedRecords', 'engine'].forEach((property) => {
    describe(`${property}`, () => {
      it('is null by default', () => {
        expect(PreferenceEngine[property]).to.be.null;
      });
    });
  });
  describe('favorited()', () => {
    it('is a function', () => {
      expect(PreferenceEngine.favorited).to.be.a('function');
    });
    it('returns `false` if `engine` is null', () => {
      expect(PreferenceEngine.favorited({})).to.be.false;
    });
    it('returns a value from `this.favoritedRecords` with matching `record.datastore` and `record.uid` property names', () => {
      expect(example('favoritedRecords').favorited({ datastore: 'mirlyn', uid: 'uid0' })).to.equal('lorem');
    });
  });
  describe('selected()', () => {
    it('is a function', () => {
      expect(PreferenceEngine.selected).to.be.a('function');
    });
    it('returns false if engine is null', () => {
      expect(PreferenceEngine.selected({})).to.be.false;
    });
    it('returns a value from `this.selectedRecords` with matching `record.datastore` and `record.uid` property names', () => {
      expect(example('selectedRecords').selected({ datastore: 'articlesplus', uid: 'uid1' })).to.equal('ipsum');
    });
  });
  describe('favoriteTags()', () => {
    it('is a function', () => {
      expect(PreferenceEngine.favoriteTags).to.be.a('function');
    });
    it('returns an empty array if engine is null', () => {
      expect(PreferenceEngine.favoriteTags({})).to.deep.equal([]);
    });
    it('returns a value from `this.favoritedRecordsTags` with matching `record.datastore` and `record.uid` property names', () => {
      expect(example('favoritedRecordsTags').favoriteTags({ datastore: 'databases', uid: 'uid2' })).to.equal('dolor');
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
    it('requires `this.engine.listRecords()` for `this.updateSelectedRecords()` to be called', () => {
      expect(() => PreferenceEngine.registerEngine({})).to.throw('this.engine.listRecords is not a function');
    });
    it('requires `this.engine.favoritesList.last` for `this.updateFavoritedRecords()` to be called', () => {
      expect(() => PreferenceEngine.registerEngine({ listRecords: () => [] })).to.throw('Cannot read properties of undefined (reading \'last\')');
    });
    it('calls `this.engine.addFavoritesListObserver()`', () => {
      expect(() => PreferenceEngine.registerEngine({ listRecords: () => [], favoritesList: [] })).to.throw('this.engine.addFavoritesListObserver is not a function');
    });
    it('calls `this.engine.addObserver()`', () => {
      expect(() => PreferenceEngine.registerEngine({ listRecords: () => [], favoritesList: [], addFavoritesListObserver: () => {} })).to.throw('this.engine.addObserver is not a function');
    });
    it('returns itself', () => {
      const self = PreferenceEngine;
      expect(PreferenceEngine.registerEngine({ listRecords: () => [], favoritesList: [], addFavoritesListObserver: () => {}, addObserver: () => {} })).to.equal(self);
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
    beforeEach(() => {
      this.preferenceEngineExample = { ...PreferenceEngine };
      this.preferenceEngineExample.favoritedRecords = {
        mirlyn: {},
        articlesplus: {},
        databases: { 11527: true },
        journals: { 101952588: true },
        website: {}
      };
      this.preferenceEngineExample.updateFavoritedRecords([{
        tags: ['tag', 'articles-favorite', 'another tag'],
        id: [`http://www.lib.umich.edu/articles/details/${this.id}`]
      }]);
    });
    it('is a function', () => {
      expect(PreferenceEngine.updateFavoritedRecords).to.be.a('function');
    });
    it('assigns `this.blankList()` to `this.favoriteRecords` if null', () => {
      PreferenceEngine.updateFavoritedRecords({});
      expect(PreferenceEngine.favoritedRecords).to.deep.equal(PreferenceEngine.blankList());
    });
    it('assigns `this.blankList()` to `this.favoritedRecordsTags` if null', () => {
      PreferenceEngine.updateFavoritedRecords({});
      expect(PreferenceEngine.favoritedRecordsTags).to.deep.equal(PreferenceEngine.blankList());
    });
    it('adds new property to `this.favoritedRecords[datastore]`', () => {
      expect(Object.prototype.hasOwnProperty.call(this.preferenceEngineExample.favoritedRecords.articlesplus, this.id)).to.be.true;
    });
    it('sets new property to `this.favoritedRecords[datastore][id]` to `true`', () => {
      expect(this.preferenceEngineExample.favoritedRecords.articlesplus[this.id]).to.be.true;
    });
    it('adds all tags except `articles-favorite` to `this.favoritedRecordsTags[datastore][id]`', () => {
      expect(this.preferenceEngineExample.favoritedRecordsTags.articlesplus[this.id].indexOf('articles-favorite')).to.equal(-1);
    });
  });
  describe('updateSelectedRecords()', () => {
    beforeEach(() => {
      this.preferenceEngineExample = { ...PreferenceEngine };
    });
    it('is a function', () => {
      expect(PreferenceEngine.updateSelectedRecords).to.be.a('function');
    });
    it('assigns `this.blankList()` to `this.selectedRecords` if null', () => {
      this.preferenceEngineExample.updateSelectedRecords({});
      expect(this.preferenceEngineExample.selectedRecords).to.deep.equal(this.preferenceEngineExample.blankList());
    });
    it('updates `this.selectedRecords[record.datastore][record.uid] to equal true`', () => {
      this.preferenceEngineExample.updateSelectedRecords([{
        datastore: 'mirlyn',
        uid: 'mirlynUID'
      }]);
      expect(this.preferenceEngineExample.selectedRecords.mirlyn.mirlynUID).to.be.true;
    });
    it('adds or updates `record.datastore` property in `this.selectedRecords` with `record.uid` property to equal true', () => {
      const record = {
        datastore: 'datastoreTest',
        uid: 'datastoreTestUID'
      };
      this.preferenceEngineExample.updateSelectedRecords([record]);
      expect(this.preferenceEngineExample.selectedRecords[record.datastore][record.uid]).to.be.true;
    });
    it('returns itself', () => {
      expect(this.preferenceEngineExample.updateSelectedRecords({})).to.equal(this.preferenceEngineExample);
    });
  });
});
