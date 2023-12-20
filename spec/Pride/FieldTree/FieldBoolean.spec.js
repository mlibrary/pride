const { expect } = require('chai');
const FieldBoolean = require('../../../pride').Pride.FieldTree.FieldBoolean;
const nodeFactory = require('../../../pride').Pride.Core.nodeFactory;

describe('Pride.FieldTree.FieldBoolean', function () {
  let testFieldBoolean;
  const [testType, testValue, childType, childValue] = ['field_boolean', 'AND', 'field', 'childValue'];
  let testFieldBooleanChild;

  beforeEach(function () {
    testFieldBoolean = new FieldBoolean(testValue);
    testFieldBooleanChild = new (nodeFactory(childType))(childValue);
  });

  it('works', function () {
    expect(FieldBoolean).to.not.be.null;
  });

  describe('type', function () {
    it('throws an error when an invalid boolean value is given', function () {
      expect(() => {
        return new FieldBoolean('notValid');
      }).to.throw('Not a valid boolean value');
    });
    it('defines the type via a string', function () {
      expect(testFieldBoolean.type).to.be.a('string');
      expect(testFieldBoolean.type).deep.equal(testType);
    });
  });

  describe('childTypes', function () {
    it('contains an array of specific values', function () {
      expect(testFieldBoolean.childTypes).to.be.an('array');
      expect(testFieldBoolean.childTypes).deep.equal([testType, childType]);
    });
  });

  describe('extension', function () {
    it('throws an error when an invalid boolean value is given', function () {
      expect(() => {
        return testFieldBoolean.addChild(new FieldBoolean('notValid'));
      }).to.throw('Not a valid boolean value');
    });

    describe('serializedChildren', function () {
      it('returns an array', function () {
        expect(testFieldBoolean.serializedChildren()).to.be.an('array');
      });
      it('returns an array of child values', function () {
        testFieldBoolean.addChild(testFieldBooleanChild);
        expect(testFieldBoolean.serializedChildren()).to.deep.equal([childValue]);
        testFieldBoolean.addChild(testFieldBooleanChild);
        expect(testFieldBoolean.serializedChildren()).to.be.an('array').and.to.deep.equal([childValue, childValue]);
      });
    });

    describe('serialize', function () {
      const testMatchingType = new (nodeFactory(testType))(childValue);
      it('serializes correctly with no children', function () {
        expect(testFieldBoolean.serialize()).to.equal('');
      });
      it('serializes values correctly with one child', function () {
        testFieldBoolean.addChild(testFieldBooleanChild);
        expect(testFieldBoolean.serialize()).to.equal(childValue);
      });
      it('serializes values correctly with multiple children', function () {
        testFieldBoolean.addChild(testFieldBooleanChild);
        testFieldBoolean.addChild(testFieldBooleanChild);
        expect(testFieldBoolean.serialize()).to.equal(`${childValue} ${testValue} ${childValue}`);
      });
      it('serializes matched values and wraps in parentheses correctly with one child', function () {
        testFieldBoolean.addChild(testMatchingType);
        expect(testFieldBoolean.serialize()).to.equal(`(${childValue})`);
      });
      it('serializes matched values and wraps in parentheses correctly with multiple children', function () {
        testFieldBoolean.addChild(testMatchingType);
        testFieldBoolean.addChild(testMatchingType);
        expect(testFieldBoolean.serialize()).to.equal(`(${childValue}) ${testValue} (${childValue})`);
      });
      it('serializes mixed matching values correctly with multiple children', function () {
        testFieldBoolean.addChild(testFieldBooleanChild);
        testFieldBoolean.addChild(testMatchingType);
        expect(testFieldBoolean.serialize()).to.equal(`${childValue} ${testValue} (${childValue})`);
      });
    });
  });
});
