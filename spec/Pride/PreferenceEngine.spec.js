const { expect } = require('chai');
const PreferenceEngine = require('../../pride').Pride.PreferenceEngine;

describe('Pride.PreferenceEngine', function () {
  const blankList = {
    mirlyn: {},
    articlesplus: {},
    databases: {},
    journals: {},
    website: {}
  };
  const fakeEngine = {
    listRecords: () => {
      return [];
    },
    addObserver: (observer) => {
      return observer([]);
    }
  };
  const uid = '123';

  it('works', function () {
    expect(PreferenceEngine).to.not.be.null;
  });

  describe('selectedRecords', function () {
    it('is null by default', function () {
      expect(PreferenceEngine.selectedRecords).to.be.null;
    });
  });

  describe('engine', function () {
    it('is null by default', function () {
      expect(PreferenceEngine.engine).to.be.null;
    });
  });

  describe('selected', function () {
    it('returns false when no engine is registered', function () {
      expect(PreferenceEngine.selected()).to.be.false;
    });

    it('returns true if selected', function () {
      PreferenceEngine.registerEngine(fakeEngine);
      PreferenceEngine.updateSelectedRecords([{ mirlyn: [{ uid }] }]);
      expect(PreferenceEngine.selected(blankList)).to.be.true;
    });
  });

  describe('registerEngine', function () {
    it('returns self when no engine is registered', function () {
      expect(PreferenceEngine.registerEngine()).to.equal(PreferenceEngine);
    });

    it('registers an engine successfully, then returns self', function () {
      PreferenceEngine.registerEngine(fakeEngine);
      expect(PreferenceEngine.engine).to.equal(fakeEngine);
      expect(PreferenceEngine.registerEngine(fakeEngine)).to.deep.equal(PreferenceEngine);
    });
  });

  describe('updateSelectedRecords', function () {
    it('updates selected records if `null`', function () {
      PreferenceEngine.selectedRecords = null;
      PreferenceEngine.updateSelectedRecords([]);
      expect(PreferenceEngine.selectedRecords).to.deep.equal(blankList);
    });

    it('updates selected records successfully with array input, then returns self', function () {
      PreferenceEngine.updateSelectedRecords([{ datastore: 'mirlyn', uid }]);
      expect(PreferenceEngine.selectedRecords.mirlyn[uid]).to.equal(true);
    });

    it('updates selected records successfully with object input', function () {
      PreferenceEngine.updateSelectedRecords({ mirlyn: [{ uid }] });
      expect(PreferenceEngine.selectedRecords.mirlyn[uid]).to.equal(true);
    });

    it('returns self', function () {
      expect(PreferenceEngine.updateSelectedRecords([])).to.deep.equal(PreferenceEngine);
    });
  });
});
