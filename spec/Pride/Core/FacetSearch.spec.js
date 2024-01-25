const sinon = require('sinon');
const { expect } = require('chai');
const FacetSearch = require('../../../pride').Pride.Core.FacetSearch;
const FuncBuffer = require('../../../pride').Pride.Util.FuncBuffer;

describe('FacetSearch', function () {
  const data = {
    uid: 'uid'
  };

  const results = ['result1', 'result2'];

  const setup = {
    data,
    results
  };

  let facetSearch;

  const createObservable = (property) => {
    describe(property, function () {
      it('returns an object', function () {
        expect(facetSearch[property]).to.be.an('object');
      });
      describe('add', function () {
        it('is a function', function () {
          expect(facetSearch[property].add).is.a('function');
        });
        it('executes added function when not muted', function () {
          const spy = sinon.spy();
          facetSearch[property].add(spy);
          expect(facetSearch.getMute()).to.be.false;
          expect(spy.calledOnce).to.be.true;
        });
        it('adds function when muted', function () {
          const spy = sinon.spy();
          facetSearch.setMute(true);
          facetSearch[property].add(spy);
          expect(facetSearch.getMute()).to.be.true;
          expect(spy.calledOnce).to.be.true;
        });
        it('returns a new FuncBuffer', function () {
          const spy = sinon.spy();
          facetSearch[property].add(spy);
          const funcBuffer = new FuncBuffer();
          expect(Object.keys(facetSearch[property].add(spy))).to.deep.equal(Object.keys(funcBuffer));
          expect(facetSearch[property].add(spy)).to.not.deep.equal(funcBuffer);
        });
      });
    });
  };

  beforeEach(function () {
    facetSearch = new FacetSearch(setup);
  });

  describe('Pride.Core.FacetSearch', function () {
    it('works', function () {
      expect(FacetSearch).to.not.be.null;
    });
  });

  describe('uid', function () {
    it('is a string', function () {
      expect(facetSearch.uid).to.be.a('string');
    });
  });

  describe('getData', function () {
    it('returns setup data', function () {
      expect(facetSearch.getData()).to.equal(data);
    });
  });

  describe('getResults', function () {
    it('returns setup results', function () {
      expect(facetSearch.getResults()).to.equal(results);
    });
  });

  describe('getMute', function () {
    it('returns the original muted value', function () {
      expect(facetSearch.getMute()).to.be.a('boolean');
      expect(facetSearch.getMute()).to.be.false;
    });
  });

  describe('setMute', function () {
    it('returns the set muted value', function () {
      facetSearch.setMute(true);
      expect(facetSearch.getMute()).to.be.true;
    });
  });

  describe('observables', function () {
    it('is an array', function () {
      expect(facetSearch.observables).to.be.an('array');
    });
  });

  createObservable('resultsObservers');
  createObservable('setDataObservers');
  createObservable('runDataObservers');

  describe('clearAllObservers', function () {
    it('runs the `clearAll` method for each observable', function () {
      const spy = sinon.spy();
      facetSearch.resultsObservers.add(spy);
      expect(facetSearch.observables).to.be.an('array').and.not.be.empty;
      facetSearch.observables.forEach((observable) => {
        const clearAllSpy = sinon.spy(observable, 'clearAll');
        facetSearch.clearAllObservers();
        expect(clearAllSpy.calledOnce).to.be.true;
      });
    });
    it('returns self', function () {
      expect(facetSearch.clearAllObservers()).to.deep.equal(facetSearch);
    });
  });
});
