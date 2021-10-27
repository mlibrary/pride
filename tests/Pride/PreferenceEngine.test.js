import { expect } from 'chai';
import PreferenceEngine from '../../src/Pride/PreferenceEngine';

describe('PreferenceEngine()', function() {
  beforeEach(() => {
    this.preferenceEngineExample = { ...PreferenceEngine };
    this.preferenceEngineExample.engine = !this.preferenceEngineExample.engine;
    this.preferenceRecords = {
      mirlyn: { mirlynID: 'lorem' },
      articlesplus: { articlesplusID: 'ipsum' },
      databases: { databasesID: 'dolor' },
      journals: { journalsID: 'sit' },
      website: { websiteID: 'amet' }
    };
    ['favoritedRecords', 'favoritedRecordsTags', 'selectedRecords'].forEach((property) => {
      this.preferenceEngineExample[property] = { ...this.preferenceRecords };
    });
  });
  it('works', () => {
    expect(this.preferenceEngineExample).to.not.be.null;
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
      expect(this.preferenceEngineExample.favorited).to.be.a('function');
    });
    it('returns `false` if `engine` is null', () => {
      this.preferenceEngineExample.engine = null;
      expect(this.preferenceEngineExample.favorited({})).to.be.false;
    });
    it('returns a value from `this.favoritedRecords` with matching `record.datastore` and `record.uid` property names', () => {
      const record = { datastore: 'mirlyn', uid: 'mirlynID' };
      expect(this.preferenceEngineExample.favorited(record)).to.equal(this.preferenceEngineExample.favoritedRecords[record.datastore][record.uid]);
    });
  });
  describe('selected()', () => {
    it('is a function', () => {
      expect(this.preferenceEngineExample.selected).to.be.a('function');
    });
    it('returns false if engine is null', () => {
      this.preferenceEngineExample.engine = null;
      expect(this.preferenceEngineExample.selected({})).to.be.false;
    });
    it('returns a value from `this.selectedRecords` with matching `record.datastore` and `record.uid` property names', () => {
      const record = { datastore: 'journals', uid: 'journalsID' };
      expect(this.preferenceEngineExample.selected(record)).to.equal(this.preferenceEngineExample.selectedRecords[record.datastore][record.uid]);
    });
  });
  describe('favoriteTags()', () => {
    it('is a function', () => {
      expect(this.preferenceEngineExample.favoriteTags).to.be.a('function');
    });
    it('returns an empty array if engine is null', () => {
      this.preferenceEngineExample.engine = null;
      expect(this.preferenceEngineExample.favoriteTags({})).to.deep.equal([]);
    });
    it('returns a value from `this.favoritedRecordsTags` with matching `record.datastore` and `record.uid` property names', () => {
      const record = { datastore: 'databases', uid: 'databasesID' };
      expect(this.preferenceEngineExample.favoriteTags(record)).to.equal(this.preferenceEngineExample.favoritedRecordsTags[record.datastore][record.uid]);
    });
  });
  describe('registerEngine()', () => {
    it('is a function', () => {
      expect(this.preferenceEngineExample.registerEngine).to.be.a('function');
    });
    it('returns itself with no changes if arguments have not been provided', () => {
      expect(this.preferenceEngineExample.registerEngine()).to.equal(this.preferenceEngineExample);
    });
    it('requires `this.engine.listRecords()` for `this.updateSelectedRecords()` to be called', () => {
      expect(() => this.preferenceEngineExample.registerEngine({})).to.throw('this.engine.listRecords is not a function');
    });
    it('requires `this.engine.favoritesList.last` for `this.updateFavoritedRecords()` to be called', () => {
      expect(() => this.preferenceEngineExample.registerEngine({ listRecords: () => [] })).to.throw('Cannot read properties of undefined (reading \'last\')');
    });
    it('calls `this.engine.addFavoritesListObserver()`', () => {
      expect(() => this.preferenceEngineExample.registerEngine({ listRecords: () => [], favoritesList: [] })).to.throw('this.engine.addFavoritesListObserver is not a function');
    });
    it('calls `this.engine.addObserver()`', () => {
      expect(() => this.preferenceEngineExample.registerEngine({ listRecords: () => [], favoritesList: [], addFavoritesListObserver: () => {} })).to.throw('this.engine.addObserver is not a function');
    });
    it('returns itself', () => {
      expect(this.preferenceEngineExample.registerEngine({ listRecords: () => [], favoritesList: [], addFavoritesListObserver: () => {}, addObserver: () => {} })).to.equal(this.preferenceEngineExample);
    });
  });
  describe('blankList()', () => {
    it('is a function', () => {
      expect(this.preferenceEngineExample.blankList).to.be.a('function');
    });
    it('returns an object', () => {
      expect(this.preferenceEngineExample.blankList()).to.be.an('object');
    });
    Object.keys(PreferenceEngine.blankList()).forEach((property) => {
      describe(property, () => {
        it('returns an empty object', () => {
          expect(this.preferenceEngineExample.blankList()[property]).to.deep.equal({});
        });
      });
    });
  });
  describe('updateFavoritedRecords()', () => {
    beforeEach(() => {
      this.preferenceEngineExample.favoritedRecords = { articlesplus: {} };
      this.testID = 1337;
      this.preferenceEngineExample.updateFavoritedRecords([{
        tags: ['tag', 'articles-favorite', 'another tag'],
        id: [`http://www.lib.umich.edu/articles/details/${this.testID}`]
      }]);
    });
    it('is a function', () => {
      expect(this.preferenceEngineExample.updateFavoritedRecords).to.be.a('function');
    });
    it('assigns `this.blankList()` to `this.favoriteRecords` if null', () => {
      this.preferenceEngineExample.updateFavoritedRecords({});
      expect(this.preferenceEngineExample.favoritedRecords).to.deep.equal(this.preferenceEngineExample.blankList());
    });
    it('assigns `this.blankList()` to `this.favoritedRecordsTags` if null', () => {
      this.preferenceEngineExample.updateFavoritedRecords({});
      expect(this.preferenceEngineExample.favoritedRecordsTags).to.deep.equal(this.preferenceEngineExample.blankList());
    });
    it('adds new property to `this.favoritedRecords[datastore]`', () => {
      expect(Object.prototype.hasOwnProperty.call(this.preferenceEngineExample.favoritedRecords.articlesplus, this.testID)).to.be.true;
    });
    it('sets new property to `this.favoritedRecords[datastore][id]` to `true`', () => {
      expect(this.preferenceEngineExample.favoritedRecords.articlesplus[this.testID]).to.be.true;
    });
    it('adds all tags except `articles-favorite` to `this.favoritedRecordsTags[datastore][id]`', () => {
      expect(this.preferenceEngineExample.favoritedRecordsTags.articlesplus[this.testID].indexOf('articles-favorite')).to.equal(-1);
    });
  });
  describe('updateSelectedRecords()', () => {
    beforeEach(() => {
      this.preferenceEngineExample.selectedRecords = null;
    });
    it('is a function', () => {
      expect(this.preferenceEngineExample.updateSelectedRecords).to.be.a('function');
    });
    it('assigns `this.blankList()` to `this.selectedRecords` if null', () => {
      this.preferenceEngineExample.updateSelectedRecords({});
      expect(this.preferenceEngineExample.selectedRecords).to.deep.equal(this.preferenceEngineExample.blankList());
    });
    it('updates `this.selectedRecords[record.datastore][record.uid] to equal true`', () => {
      this.preferenceEngineExample.updateSelectedRecords([{ datastore: 'mirlyn', uid: 'mirlynUID' }]);
      expect(this.preferenceEngineExample.selectedRecords.mirlyn.mirlynUID).to.be.true;
    });
    it('adds or updates `record.datastore` property in `this.selectedRecords` with `record.uid` property to equal true', () => {
      const record = { datastore: 'website', uid: 'websiteUID' };
      this.preferenceEngineExample.updateSelectedRecords([record]);
      expect(this.preferenceEngineExample.selectedRecords[record.datastore][record.uid]).to.be.true;
    });
    it('returns itself', () => {
      expect(this.preferenceEngineExample.updateSelectedRecords({})).to.equal(this.preferenceEngineExample);
    });
  });
});
