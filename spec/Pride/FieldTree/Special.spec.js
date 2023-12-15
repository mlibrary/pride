const { expect } = require('chai');
const Special = require('../../../pride').Pride.FieldTree.Special;

describe('Pride.FieldTree.Special', function () {
  const testSpecial = 'testSpecial';
  let createSpecial;

  beforeEach(function () {
    createSpecial = function () {
      return new Special(testSpecial, ...arguments);
    };
  });

  it('works', function () {
    expect(Special).to.not.be.null;
  });

  describe('type', function () {
    it('defines the type via a string', function () {
      expect(createSpecial().type).to.be.a('string');
      expect(createSpecial().type).deep.equal('special');
    });
  });

  describe('childTypes', function () {
    it('does not have any childTypes', function () {
      expect(createSpecial().childTypes).to.be.an('array').and.to.be.empty;
    });
  });

  describe('extension', function () {
    it('serializes correctly with no children', function () {
      const field = createSpecial();
      expect(field.serialize()).to.equal(testSpecial);
    });

    it('does not return children', function () {
      const field = createSpecial(new Special('childSpecial'));
      expect(field.serialize()).to.equal(testSpecial);
    });
  });
});
