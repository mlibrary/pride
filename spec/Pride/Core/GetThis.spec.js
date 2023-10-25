const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

describe('Pride.Core.GetThis', function () {
  it('works', function () {
    expect(Pride.Core.GetThis).to.not.be.null;
  });
});
