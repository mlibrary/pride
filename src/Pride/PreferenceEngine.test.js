import { expect } from 'chai';
import PreferenceEngine from './PreferenceEngine';

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

describe('PreferenceEngine()', () => {
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
    });
    it('is a function', () => {
      expect(PreferenceEngine.updateFavoritedRecords).to.be.a('function');
    });
    it('assigns `this.blankList()` to `this.favoriteRecords` if null', () => {
      this.preferenceEngineExample.updateFavoritedRecords({});
      expect(this.preferenceEngineExample.favoritedRecords).to.deep.equal(this.preferenceEngineExample.blankList());
    });
    it('assigns `this.blankList()` to `this.favoritedRecordsTags` if null', () => {
      this.preferenceEngineExample.updateFavoritedRecords({});
      expect(this.preferenceEngineExample.favoritedRecordsTags).to.deep.equal(this.preferenceEngineExample.blankList());
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
    it('updates `this.selectedRecords[record.datastore]` with `record.uid` property to equal true', () => {
      const record = {
        datastore: 'journals',
        uid: 'journalsUID'
      };
      this.preferenceEngineExample.updateSelectedRecords([record]);
      expect(this.preferenceEngineExample.selectedRecords[record.datastore][record.uid]).to.be.true;
    });
    it('adds `record.datastore` property to `this.selectedRecords` with `record.uid` property to equal true', () => {
      const record = {
        datastore: 'datastoreTest',
        uid: 'datastoreTestUID'
      };
      this.preferenceEngineExample.updateSelectedRecords([record]);
      expect(this.preferenceEngineExample.selectedRecords[record.datastore][record.uid]).to.be.true;
    });
    it('returns itself', () => {
      const record = {
        datastore: 'datastoreTest',
        uid: 'datastoreTestUID'
      };
      expect(this.preferenceEngineExample.updateSelectedRecords([record])).to.equal(this.preferenceEngineExample);
    });
  });
});
