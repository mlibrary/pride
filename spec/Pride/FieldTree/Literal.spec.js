const { expect } = require('chai');
const Literal = require('../../../pride').Pride.FieldTree.Literal;

describe('Pride.FieldTree.Literal', function () {
  const testLiteral = 'testLiteral';
  let createLiteral;

  beforeEach(function () {
    createLiteral = function () {
      return new Literal(testLiteral, ...arguments);
    };
  });

  it('works', function () {
    expect(Literal).to.not.be.null;
  });

  describe('type', function () {
    it('defines the type via a string', function () {
      expect(createLiteral().type).to.be.a('string');
      expect(createLiteral().type).deep.equal('literal');
    });
  });

  describe('childTypes', function () {
    it('does not have any childTypes', function () {
      expect(createLiteral().childTypes).to.be.an('array').and.to.be.empty;
    });
  });

  describe('extension', function () {
    it('serializes correctly with no children', function () {
      const field = createLiteral();
      expect(field.serialize()).to.equal(testLiteral);
    });

    it('does not return children', function () {
      const field = createLiteral(new Literal('childLiteral'));
      expect(field.serialize()).to.equal(testLiteral);
    });
  });
});
