const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

describe('Pride.FieldTree.tokenize', function () {
  it('works', function () {
    expect(Pride.FieldTree.tokenize).to.not.be.null;
  });
});
