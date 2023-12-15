const { expect } = require('chai');
const insideFieldNodes = require('../../../../pride').Pride.FieldTree.insideFieldNodes;

describe('Pride.FieldTree.insideFieldNodes', function () {
  it('works', function () {
    expect(insideFieldNodes).to.not.be.null;
  });
  it('returns a non-empty array', function () {
    expect(insideFieldNodes).to.be.an('array').and.to.not.be.empty;
  });
});
