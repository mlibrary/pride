const sinon = require('sinon');
const { expect } = require('chai');
const SearchBase = require('../../../pride').Pride.Core.SearchBase;
const Query = require('../../../pride').Pride.Core.Query;

describe.only('Pride.Core.SearchBase', function () {
  let searchBase, setup, query, parent;

  before(function () {
    query = new Query({
      uid: 'uid1',
      request_id: 1,
      start: 1,
      count: 10,
      field_tree: {},
      facets: {},
      sort: {},
      settings: {},
      raw_query: 'raw_query'
    });
    setup = {
      query,
      datastore: {
        baseQuery: () => {
          return 'baseQuery result';
        },
        baseSearch: () => {
          return 'baseSearch result';
        },
        get: () => {
          return 'get result';
        },
        runQuery: () => {
          return 'runQuery result';
        },
        update: () => {
          return 'update result';
        }
      }
    };
    parent = {
      facetsObservers: {},
      getData: () => {
        return 'getData result';
      },
      getFacets: () => {
        return 'getFacets result';
      },
      getMute: () => {
        return 'getMute result';
      },
      getResults: () => {
        return 'getResults result';
      },
      muteObservers: {},
      nextPage: () => {
        return 'nextPage result';
      },
      prevPage: () => {
        return 'prevPage result';
      },
      resultsObservers: {},
      run: () => {
        return 'run result';
      },
      runDataObservers: {},
      set: () => {
        return 'set result';
      },
      setDataObservers: {},
      setMute: () => {
        return 'setMute result';
      },
      uid: 'mirlyn'
    };
    searchBase = new SearchBase(setup, parent);
  });

  it('works', function () {
    expect(SearchBase).to.not.be.null;
  });

  describe('datastore', function () {
    it('is a copy of `setup.datastore`', function () {
      expect(searchBase.datastore).to.equal(setup.datastore);
    });
  });

  describe('query', function () {
    it('defaults to `datastore.baseQuery()` if `setup.query` is undefined', function () {
      const noQuerySetup = { datastore: setup.datastore };
      const newSearchBase = new SearchBase(noQuerySetup, parent);
      expect(noQuerySetup.query).to.be.undefined;
      expect(newSearchBase.query).to.equal(setup.datastore.baseQuery());
    });
    it('is a copy of `setup.query`, if defined', function () {
      expect(searchBase.query).to.equal(setup.query);
    });
  });

  describe('log', function () {
    it('gets `setup.datastore` information', function () {
      const spy = sinon.spy(searchBase.datastore, 'get');
      searchBase.log();
      expect(spy.calledOnce).to.be.true;
    });
  });

  describe('set', function () {
    const hash = { count: 13 };
    it('sets query', function () {
      const spy = sinon.spy(searchBase.query, 'set');
      searchBase.set(hash);
      expect(spy.calledOnce).to.be.true;
    });
    it('calls `setDataChanged`', function () {
      const spy = sinon.spy(searchBase, 'setDataChanged');
      searchBase.set(hash);
      expect(spy.calledOnce).to.be.true;
    });
    it('changes query data', function () {
      searchBase.set(hash);
      expect(searchBase.query.get('count')).to.equal(hash.count);
    });
    it('returns self', function () {
      expect(searchBase.set(hash)).to.deep.equal(searchBase);
    });
  });

  describe('run', function () {
    const cacheSize = 0;
    it('calls `resultsChanged`', function () {
      const spy = sinon.spy(searchBase, 'resultsChanged');
      searchBase.run();
      expect(spy.calledOnce).to.be.true;
    });
    it('sets `cacheSize` if not defined', function () {
      searchBase.run();
      console.log(searchBase.query.toJSON());
      expect(searchBase.query.get('count')).to.be.false;
    });
    it('sets `cacheSize` if defined', function () {
      searchBase.run(cacheSize);
      expect(searchBase.query.toSection.expanded.calledWith(cacheSize)).to.be.false;
    });
    it('returns self', function () {
      expect(searchBase.run()).to.deep.equal(searchBase);
    });
  });

  describe('results', function () {
    it('', function () {
      expect(searchBase.results).to.equal('asdf');
    });
  });

  describe('clearAllObservers', function () {
    it('', function () {
      expect(searchBase.clearAllObservers).to.equal('asdf');
    });
  });

  describe('getMute', function () {
    it('is `false` by default', function () {
      expect(searchBase.getMute()).to.be.false;
    });
  });

  describe('setMute', function () {
    it('sets mute state', function () {
      searchBase.setMute(true);
      expect(searchBase.getMute()).to.be.true;
    });
    it('returns self', function () {
      expect(searchBase.setMute(true)).to.deep.equal(searchBase);
    });
  });

  describe('createObservable:', function () {
    it('', function () {
      expect(searchBase.createObservable).to.equal('asdf');
    });
  });

  describe('muteChanged', function () {
    it('', function () {
      expect(searchBase.muteChanged).to.equal('asdf');
    });
  });

  describe('setDataChanged', function () {
    it('', function () {
      expect(searchBase.setDataChanged).to.equal('asdf');
    });
  });

  describe('runDataChanged', function () {
    it('', function () {
      expect(searchBase.runDataChanged).to.equal('asdf');
    });
  });

  describe('resultsChanged', function () {
    it('', function () {
      expect(searchBase.resultsChanged).to.equal('asdf');
    });
  });

  it('Should return correct datastore', function () {
    expect(searchBase.datastore).to.deep.equal(setup.datastore);
  });
});
