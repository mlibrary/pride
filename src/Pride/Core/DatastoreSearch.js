import { _ } from 'underscore';
import SearchBase from './SearchBase';
import Record from './Record';
import deepClone from '../Util/deepClone';
import isDeepMatch from '../Util/isDeepMatch';
import FacetSearch from './FacetSearch';

const DatastoreSearch = function(setup) {
  const base = new SearchBase(setup, this);

  base.createItem = (itemData) => {
    return new Record(itemData);
  };

  /*
   * Facet Searches
   */

  let facetSearches = [];
  let currentFacets = [];

  this.getFacets = () => facetSearches;

  /*
   * Data Getters
   */

  this.uid = base.datastore.get('uid');

  this.getData = () => {
    return {
      uid: this.uid,
      metadata: deepClone(base.datastore.get('metadata')),
      sorts: deepClone(base.datastore.get('sorts')),
      selectedSort: base.query.get('sort'),
      facets: deepClone(base.query.get('facets')),
      fields: deepClone(base.datastore.get('fields')),
      field_tree: deepClone(base.query.get('field_tree')),
      settings: deepClone(base.query.get('settings')),
      page: base.query.get('page'),
      count: base.query.get('count'),
      total_available: base.query.get('total_available'),
      total_pages: base.query.get('total_pages'),
      page_limit: base.query.get('page_limit'),
      specialists: deepClone(base.query.get('specialists'))
    };
  };

  this.getResults = base.results;

  /*
   * Observerables
   */

  base.initialize_observables = () => {
    this.runDataObservers.add(() => {
      const facets = base.datastore.get('facets');

      if (!isDeepMatch(currentFacets, facets)) {
        _.each(facetSearches, (facetSearch) => {
          facetSearch.clearAllObservers();
        });

        facetSearches = _.map(
          facets,
          (facetData) => {
            return new FacetSearch({
              data: _.omit(facetData, 'values'),
              results: facetData.values
            });
          }
        );

        currentFacets = facets;

        this.facetsObservers.notify();
      }
    });
  };

  this.getMute = base.getMute;

  this.setMute = (state) => {
    _.each(facetSearches, (facet) => {
      facet.setMute(state);
    });
    base.setMute(state);

    return this;
  };

  base.createObservable('facets', this.getFacets)
    .initialize_observables();
};

export default DatastoreSearch;
