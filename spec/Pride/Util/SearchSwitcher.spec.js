const sinon = require('sinon');
const { expect } = require('chai');
const SearchSwitcher = require('../../../pride').Pride.Util.SearchSwitcher;

describe('Pride.Util.SearchSwitcher', function () {
  let searchMock;
  let cachedSearchMock;
  let searchSwitcher;

  beforeEach(function () {
    searchMock = {
      uid: 'uid1',
      set: sinon.spy(),
      run: sinon.spy(),
      nextPage: sinon.spy(),
      prevPage: sinon.spy(),
      setMute: sinon.spy()
    };
    cachedSearchMock = [{
      ...searchMock,
      uid: 'uid2'
    }];
    searchSwitcher = new SearchSwitcher(searchMock, cachedSearchMock);
  });

  it('works', function () {
    expect(SearchSwitcher).to.not.be.null;
  });

  describe('uid', function () {
    it('is a string', function () {
      expect(searchSwitcher.uid).to.be.a('string');
    });
  });

  describe('run', function () {
    it('runs searches', function () {
      searchSwitcher.run(5);
      expect(searchMock.run.calledWith(5)).to.be.true;
      expect(cachedSearchMock[0].run.calledWith(0)).to.be.true;
    });
    it('returns self', function () {
      expect(searchSwitcher.run()).to.deep.equal(searchSwitcher);
    });
  });

  describe('set', function () {
    const values = { key: 'value' };
    it('sets values and propagate values to searches', function () {
      searchSwitcher.set(values);
      expect(searchMock.set.calledWith(values)).to.be.true;
      expect(cachedSearchMock[0].set.calledWith(values)).to.be.true;
    });
    it('returns self', function () {
      expect(searchSwitcher.set(values)).to.deep.equal(searchSwitcher);
    });
  });

  describe('nextPage', function () {
    it('goes to next page for searches', function () {
      searchSwitcher.nextPage();
      expect(searchMock.nextPage.calledOnce).to.be.true;
    });
    it('returns self', function () {
      expect(searchSwitcher.nextPage()).to.deep.equal(searchSwitcher);
    });
  });

  describe('prevPage', function () {
    it('goes to prev page for searches', function () {
      searchSwitcher.prevPage();
      expect(searchMock.prevPage.calledOnce).to.be.true;
    });
    it('returns self', function () {
      expect(searchSwitcher.prevPage()).to.deep.equal(searchSwitcher);
    });
  });

  describe('switchTo', function () {
    it('switches between searches', function () {
      searchSwitcher.switchTo(cachedSearchMock[0].uid);
      expect(searchSwitcher.uid).to.equal(cachedSearchMock[0].uid);
      expect(searchMock.setMute.calledWith(true)).to.be.true;
    });
    it('throws an error if attempting to switch to non-existent search', function () {
      const invalidUID = 'nid';
      expect(() => {
        return searchSwitcher.switchTo(invalidUID);
      }).to.throw(`Could not find a search with a UID of: ${invalidUID}`);
    });
    it('returns self', function () {
      expect(searchSwitcher.switchTo(cachedSearchMock[0].uid)).to.deep.equal(searchSwitcher);
    });
  });
});
