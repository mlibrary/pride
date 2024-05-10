const { expect } = require('chai');
const Util = require('../../../pride').Pride.Util;
const { siblingFileIsProperty } = require('../index.spec');

describe('Pride.Util', function () {
  it('works', function () {
    expect(Util).to.not.be.null;
  });

  it('is a non-empty object', function () {
    expect(Util).to.be.an('object');
    expect(Util).to.not.be.empty;
  });

  describe('sibling files are defined as properties', function() {
    siblingFileIsProperty('Pride.Util', Util);
  });
});
