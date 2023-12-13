const { expect } = require('chai');
const Query = require('../../../pride').Pride.Core.Query;

describe('Pride.Core.Query', function () {
  let queryInfoMock;
  let query;

  beforeEach(function () {
    queryInfoMock = {
      uid: 'uid1',
      request_id: 1,
      start: 1,
      count: 10,
      field_tree: {},
      facets: {},
      sort: {},
      settings: {},
      raw_query: 'raw_query'
    };

    query = new Query(queryInfoMock);
  });

  it('works', function () {
    expect(Query).to.not.be.null;
  });

  describe('get', function () {
    it('returns memoized paginator value', function () {
      expect(query.get('index_limit')).to.equal(Infinity);
    });
    it('returns query info if paginator lacks key', function () {
      query.set({ sort: 'new_sort' });
      expect(query.get('sort')).to.equal('new_sort');
    });
  });

  describe('set', function () {
    const values = { count: 123 };
    it('sets and gets a value', function () {
      query.set(values);
      expect(query.get('count')).to.equal(values.count);
    });
    it('returns self', function () {
      expect(query.set(values)).to.deep.equal(query);
    });
  });

  describe('clone', function () {
    it('clones the query', function () {
      const clone = query.clone();
      expect(JSON.stringify(query)).to.equal(JSON.stringify(clone));
    });
  });

  describe('toSection', function () {
    it('represents query as a section', function () {
      const section = query.toSection();
      expect(section.start).to.equal(query.get('start'));
      expect(section.end).to.equal(query.get('end'));
    });
  });

  describe('toLimitSection', function () {
    it('represents query as a limit section', function () {
      const section = query.toLimitSection();
      expect(section.start).to.equal(query.get('start'));
      expect(section.end).to.equal(query.get('index_limit'));
    });
  });

  describe('toJSON', function () {
    it('serializes the query to JSON', function () {
      const json = query.toJSON();
      Object.keys(queryInfoMock).forEach((key) => {
        expect(json[key]).to.deep.equal(queryInfoMock[key]);
      });
    });
  });
});
