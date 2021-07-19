import { expect } from 'chai';
import Paginater from '../../../src/Pride/Util/Paginater';

describe('Paginater', function() {
  const paginatorBasicExpectations = (key1, key2, valid) => {
    beforeEach(() => {
      const settings = {};
      settings[key1] = valid[key1];
      settings[key2] = valid[key2];
      this.example = new Paginater(settings);
    });

    for (const [key, value] of Object.entries(valid)) {
      it(`sets ${key} correctly`, () => {
        expect(valid[key]).to.equal(value);
      });
    }

    it('sets page_limit to Infinity', () => {
      expect(this.example.get('page_limit')).to.equal(Infinity);
    });

    it('sets index_limit to Infinity', () => {
      expect(this.example.get('index_limit')).to.equal(Infinity);
    });

    it('sets total_pages to undefined', () => {
      expect(this.example.get('total_pages')).to.be.undefined;
    });

    it('sets total_available to undefined', () => {
      expect(this.example.get('total_available')).to.be.undefined;
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

    const invalidSettingsKeys = Object.keys(invalidSettings).join(' and ');

    it(`cannot set ${invalidSettingsKeys} together after initializaion`, () => {
      expect(() => (new Paginater(basicSettings)).set(invalidSettings)).to.throw();
    });

    it(`cannot set ${invalidSettingsKeys} together on initializaion`, () => {
      expect(() => new Paginater({ ...basicSettings, ...invalidSettings })).to.throw();
    });
  };

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
