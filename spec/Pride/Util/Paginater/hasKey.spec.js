const { expect } = require('chai');
const Pride = require('../../../../pride').Pride;

describe('Pride.Util.Paginater.hasKey()', function () {
  it('works', function () {
    expect(Pride.Util.Paginater.hasKey()).to.not.be.null;
  });
});
