const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

describe('Pride.Core.boolNodeFactory()', function () {
  it('works', function () {
    expect(Pride.Core.boolNodeFactory()).to.not.be.null;
  });
});
