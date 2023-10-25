const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

describe('Pride.Core.nodeFactory()', function () {
  it('works', function () {
    expect(Pride.Core.nodeFactory()).to.not.be.null;
  });
});
