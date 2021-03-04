import { expect } from 'chai';
import { _ } from 'underscore';
import Paginater from './Paginater';

const paginatorBasicExpectations = (key1, key2, valid) => {
  beforeEach(function() {
    const settings = {};
    settings[key1] = valid[key1];
    settings[key2] = valid[key2];
    this.example = new Paginater(settings);
  });

  _.each(valid, (value, key) => {
    it(`sets ${key} correctly`, () => {
      expect(valid[key]).to.equal(value);
    });
  });

  it('sets page_limit to Infinity', function() {
    expect(this.example.get('page_limit')).to.equal(Infinity);
  });

  it('sets index_limit to Infinity', function() {
    expect(this.example.get('index_limit')).to.equal(Infinity);
  });

  it('sets total_pages to undefined', function() {
    expect(this.example.get('total_pages')).to.equal(undefined);
  });

  it('sets total_available to undefined', function() {
    expect(this.example.get('total_available')).to.equal(undefined);
  });
};

// Test setting basic values
const testPaginatorBasics = (key1, key2) => {
  describe(`given a valid ${key1} and ${key2}`, () => {
    paginatorBasicExpectations(key1, key2, { start: 10, count: 5, end: 14, page: 3 });
    paginatorBasicExpectations(key1, key2, { start: 500, count: 100, end: 599, page: 6 });
  });
};

const testPaginatorUnsettable = (invalidSettings, basicSettings) => {
  basicSettings = basicSettings || { start: 10, count: 5 };

  it(
    `cannot set ${_.keys(invalidSettings).join(' and ')} together after initializaion`,
    () => {
      expect(() => (new Paginater(basicSettings)).set(invalidSettings)).to.throw();
    }
  );

  it(
    `cannot set ${_.keys(invalidSettings).join(' and ')} together on initializaion`,
    () => {
      expect(() => new Paginater(_.extend(basicSettings, invalidSettings))).to.throw();
    }
  );
};

describe('Paginater', () => {
  testPaginatorBasics('start', 'count');
  testPaginatorBasics('start', 'end');
  testPaginatorBasics('count', 'end');

  describe('certain combinations cannot be set', () => {
    testPaginatorUnsettable({ total_pages: 100 });
    testPaginatorUnsettable({ index_limit: 100 });
    testPaginatorUnsettable({ start: 10, count: 5, end: 14 });
    testPaginatorUnsettable({ page: 3, start: 10 }, {});
    testPaginatorUnsettable({ page: 3, end: 14 }, {});

    it('cannot set the start greater than the end', () => {
      expect(() => new Paginater({ start: 10, end: 5 })).to.throw();
    });
  });
});
