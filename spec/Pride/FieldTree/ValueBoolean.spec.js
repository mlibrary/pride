const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

describe('Pride.FieldTree.ValueBoolean', function () {
  it('works', function () {
    expect(Pride.FieldTree.ValueBoolean).to.not.be.null;
  });
});
