const { expect } = require('chai');
const Pride = require('../../pride').Pride;

describe('Pride.AllDatastores', function () {
  it('works', function () {
    expect(Pride.AllDatastores).to.not.be.null;
  });
});
