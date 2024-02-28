const { expect } = require('chai');
const Pride = require('../../pride').Pride;

describe('Pride.requestRecord', function () {
  it('works', function () {
    expect(Pride.requestRecord).to.not.be.null;
  });
});
