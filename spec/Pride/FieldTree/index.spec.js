const { expect } = require('chai');
const FieldTree = require('../../../pride').Pride.FieldTree;
const { siblingFileIsProperty } = require('../index.spec');

describe('Pride.FieldTree', function () {
  it('works', function () {
    expect(FieldTree).to.not.be.null;
  });

  it('is a non-empty object', function () {
    expect(FieldTree).to.be.an('object');
    expect(FieldTree).to.not.be.empty;
  });

  describe('sibling files are defined as properties', function() {
    siblingFileIsProperty('Pride.FieldTree', FieldTree);
  });
});
