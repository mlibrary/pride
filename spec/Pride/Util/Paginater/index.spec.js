const { expect } = require('chai');
const _ = require('underscore');
const Paginater = require('../../../../pride').Pride.Util.Paginater;
const { siblingFileIsProperty } = require('../../index.spec');

function paginatorBasicExpectations (key1, key2, valid) {
  beforeEach(function () {
    const settings = {};
    settings[key1] = valid[key1];
    settings[key2] = valid[key2];
    this.example = new Paginater(settings);
  });

  _.each(valid, function (value, key) {
    it('sets ' + key + ' correctly', function () {
      expect(valid[key]).to.equal(value);
    });
  });

  it('sets page_limit to Infinity', function () {
    expect(this.example.get('page_limit')).to.equal(Infinity);
  });

  it('sets index_limit to Infinity', function () {
    expect(this.example.get('index_limit')).to.equal(Infinity);
  });

  it('sets total_pages to undefined', function () {
    expect(this.example.get('total_pages')).to.equal(undefined);
  });

  it('sets total_available to undefined', function () {
    expect(this.example.get('total_available')).to.equal(undefined);
  });
}

// Test setting basic values
function testPaginatorBasics (key1, key2) {
  describe('given a valid ' + key1 + ' and ' + key2, function () {
    beforeEach(function () {
      this.valid = { start: 10, count: 5, end: 14, page: 3 };
    });

    paginatorBasicExpectations(key1, key2, { start: 10, count: 5, end: 14, page: 3 });

    beforeEach(function () {
      this.valid = { start: 500, count: 100, end: 599, page: 6 };
    });

    paginatorBasicExpectations(key1, key2, { start: 500, count: 100, end: 599, page: 6 });
  }
  );
}

function testPaginatorUnsettable (invalidSettings, basicSettings) {
  basicSettings = basicSettings || { start: 10, count: 5 };

  it(
    "can't set " + _.keys(invalidSettings).join(' and ') + ' together after initializaion',
    function () {
      expect(function () {
        (new Paginater(basicSettings)).set(invalidSettings);
      }).to.throw();
    }
  );

  it(
    "can't set " + _.keys(invalidSettings).join(' and ') + ' together on initializaion',
    function () {
      expect(function () {
        const initializeInvalidSettings = new Paginater(_.extend(basicSettings, invalidSettings));
        return initializeInvalidSettings;
      }).to.throw();
    }
  );
}

describe('Pride.Util.Paginater', function () {
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
      expect(
        function () {
          const startGreaterThanEnd = new Paginater({ start: 10, end: 5 });
          return startGreaterThanEnd;
        }
      ).to.throw();
    });
  });
  describe('sibling files are defined as properties', () => {
    siblingFileIsProperty('Pride.Util.Paginater', Paginater);
  });
});