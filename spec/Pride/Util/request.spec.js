const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

describe('Pride.Util.request', function () {
  it('works', function () {
    expect(Pride.Util.request).to.not.be.null;
  });
});
