const { expect } = require('chai');
const Pride = require('../../../../pride').Pride;

describe('Pride.Util.Paginater.getPossibleKeys()', function () {
  it('works', function () {
    expect(Pride.Util.Paginater.getPossibleKeys()).to.not.be.null;
  });
});
