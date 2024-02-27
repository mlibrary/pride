const { expect } = require('chai');
const Field = require('../../../pride').Pride.FieldTree.Field;

describe('Pride.FieldTree.Field', function () {
  const testField = 'testField';
  const childField = 'childField';
  let createField;
  let createChildField;

  beforeEach(function () {
    createField = function () {
      return new Field(testField, ...arguments);
    };
    createChildField = new Field(childField);
  });

  it('works', function () {
    expect(Field).to.not.be.null;
  });

  describe('type', function () {
    it('defines the type via a string', function () {
      expect(createField().type).to.be.a('string');
      expect(createField().type).deep.equal('field');
    });
  });

  describe('childTypes', function () {
    it('contains an array of specific values', function () {
      expect(createField().childTypes).to.be.an('array');
      expect(createField().childTypes).deep.equal(['value_boolean', 'literal', 'tag', 'special']);
    });
  });

  describe('extension', function () {
    it('serializes correctly with no children', function () {
      const field = createField();
      expect(field.serialize()).to.equal(`${testField}: ()`);
    });

    it('serializes correctly with one child', function () {
      const field = createField(createChildField);
      expect(field.serialize()).to.equal(`${testField}: (${childField}: ())`);
    });

    it('serializes correctly with multiple children', function () {
      const field = createField(createChildField, createChildField);
      expect(field.serialize()).to.equal(`${testField}: (${childField}: () ${childField}: ())`);
    });
  });
});
