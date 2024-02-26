const sinon = require('sinon');
const { expect } = require('chai');
const MultiSearch = require('../../../pride').Pride.Util.MultiSearch;

describe('Pride.Util.MultiSearch', function () {
  let searchMock;
  let searchArray;
  let multiSearch;

  beforeEach(function () {
    searchMock = {
      set: sinon.spy(),
      run: sinon.spy(),
      nextPage: sinon.spy(),
      prevPage: sinon.spy(),
      setMute: sinon.spy()
    };
    searchArray = [searchMock];
    multiSearch = new MultiSearch('uid', false, searchArray);
  });

  it('works', function () {
    expect(MultiSearch).to.not.be.null;
  });

  describe('searches', function () {
    it('is an array', function () {
      expect(multiSearch.searches).to.be.an('array');
    });
  });

  describe('uid', function () {
    it('is a string', function () {
      expect(multiSearch.uid).to.be.a('string');
    });
  });

  describe('set', function () {
    const values = { key: 'value' };
    it('sets values and propagate values to searches', function () {
      multiSearch.set(values);
      expect(searchMock.set.calledWith(values)).to.be.true;
    });
    it('returns self', function () {
      expect(multiSearch.set(values)).to.deep.equal(multiSearch);
    });
  });

  describe('run', function () {
    it('runs searches', function () {
      multiSearch.run();
      expect(searchMock.run.calledOnce).to.be.true;
    });
    it('returns self', function () {
      expect(multiSearch.run()).to.deep.equal(multiSearch);
    });
  });

  describe('nextPage', function () {
    it('goes to next page for searches', function () {
      multiSearch.nextPage();
      expect(searchMock.nextPage.calledOnce).to.be.true;
    });
    it('returns self', function () {
      expect(multiSearch.nextPage()).to.deep.equal(multiSearch);
    });
  });

  describe('prevPage', function () {
    it('goes to prev page for searches', function () {
      multiSearch.prevPage();
      expect(searchMock.prevPage.calledOnce).to.be.true;
    });
    it('returns self', function () {
      expect(multiSearch.prevPage()).to.deep.equal(multiSearch);
    });
  });

  describe('setMute', function () {
    it('mutes searches', function () {
      multiSearch.setMute(true);
      expect(searchMock.setMute.calledWith(true)).to.be.true;
    });
  });

  describe('getMute', function () {
    it('returns the original muted value', function () {
      expect(multiSearch.getMute()).to.be.a('boolean');
      expect(multiSearch.getMute()).to.be.false;
    });
    it('returns the set muted value', function () {
      multiSearch.setMute(true);
      expect(multiSearch.getMute()).to.be.true;
    });
  });
});
