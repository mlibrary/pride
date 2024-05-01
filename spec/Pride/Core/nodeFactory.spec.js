const { expect } = require('chai');
const nodeFactory = require('../../../pride').Pride.Core.nodeFactory;

describe('nodeFactory', function () {
  let testNode;
  const testType = 'testType';
  const childTypes = ['validChildType'];
  const testValue = '  testValue  ';
  const query = { type: testType, value: testValue.trim() };
  const [childType, childValue] = ['validChildType', 'testChildValue'];
  let testChildNode;

  beforeEach(function () {
    testNode = new (nodeFactory(testType, childTypes))(testValue);
    testChildNode = new (nodeFactory(childType))(childValue);
  });

  it('works', function () {
    expect(nodeFactory).to.not.be.null;
  });

  describe('children', function () {
    const array = ['element 1', 'element 2'];

    it('returns an array', function () {
      expect(testNode.children).to.be.an('array');
    });

    it('returns an empty array if only one argument provided', function () {
      expect(testNode.children).to.be.empty;
    });

    it('returns the second and last element of arguments, if the argument is an array', function () {
      const example = new (nodeFactory())(testValue, array);
      expect(example.children).to.equal(array);
    });

    it('returns all but the first argument', function () {
      const example = new (nodeFactory())(testValue, array, array[0]);
      expect(example.children).to.deep.equal([array, array[0]]);
    });
  });

  describe('type', function () {
    it('returns the given type', function () {
      expect(testNode.type).to.equal(testType);
    });
  });

  describe('value', function () {
    it('returns a trimmed version of the given value', function () {
      expect(testNode.value).to.equal(testValue.trim());
    });
  });

  describe('childTypes', function () {
    it('returns an empty array if no child types are provided', function () {
      const example = new (nodeFactory())(testValue);
      expect(example.childTypes).to.be.an('array').and.to.be.empty;
    });

    it('returns the given child types', function () {
      expect(testNode.childTypes).to.equal(childTypes);
    });
  });

  describe('addChild', function () {
    it('adds valid types to array of children', function () {
      testNode.addChild(testChildNode);
      expect(testNode.children[0].type).to.equal(childType);
      expect(testNode.children[0].value).to.equal(childValue);
    });

    it('throws an error if the type is invalid', function () {
      const invalidChildNode = new (nodeFactory('invalidChildType'))('invalidChildValue');
      expect(() => {
        return testNode.addChild(invalidChildNode);
      }).to.throw(`Not a valid child for a ${testType}`);
    });

    it('returns self', function () {
      expect(testNode.addChild(testChildNode)).to.deep.equal(testNode);
    });
  });

  describe('contains', function () {
    it('returns `false` there `children` returns empty`', function () {
      expect(testNode.contains({ value: testValue })).to.be.false;
      expect(testNode.children).to.be.empty;
    });

    it('returns self if match found', function () {
      expect(testNode.contains(query)).to.deep.equal(testNode);
    });
  });

  describe('matches', function () {
    it('checks for a match', function () {
      expect(testNode.matches(query)).to.be.true;
    });
  });

  describe('serialize', function () {
    it('returns the original value', function () {
      expect(testNode.serialize()).to.equal(testValue);
    });
  });

  describe('serializedChildren', function () {
    it('returns an array of child values', function () {
      testNode.addChild(testChildNode);
      testNode.addChild(testChildNode);
      expect(testNode.serializedChildren()).to.deep.equal([childValue, childValue]);
    });
  });

  describe('toJSON', function () {
    it('returns an object with three keys', function () {
      expect(testNode.toJSON()).to.deep.equal({ ...query, children: [] });
      expect(Object.keys(testNode.toJSON()).length).to.equal(3);
    });
  });
});
