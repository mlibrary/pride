const { expect } = require('chai');
const Raw = require('../../../pride').Pride.FieldTree.Raw;

describe('Pride.FieldTree.Raw', function () {
  const testRaw = 'testRaw';
  let createRaw;

  beforeEach(function () {
    createRaw = function () {
      return new Raw(testRaw, ...arguments);
    };
  });

  it('works', function () {
    expect(Raw).to.not.be.null;
  });

  describe('type', function () {
    it('defines the type via a string', function () {
      expect(createRaw().type).to.be.a('string');
      expect(createRaw().type).deep.equal('raw');
    });
  });

  describe('childTypes', function () {
    it('does not have any childTypes', function () {
      expect(createRaw().childTypes).to.be.an('array').and.to.be.empty;
    });
  });

  describe('extension', function () {
    it('serializes correctly with no children', function () {
      const field = createRaw();
      expect(field.serialize()).to.equal(testRaw);
    });

    it('does not return children', function () {
      const field = createRaw(new Raw('childRaw'));
      expect(field.serialize()).to.equal(testRaw);
    });
  });
});
