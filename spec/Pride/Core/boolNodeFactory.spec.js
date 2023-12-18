const { expect } = require('chai');
const boolNodeFactory = require('../../../pride').Pride.Core.boolNodeFactory;
const nodeFactory = require('../../../pride').Pride.Core.nodeFactory;

describe('Pride.Core.boolNodeFactory()', function () {
  let testBoolNode;
  const [testType, testValue, childValue] = ['testType', 'AND', 'testChildValue'];
  const childTypes = ['validChildType'];
  let testBoolNodeChild;

  beforeEach(function () {
    testBoolNode = new (boolNodeFactory(testType, childTypes))(testValue);
    testBoolNodeChild = new (nodeFactory(childTypes[0]))(childValue);
  });

  it('works', function () {
    expect(boolNodeFactory).to.not.be.null;
  });

  describe('type', function () {
    it('defines the type via a string', function () {
      expect(testBoolNode.type).to.be.a('string');
      expect(testBoolNode.type).deep.equal(testType);
    });
  });

  describe('childTypes', function () {
    it('contains an array of specific values', function () {
      expect(testBoolNode.childTypes).to.be.an('array');
      expect(testBoolNode.childTypes).deep.equal(childTypes);
    });
  });

  describe('extension', function () {
    it('throws an error when an invalid boolean value is given', function () {
      expect(() => {
        return (boolNodeFactory(testType, childTypes))('invalidValue');
      }).to.throw('Not a valid boolean value');
    });

    describe('serializedChildren', function () {
      it('returns an array', function () {
        expect(testBoolNode.serializedChildren()).to.be.an('array');
      });
      it('returns an array of child values', function () {
        testBoolNode.addChild(testBoolNodeChild);
        expect(testBoolNode.serializedChildren()).to.deep.equal([childValue]);
        testBoolNode.addChild(testBoolNodeChild);
        expect(testBoolNode.serializedChildren()).to.be.an('array').and.to.deep.equal([childValue, childValue]);
      });
    });

    describe('serialize', function () {
      it('serializes correctly with no children', function () {
        expect(testBoolNode.serialize()).to.equal('');
      });
      it('serializes correctly with one child', function () {
        testBoolNode.addChild(testBoolNodeChild);
        expect(testBoolNode.serialize()).to.equal(childValue);
      });
      it('serializes correctly with multiple children', function () {
        testBoolNode.addChild(testBoolNodeChild);
        testBoolNode.addChild(testBoolNodeChild);
        expect(testBoolNode.serialize()).to.equal(`${childValue} ${testValue} ${childValue}`);
      });
    });
  });
});
