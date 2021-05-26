import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import DatastoreSearch from './DatastoreSearch';

describe('DatastoreSearch()', () => {
  before(() => {
    const dom = new JSDOM();
    global.window = dom.window;
    this.setup = {
      datastore: {
        get: (arg) => this.setup.datastore[arg],
        baseQuery: () => {},
        runQuery: () => {},
        uid: 'UID Value',
        metadata: 'Metadata Value',
        sorts: 'Sorts Value',
        fields: 'Fields Value'
      },
      query: {
        get: (arg) => this.setup.query[arg],
        set: () => {},
        toSection: {},
        selectedSort: 'SelectedSort Value',
        facets: 'Facets Value',
        field_tree: 'Field Tree Value',
        settings: 'Settings Value',
        page: 'Page Value',
        count: 'Count Value',
        total_available: 'Total Available Value',
        total_pages: 'Total Pages Value',
        page_limit: 'Page Limit Value',
        specialists: 'Specialists Value'
      },
      requestFunc: '',
      starting_results: '',
      cacheSize: 1
    };
    this.datastoreSearchExample = new DatastoreSearch(this.setup);
  });
  it('works', () => {
    expect(DatastoreSearch).to.not.be.null;
  });
  describe('getFacets()', () => {
    it('returns an array', () => {
      expect(this.datastoreSearchExample.getFacets()).to.be.an('array');
    });
  });
  describe('uid', () => {
    it('returns setup.datastore.uid', () => {
      expect(this.datastoreSearchExample.uid).to.equal(this.setup.datastore.uid);
    });
  });
  describe('getData()', () => {
    it('returns an object', () => {
      expect(this.datastoreSearchExample.getData()).to.be.an('object');
    });
    it('returns the necessary datastore and query data', () => {
      expect(this.datastoreSearchExample.getData()).to.deep.equal({
        uid: this.setup.datastore.uid,
        metadata: this.setup.datastore.get('metadata'),
        sorts: this.setup.datastore.get('sorts'),
        selectedSort: this.setup.query.get('sort'),
        facets: this.setup.query.get('facets'),
        fields: this.setup.datastore.get('fields'),
        field_tree: this.setup.query.get('field_tree'),
        settings: this.setup.query.get('settings'),
        page: this.setup.query.get('page'),
        count: this.setup.query.get('count'),
        total_available: this.setup.query.get('total_available'),
        total_pages: this.setup.query.get('total_pages'),
        page_limit: this.setup.query.get('page_limit'),
        specialists: this.setup.query.get('specialists')
      });
    });
  });
  describe('getResults', () => {
    it('is a function', () => {
      expect(this.datastoreSearchExample.getResults).to.be.a('function');
    });
  });
  describe('getMute', () => {
    it('returns a boolean', () => {
      expect(this.datastoreSearchExample.getMute()).to.be.a('boolean');
    });
    it('is false by default', () => {
      expect(this.datastoreSearchExample.getMute()).to.be.false;
    });
  });
  describe('setMute()', () => {
    it('returns self', () => {
      expect(this.datastoreSearchExample.setMute()).to.deep.equal(this.datastoreSearchExample);
    });
  });
});
