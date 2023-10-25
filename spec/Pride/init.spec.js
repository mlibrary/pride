const { expect } = require('chai');
const Pride = require('../../pride').Pride;

describe('Pride.init', function () {
  it('works', function () {
    expect(Pride.init).to.not.be.null;
  });
});
