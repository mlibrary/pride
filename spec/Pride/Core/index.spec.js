const { expect } = require('chai');
const Core = require('../../../pride').Pride.Core;
const { siblingFileIsProperty } = require('../index.spec');

describe('Pride.Core', function () {
  it('works', function () {
    expect(Core).to.not.be.null;
  });
  it('is a non-empty object', function () {
    expect(Core).to.be.an('object');
    expect(Core).to.not.be.empty;
  });
  describe('sibling files are defined as properties', () => {
    siblingFileIsProperty('Pride.Core', Core);
  });
});
