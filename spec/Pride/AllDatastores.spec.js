const { expect } = require('chai');
const AllDatastores = require('../../pride').Pride.AllDatastores;

describe('Pride.AllDatastores', function () {
  it('works', function () {
    expect(AllDatastores).to.not.be.null;
  });
  describe('array', function () {
    it('returns an empty array by default', function () {
      expect(AllDatastores.array).to.be.an('array');
      expect(AllDatastores.array).to.be.empty;
    });
  });
  describe('get', function () {
    it('returns the correct datastore based on given `uid`', function () {
      ['mirlyn', 'primo', 'databases', 'onlinejournals'].forEach((datastore, index) => {
        AllDatastores.array.push({
          uid: datastore,
          get: function (property) {
            return this[property];
          }
        });
        expect(AllDatastores.get(datastore)).to.deep.equal(AllDatastores.array[index]);
      });
    });
  });
});
