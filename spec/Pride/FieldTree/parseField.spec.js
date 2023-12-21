const { expect } = require('chai');
const parseField = require('../../../pride').Pride.FieldTree.parseField;

describe('Pride.FieldTree.parseField()', function () {
  const testField = 'testField';
  const testContent = 'testContent';
  let createParseField;

  beforeEach(function () {
    createParseField = (testContent) => {
      return parseField(testField, testContent);
    };
  });

  it('works', function () {
    expect(parseField).to.not.be.null;
  });

  it('returns an empty object if content is not provided', function () {
    [parseField(), createParseField()].forEach((parsedField) => {
      expect(parsedField).to.be.an('object').and.to.be.empty;
    });
  });

  it('parses the field', function () {
    expect(createParseField(testContent).value).to.equal(testField);
  });

  it('parses the content as a child', function () {
    expect(createParseField(testContent).children[0].value).to.equal(testContent);
  });

  it('returns a field node if content is a keyword only search', function () {
    expect(createParseField(testContent).type).to.equal('field');
  });

  it('returns a field boolean node if content is a combination of keyword searches', function () {
    expect(createParseField('test AND test OR test').type).to.equal('field_boolean');
  });

  it('returns a raw node if content is not a keyword only search', function () {
    expect(createParseField('test:(test)').type).to.equal('raw');
  });
});
