const { expect } = require('chai');
const Paginator = require('../../../../pride').Pride.Util.Paginator;
const { siblingFileIsProperty } = require('../../index.spec');

function paginatorBasicExpectations (key1, key2, valid) {
  const example = new Paginator({
    [`${key1}`]: valid[key1],
    [`${key2}`]: valid[key2]
  });

  for (const [key, value] of Object.entries(valid)) {
    it(`sets the number in ${key} correctly`, function () {
      expect(value).to.be.a('number');
      expect(valid[key]).to.equal(value);
    });
  }

  ['index_limit', 'page_limit'].forEach((property) => {
    it(`sets ${property} to Infinity`, function () {
      expect(example.get(property)).to.equal(Infinity);
    });
  });

  ['total_available', 'total_pages'].forEach((property) => {
    it(`sets ${property} to undefined`, function () {
      expect(example.get(property)).to.be.undefined;
    });
  });
}

// Test setting basic values
function testPaginatorBasics (key1, key2) {
  describe(`given a valid ${key1} and ${key2}`, function () {
    paginatorBasicExpectations(key1, key2, { start: 10, count: 5, end: 14, page: 3 });
    paginatorBasicExpectations(key1, key2, { start: 500, count: 100, end: 599, page: 6 });
  }
  );
}

function testPaginatorUnsettable (invalidSettings, basicSettings) {
  basicSettings = basicSettings || { start: 10, count: 5 };

  it(`can't set ${Object.keys(invalidSettings).join(' and ')} together after initialization`, function () {
    expect(function () {
      (new Paginator(basicSettings)).set(invalidSettings);
    }).to.throw();
  });

  it(`can't set ${Object.keys(invalidSettings).join(' and ')} together on initialization`, function () {
    expect(function () {
      const initializeInvalidSettings = new Paginator({ ...basicSettings, ...invalidSettings });
      return initializeInvalidSettings;
    }).to.throw();
  });
}

describe('Pride.Util.Paginator', function () {
  testPaginatorBasics('start', 'count');
  testPaginatorBasics('start', 'end');
  testPaginatorBasics('count', 'end');

  describe("certain combinations can't be set", function () {
    testPaginatorUnsettable({ total_pages: 100 });
    testPaginatorUnsettable({ index_limit: 100 });
    testPaginatorUnsettable({ start: 10, count: 5, end: 14 });
    testPaginatorUnsettable({ page: 3, start: 10 }, {});
    testPaginatorUnsettable({ page: 3, end: 14 }, {});
    testPaginatorUnsettable({ page: 3, end: 14 }, {});

    it("can't set the start greater than the end", function () {
      expect(function () {
        const startGreaterThanEnd = new Paginator({ start: 10, end: 5 });
        return startGreaterThanEnd;
      }).to.throw();
    });
  });

  describe('sibling files are defined as properties', function() {
    siblingFileIsProperty('Pride.Util.Paginator', Paginator);
  });
});
