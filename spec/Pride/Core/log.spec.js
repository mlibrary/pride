const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

describe('Pride.Core.log()', function () {
  it('works', function () {
    expect(Pride.Core.log()).to.not.be.null;
  });
});
