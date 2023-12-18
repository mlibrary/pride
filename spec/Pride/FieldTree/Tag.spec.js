const { expect } = require('chai');
const Tag = require('../../../pride').Pride.FieldTree.Tag;
const insideFieldNodes = require('../../../pride').Pride.FieldTree.insideFieldNodes;

describe('Pride.FieldTree.Tag', function () {
  const testTag = 'testTag';
  const childTag = 'childTag';
  let createTag;
  let createChildTag;

  beforeEach(function () {
    createTag = function () {
      return new Tag(testTag, ...arguments);
    };
    createChildTag = new Tag(childTag);
  });

  it('works', function () {
    expect(Tag).to.not.be.null;
  });

  describe('type', function () {
    it('defines the type via a string', function () {
      expect(createTag().type).to.be.a('string');
      expect(createTag().type).deep.equal('tag');
    });
  });

  describe('childTypes', function () {
    it('contains an array of specific values', function () {
      expect(createTag().childTypes).to.be.an('array');
      expect(createTag().childTypes).deep.equal(insideFieldNodes);
    });
  });

  describe('extension', function () {
    it('serializes correctly with no children', function () {
      const field = createTag();
      expect(field.serialize()).to.equal(`${testTag}: ()`);
    });

    it('serializes correctly with one child', function () {
      const field = createTag(createChildTag);
      expect(field.serialize()).to.equal(`${testTag}: (${childTag}: ())`);
    });

    it('serializes correctly with multiple children', function () {
      const field = createTag(createChildTag, createChildTag);
      expect(field.serialize()).to.equal(`${testTag}: (${childTag}: () ${childTag}: ())`);
    });
  });
});
