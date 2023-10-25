const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

describe('Pride.FieldTree.tokens', function () {
  it('works', function () {
    expect(Pride.FieldTree.tokens).to.not.be.null;
  });
});
