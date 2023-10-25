const { expect } = require('chai');
const Pride = require('../pride').Pride;

describe('Pride', function () {
  console.log('Pride', Object.keys(Pride));
  console.log('Pride.Core', Object.keys(Pride.Core));
  console.log('Pride.FieldTree', Object.keys(Pride.FieldTree));
  console.log('Pride.Util', Object.keys(Pride.Util));
  console.log('Pride.Util.Paginater', Object.keys(Pride.Util.Paginater));
  it('works', function () {
    expect(Pride).to.not.be.null;
  });
});
