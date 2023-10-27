const { expect } = require('chai');
const getPossibleKeys = require('../../../../pride').Pride.Util.Paginater.getPossibleKeys;

describe('Pride.Util.Paginater.getPossibleKeys', function () {
  it('works', function () {
    expect(getPossibleKeys).to.not.be.null;
  });
  it('returns a non-empty array', function () {
    expect(Array.isArray(getPossibleKeys)).to.be.true;
    expect(getPossibleKeys).to.not.be.empty;
  });
});
