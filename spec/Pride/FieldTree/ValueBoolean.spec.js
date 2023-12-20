const { expect } = require('chai');
const ValueBoolean = require('../../../pride').Pride.FieldTree.ValueBoolean;
const nodeFactory = require('../../../pride').Pride.Core.nodeFactory;
const insideFieldNodes = require('../../../pride').Pride.FieldTree.insideFieldNodes;

describe('Pride.FieldTree.ValueBoolean', function () {
  let testValueBoolean;
  const [testType, testValue, childType, childValue] = ['value_boolean', 'AND', insideFieldNodes[1], 'childValue'];
  let testValueBooleanChild;

  beforeEach(function () {
    testValueBoolean = new ValueBoolean(testValue);
    testValueBooleanChild = new (nodeFactory(childType))(childValue);
  });

  it('works', function () {
    expect(ValueBoolean).to.not.be.null;
  });

  describe('type', function () {
    it('throws an error when an invalid boolean value is given', function () {
      expect(() => {
        return new ValueBoolean('notValid');
      }).to.throw('Not a valid boolean value');
    });
    it('defines the type via a string', function () {
      expect(testValueBoolean.type).to.be.a('string');
      expect(testValueBoolean.type).deep.equal(testType);
    });
  });

  describe('childTypes', function () {
    it('contains an array of specific values', function () {
      expect(testValueBoolean.childTypes).to.be.an('array');
      expect(testValueBoolean.childTypes).deep.equal(insideFieldNodes);
    });
  });

  describe('extension', function () {
    it('throws an error when an invalid boolean value is given', function () {
      expect(() => {
        return testValueBoolean.addChild(new ValueBoolean('notValid'));
      }).to.throw('Not a valid boolean value');
    });

    describe('serializedChildren', function () {
      it('returns an array', function () {
        expect(testValueBoolean.serializedChildren()).to.be.an('array');
      });
      it('returns an array of child values', function () {
        testValueBoolean.addChild(testValueBooleanChild);
        expect(testValueBoolean.serializedChildren()).to.deep.equal([childValue]);
        testValueBoolean.addChild(testValueBooleanChild);
        expect(testValueBoolean.serializedChildren()).to.be.an('array').and.to.deep.equal([childValue, childValue]);
      });
    });

    describe('serialize', function () {
      const testMatchingType = new (nodeFactory(testType))(childValue);
      it('serializes correctly with no children', function () {
        expect(testValueBoolean.serialize()).to.equal('');
      });
      it('serializes values correctly with one child', function () {
        testValueBoolean.addChild(testValueBooleanChild);
        expect(testValueBoolean.serialize()).to.equal(childValue);
      });
      it('serializes values correctly with multiple children', function () {
        testValueBoolean.addChild(testValueBooleanChild);
        testValueBoolean.addChild(testValueBooleanChild);
        expect(testValueBoolean.serialize()).to.equal(`${childValue} ${testValue} ${childValue}`);
      });
      it('serializes matched values and wraps in parentheses correctly with one child', function () {
        testValueBoolean.addChild(testMatchingType);
        expect(testValueBoolean.serialize()).to.equal(`(${childValue})`);
      });
      it('serializes matched values and wraps in parentheses correctly with multiple children', function () {
        testValueBoolean.addChild(testMatchingType);
        testValueBoolean.addChild(testMatchingType);
        expect(testValueBoolean.serialize()).to.equal(`(${childValue}) ${testValue} (${childValue})`);
      });
      it('serializes mixed matching values correctly with multiple children', function () {
        testValueBoolean.addChild(testValueBooleanChild);
        testValueBoolean.addChild(testMatchingType);
        expect(testValueBoolean.serialize()).to.equal(`${childValue} ${testValue} (${childValue})`);
      });
    });
  });
});
